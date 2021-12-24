import React from "react";
import { useHistory } from "react-router";

export default function Form({ formData, setFormData, handleSubmit }) {

    const history = useHistory();

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    };


    return (
        <div>
            <form className="form-group" onSubmit={handleSubmit}>

              <label className="text-white">First Name:</label>

              <br />

              <input 
                name="first_name"
                placeholder="Enter First Name"
                type="text"
                required={true}
                onChange={(e) => setFormData({
                    first_name: e.target.value,
                    last_name: formData.last_name,
                    mobile_number: formData.mobile_number,
                    reservation_date: formData.reservation_date,
                    reservation_time: formData.reservation_time,
                    people: formData.people,
                  })}
                value={formData.first_name}
                className="form-control"
              />

              <br />

              <label className="text-white">Last Name:</label>

              <br />

              <input 
                name="last_name"
                placeholder="Enter Last Name"
                type="text"
                required={true}
                onChange={(e) => setFormData({
                  first_name: formData.first_name,
                  last_name: e.target.value,
                  mobile_number: formData.mobile_number,
                  reservation_date: formData.reservation_date,
                  reservation_time: formData.reservation_time,
                  people: formData.people,
                  })}
                  value={formData.last_name}
                  className="form-control"
                />

              <br />

              <label className="text-white">Mobile Number:</label>

              <br />
              <input 
                name="mobile_number" 
                placeholder="xxx-xxx-xxxx"
                type="tel"
                required={true} 
                onChange={(e) => setFormData({
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  mobile_number: e.target.value,
                  reservation_date: formData.reservation_date,
                  reservation_time: formData.reservation_time,
                  people: formData.people,
                  })}
                  value={formData.mobile_number}
                  className="form-control"
                />

              <br />

              <label className="text-white">Reservation Date:</label>
              <br />
              <input 
                name="reservation_date"
                type="date"
                pattern="\d{2}-\d{2}-\d{4}"
                required={true} 
                onChange={(e) => setFormData({
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  mobile_number: formData.mobile_number,
                  reservation_date: e.target.value,
                  reservation_time: formData.reservation_time,
                  people: formData.people,
                  })}
                  value={formData.reservation_date}
                  className="form-control"
                />
              <br />

              <label className="text-white">Reservation Time:</label>

              <br />

              <input 
                name="reservation_time" 
                type="time"
                required={true} 
                onChange={(e) => setFormData({
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  mobile_number: formData.mobile_number,
                  reservation_date: formData.reservation_date,
                  reservation_time: e.target.value,
                  people: formData.people,
                  })}
                  value={formData.reservation_time}
                  className="form-control"
                />
              <br />

              <label className="text-white"># of People in Party:</label>

              <br />

              <input 
                name="people" 
                placeholder="# of People in Party"
                type="text"
                required={true} 
                onChange={(e) => setFormData({
                  first_name: formData.first_name,
                  last_name: formData.last_name,
                  mobile_number: formData.mobile_number,
                  reservation_date: formData.reservation_date,
                  reservation_time: formData.reservation_time,
                  people: e.target.value,
                  })}
                  value={formData.people}
                  className="form-control"
                />

              <div className="d-flex justify-content-center">

                <button className="btn btn-danger" onClick={handleCancel} type="cancel" >Cancel</button>

                <button className="btn btn-primary" type="submit">Submit</button>
                
              </div>
            
            </form>
        </div>
    )
}

