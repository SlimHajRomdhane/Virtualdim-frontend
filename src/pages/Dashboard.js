import { useEffect, useState } from "react";
import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../assets/css/Dashboard.css";

function Dashboard({ setUser, user }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3002/users/verify", { token })
        .then(({ data }) => {
          setUser(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [setUser]);

  if (!user.name) {
    return <Redirect to="/login" />;
  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  if (error) {
    return <div className="App">{error.message}</div>;
  }

  if (!user.name) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="dashboard-page">
      <img
        className="background-image"
        src={require("../assets/img/backgroundimage.jpg")}
        alt="Virtual Tour"
      />
      <div className="containera text-containera">
        <p className="paragraph">
          Bonjour {user.name} {user.surname},<br/>Chez Virtual Dimensions, nous
          offrons des solutions de marketing innovantes pour les entreprises en
          proposant des visites virtuelles interactives. Avec notre expertise,
          nous pouvons créer des boutiques virtuelles pour augmenter les ventes
          en ligne, vendre des bureaux ou des immeubles de manière efficace,
          permettre aux musées de continuer à être visités malgré les
          restrictions, et bien plus encore. Faites découvrir votre entreprise
          sous un nouvel angle avec les visites virtuelles de Virtual
          Dimensions. Nous aidons les entreprises à se démarquer de la
          concurrence en offrant une expérience immersive pour leurs clients.
        </p>
      </div>
      <div className="containera table-containera">
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">Command number</th>
              <th className="table-header">Link</th>
              <th className="table-header">Time of post</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-data">No info</td>
              <td className="table-data">No info</td>
              <td className="table-data">No info</td>
            </tr>
            <tr>
              <td className="table-data">No info</td>
              <td className="table-data">No info</td>
              <td className="table-data">No info</td>
            </tr>
            <tr>
              <td className="table-data">No info</td>
              <td className="table-data">No info</td>
              <td className="table-data">No info</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Dashboard;
