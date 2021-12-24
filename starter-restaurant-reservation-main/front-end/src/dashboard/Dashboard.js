import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import ReservationDetails from "./ReservationDetails";
import TableDetails from "./TableDetails";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {

  // const date = today()

  const [reservations, setReservations] = useState(null);
  const [tables, setTables] = useState(null);
  const [viewDate, setViewDate] = useState(date);
  const [error, setError] = useState(null);



  const handlePreviousDay = (e) => {
    e.preventDefault();
    setViewDate(previous(viewDate));
  };

  const handleNextDay = (e) => {
    e.preventDefault();
    setViewDate(next(viewDate));
  };

  const handleToday = (e) => {
    e.preventDefault();
    setViewDate(date);
  };


  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    
    if (viewDate === date) {
      listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    } else {
      listReservations({ viewDate }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    }
    return () => abortController.abort();
  }, [date, viewDate]);



  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    listTables()
    .then(setTables)
    .catch(setError);
    return () => abortController.abort();
  }, []);

  const query = useQuery();
  const searchedDate = query.get("date");

  useEffect(() => {
    if (searchedDate && searchedDate !== "") {
      setViewDate(searchedDate);
    }    
  }, [searchedDate])


  if (reservations) {
    return (
      <main>
  
        <h1 className="d-flex m-3 justify-content-center display-4 text-white">Dashboard</h1>

        <div className="d-flex justify-content-between mb-3">
          <button className="rounded" onClick={handlePreviousDay}>Prev</button>
          <button className="rounded" onClick={handleToday}>Today</button>
          <button className="rounded" onClick={handleNextDay}>Next</button>
        </div>
  
        <h2 className="d-flex justify-content-center text-white" >Reservations:</h2>
        <div className="d-md-flex mb-3 d-flex justify-content-center text-white">
          <h4 className="mb-0">{viewDate}</h4>
        </div>
  
        <div className="row">
              {reservations && reservations.filter(res => res.status !== "cancelled").map((reservation) => (
                <div className="col-md-6" key={reservation.reservation_id}>
                  
                  <ReservationDetails reservation={reservation} />
                </div>
              ))}
        </div>
  
        <div>
          <h2 className="d-flex justify-content-center text-white">Tables</h2>

          {tables && tables.map((table) => (
            <div className="mb-3 mt-3" key={table.table_id}>
              <TableDetails table={table} />
            </div>
          ))}

        </div>
        
        <ErrorAlert error={error} />
      </main>
    );
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}

export default Dashboard;
