const knex = require("../db/connection");

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((result) => result[0]);
}

function read(table_id) {
  return knex("tables")
      .select("*")
      .where({ table_id: table_id })
      .then((readTables) => readTables[0]);
}


function readReservation(reservation_id) {
  return knex("reservations")
    .where({ reservation_id })
    .then((result) => result[0]);
}

function readTableByReservation(reservation_id) {
  return knex("tables")
    .where({ reservation_id })
    .whereExists(knex.select("*").from("tables").where({ reservation_id }))
    .then((result) => result[0]);
}

async function updateSeatReservation(reservation_id, table_id) {
  const trx = await knex.transaction();
  let updatedTable = {};
  return trx("reservations")
    .where({ reservation_id })
    .update({ status: "seated" })
    .then(() =>
      trx("tables")
        .where({ table_id })
        .update({ reservation_id })
        .then((result) => (updatedTable = result[0]))
    )
    .then(trx.commit)
    .then(() => updatedTable)
    .catch(trx.rollback);
}

async function deleteSeatReservation(table_id, reservation_id) {
  const trx = await knex.transaction();
  let updatedTable = {};
  return trx("reservations")
    .where({ reservation_id })
    .update({ status: "finished" })
    .then(() =>
      trx("tables")
        .where({ table_id })
        .update({ reservation_id: null }, "*")
        .then((result) => (updatedTable = result[0]))
    )
    .then(trx.commit)
    .then(() => updatedTable)
    .catch(trx.rollback);
}

function deleteTable(table_id) {
  return knex("tables")
    .where({ table_id: table_id })
    .del();
}

function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name");
}

module.exports = {
  create,
  read,
  readReservation,
  readTableByReservation,
  updateSeatReservation,
  deleteSeatReservation,
  list,
  deleteTable,
};