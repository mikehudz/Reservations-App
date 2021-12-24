import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { updateReservationStatus } from "../utils/api";

function ReservationDetails({reservation}) {
    const history = useHistory();

    const [error, setError] = useState(null);

    const handleSeat = (e) => {
        e.preventDefault();
        setError(null);
        updateReservationStatus({ status: "seated" }, reservation.reservation_id)
        .then((response) => {
            history.push(`/reservations/${reservation.reservation_id}/seat`);
        })
        .catch(setError);
    }

    const handleCancelRes = (e) => {
        e.preventDefault();
        setError(null);
        const confirmBox = window.confirm(
            "Do you want to cancel this reservation? This cannot be undone."
        );
        if (confirmBox === true) {
            updateReservationStatus({ status: "cancelled" }, reservation.reservation_id)
            .then((response) => {
                history.go(0);
            })
            .catch(setError);
        }
    }

    return (
        <div className="card card-background mb-2 bg-secondary text-white">

            <ErrorAlert error={error} />

                <div className="card-body">
                <h4 className="card-title text-center">Customer Name: {reservation.first_name} {reservation.last_name}</h4>
                                                                                                                    
                <div className="d-flex justify-content-between mb-1">
                    <p className="boldtext" data-reservation-id-status={reservation.reservation_id}>Status: {reservation.status ? reservation.status : "booked"}</p>

                    {reservation.status === "booked" ? <a 
                                href={`/reservations/${reservation.reservation_id}/seat`}
                                onClick={handleSeat}
                                className="card-link btn btn-outline-info">
                            Seat
                                </a> : <div></div>
                    }
                </div>

                <p className="card-text text-center">Reservation Date: {reservation.reservation_date}</p>
                <p className="card-text d-flex justify-content-center">Reservation Time:  {reservation.reservation_time}</p>
                <p className="card-text d-flex justify-content-center">Mobile Number: {reservation.mobile_number}</p>
                <p className="card-text d-flex justify-content-center">Party Size: {reservation.people}</p>
                <p className="card-text d-flex justify-content-center">Reservation ID: {reservation.reservation_id}</p>
                


                <div className="d-flex justify-content-center btn-group">
                    <button data-reservation-id-cancel={reservation.reservation_id}
                            onClick={handleCancelRes}
                            className="btn btn-danger btn-sm btn-outline-dark">
                        Cancel
                    </button>
                    <a      href={`/reservations/${reservation.reservation_id}/edit`}
                            className="btn btn-sm btn-info btn-outline-dark">
                        Edit
                    </a>
                </div>
            </div>

        </div>
    )
}

export default ReservationDetails;