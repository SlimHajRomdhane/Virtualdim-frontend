import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import bgImage from "../assets/img/bg16.jpg";
function Register(props) {
  const [user, setUser] = useState({
    email: "",
    name: "",
    surname: "",
    dateOfBirth: "",
    phoneNumber: "",
    password: "",
    role: "Agent",
  });

  const roleOptions = ["Agent", "Client"];

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const history = useHistory();

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/users/register", user)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        props.setUser(data.user);

        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ backgroundImage: `url(${bgImage})` }}>
      <div
        style={{ backgroundColor: "black", padding: "15px", opacity: "80%" }}
      >
        <div className="content">
          <div className="container">
            <div className="card card-register card-plain text-center">
              <div className="card-header">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="header-text">
                      <h2
                        className="card-title"
                        style={{ fontWeight: "bold", color: "white" }}
                      >
                        S'enregistrer
                      </h2>
                      <h4
                        className="card-subtitle"
                        style={{ fontWeight: "bold", color: "white" }}
                      >
                        Créer un compte gratuitement pour découvrir plus
                        d'options!
                      </h4>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body ">
                <div className="row">
                  <div className="col-md-5 ml-auto">
                    <div className="media">
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-circle-09"></i>
                        </div>
                      </div>
                      <div className="media-body">
                        <h4 style={{ fontWeight: "bold", color: "white" }}>
                          Compte gratuit
                        </h4>
                        <p style={{ color: "white" }}>
                          Profitez de nos fonctionnalités de base pour améliorer
                          votre présence en ligne.
                        </p>
                      </div>
                    </div>
                    <div className="media">
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-preferences-circle-rotate"></i>
                        </div>
                      </div>
                      <div className="media-body">
                        <h4 style={{ color: "white" }}>
                          Performances exceptionnelles
                        </h4>
                        <p style={{ color: "white" }}>
                          Notre équipe de professionnels expérimentés vous
                          garantit des résultats de qualité supérieure.
                        </p>
                      </div>
                    </div>
                    <div className="media">
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-planet"></i>
                        </div>
                      </div>
                      <div className="media-body">
                        <h4 style={{ color: "white" }}>Support</h4>
                        <p style={{ color: "white" }}>
                          Notre équipe est disponible pour vous aider à chaque
                          étape de votre parcours pour un service clientèle de
                          qualité.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mr-auto">
                    <div>
                      <div className="card card-plain">
                        <div className="content">
                          <div className="form-group">
                            <input
                              id="email"
                              onChange={handleChange}
                              type="email"
                              placeholder="Your Email"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              id="name"
                              onChange={handleChange}
                              type="text"
                              placeholder="Your First Name"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              id="surname"
                              onChange={handleChange}
                              type="text"
                              placeholder="Your First Name"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              id="dateOfBirth"
                              onChange={handleChange}
                              type="date"
                              placeholder="Enter Date of Birth"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              id="phoneNumber"
                              onChange={handleChange}
                              type="text"
                              placeholder="Your Phone Number"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              id="password"
                              onChange={handleChange}
                              type="password"
                              placeholder="Password"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <select onChange={handleChange} id="role">
                              <option value="Select an option" disabled>
                                Select an option
                              </option>
                              {roleOptions.map((value, index) => (
                                <option value={value} key={index}>
                                  {value}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="footer text-center">
                          <button
                            type="submit"
                            onClick={register}
                            className="btn btn-fill btn-neutral btn-wd"
                          >
                            Créer un compte
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
