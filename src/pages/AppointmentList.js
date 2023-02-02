import { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../assets/css/Appointment.css";

function AppointmentList(props) {
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3002/users/verify", { token })
        .then(({ data }) => {
          props.setUser(data);
          setIsLoading(false);
          return data;
        })
        .then((user) => {
          axios
            .get("http://localhost:3002/visits")
            .then(({ data }) => {
              if (user.role === "Admin") {
                setVisits(data);
              } else if (user.role === "Customer") {
                setVisits(
                  data.filter((elem) => elem.customer._id === user._id)
                );
              } else {
                setVisits(data.filter((elem) => elem.agent._id === user._id));
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  if (!props.user.name) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="appointment-page">
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <h3>
            Hello {props.user.name} {props.user.surname}
          </h3>
        </div>
        <div className="row">
          <div>
            <div className="content">
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>Visit Date</th>
                    <th>Customer</th>
                    <th>Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.map((visit, index) => (
                    <tr key={index}>
                      <td>{visit.date}</td>
                      <td>
                        {visit.customer.name} {visit.customer.surname}
                      </td>
                      <td>
                        {visit.agent.name} {visit.agent.surname}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AppointmentList;
