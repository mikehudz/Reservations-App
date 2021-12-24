import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { deleteReservationId, deleteTable, updateReservationStatus } from "../utils/api";

function TableDetails( {table} ) {

    const history = useHistory();
    // const [currentTable, setCurrentTable] = useState(table);
    // const [tableStatus, setTableStatus] = useState("free");
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     if (currentTable.reservation_id) {
    //         setTableStatus(`occupied by Reservation ID: ${currentTable.reservation_id}`);
    //     } else {
    //         setTableStatus("free");
    //     }
    // }, [currentTable]);

    const handleFinish = (e) => {
        e.preventDefault();
        setError(null);

        const confirmBox = window.confirm("Is this table ready to seat new guests? This cannot be undone.");

        if (confirmBox === true) {
            updateReservationStatus({ status: "finished" }, table.reservation_id)
            .catch(setError);
            deleteReservationId(table.table_id)
            .then((response) => {
                // setCurrentTable(response)
                history.go(0);
            })
            .catch(setError);
        }
    };


    //
    const handleCancel = (e) => {
        e.preventDefault();
    };


    //Deletes table then refreshes the page
    const handleDelete =(e) => {
        e.preventDefault();
        setError(null);

        const confirmBox = window.confirm("Are you sure you want to delete this table? This cannot be undone.");
        console.log(table)
        if (confirmBox === true) {
            console.log("current table id", table.table_id)
            deleteTable(table.table_id)
            .catch(setError);
            history.go(0);
        }
    };

    return (
        <div className="card text-center card-background mb-2 bg-secondary text-white rounded">
            <ErrorAlert error={error} />
            <div className="card-body">
                <p className="card-text">Table Name: {table.table_name}</p>
                <p className="card-text">Table Capacity: {table.capacity}</p>

                <div className="d-flex justify-content-center mb-3">
                    {!table.reservation_id ? (<div></div>) : 
                    (<div>
                        <button 
                            className="btn btn-primary" 
                            data-table-id-finish={table.table_id} 
                            onClick={handleFinish}>Finish
                        </button> 
                        <button 
                            className="btn btn-danger" 
                            onClick={handleCancel}>Cancel
                        </button>
                    </div>)} 
                </div>

                <p className="card-text" data-table-id-status={`${table.table_id}`}>
                    Table Status: {!table.reservation_id ? "free" : "occupied" }
                </p>   

                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default TableDetails;