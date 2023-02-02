import moment from "moment";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { BigCalendar } from "react-big-calendar";
import axios from "axios";
import "../assets/css/Appointment.css";

function Appointment(props) {
  const [visit, setVisit] = useState({
    date: null,
    customer: "",
    agent: "",
    time: null,
    reason: "", // add this
  });

  const [agentOptions, setAgentOptions] = useState([]);
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
            .get("http://localhost:3002/users")
            .then(({ data }) => {
              const agents = data.filter((elem) => elem.role === "Agent");
              setAgentOptions(agents);
              setVisit({
                ...visit,
                agent: agents[0]._id,
                customer: user._id,
              });
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

  const handleChange = (e) => {
    setVisit({ ...visit, [e.target.id]: e.target.value });
  };

  const handleTimeChange = (e) => {
    let startTime = moment(e.target.value, "HH:mm").format();
    setVisit({ ...visit, time: startTime });
  };

  const handleNotesChange = (e) => {
    setVisit({ ...visit, notes: e.target.value });
  };

  const createAppointment = () => {
    axios
      .post("http://localhost:3002/visits", visit)
      .then(() => {
        console.log("created");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="appointment-page">
      <img
        className="background-image"
        src={require("../assets/img/backgroundimage.jpg")}
        alt="Virtual Tour"
      />
      <div className="container-form">
        <div className="row">
          <h3>
            Bonjour {props.user.name} {props.user.surname}, veuillez prendre un
            rendez-vous
          </h3>
        </div>
        <div className="row">
          <div>
            <div className="content">
              <div className="card card-plain">
                <div className="form-groupe">
                  <input
                    id="date"
                    onChange={handleChange}
                    type="date"
                    placeholder="Enter Appointment date"
                    className="form-control"
                  />
                </div>
                <div className="form-groupe">
                  <input
                    id="time"
                    onChange={handleTimeChange}
                    type="time"
                    min="08:00"
                    max="18:00"
                    placeholder="Enter Appointment time"
                    className="form-control"
                  />
                </div>
                <div className="form-groupe">
                  <select onChange={handleChange} id="agent">
                    <option value="Select an option" disabled>
                      Select an agent
                    </option>
                    {agentOptions.map((value, index) => (
                      <option value={value._id} key={index}>
                        {value.name} {value.surname}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  onChange={handleNotesChange}
                  placeholder="What would you like to discuss during the appointment?"
                  className="form-control"
                  id="notes"
                  style={{
                    width: "300%",
                    alignContent: "center",
                    height: "300%",
                  }}
                ></textarea>
              </div>
              <div className="footer text-center">
                <button
                  type="submit"
                  onClick={() => {
                    createAppointment();
                    alert("Your appointment has been booked!");
                  }}
                  className="btn btn-fill btn-neutral btn-wd"
                  style={{
                    alignContent: "center",
                    height: "100%",
                    backgroundColor: "black",
                  }}
                >
                  Prendre rendez-vous
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
