import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Logo from "./logo.png";
import Countries from "./countries.js";

class App extends Component {
  state = {
    data: [],
    confirmedCases: "",
    recoveredCases: "",
    deaths: "",
    countriesList: [],
    recoveredRate: "",
    deathRate: "",
    loading: true,
  };
  componentDidMount() {
    axios.get(`https://covid19.mathdro.id/api/countries`).then((res) => {
      const cID = res.data.countries;
      this.setState({ countriesList: cID });
      this.setState({ loading: false });
    });

    axios.get(`https://covid19.mathdro.id/api`).then((res) => {
      this.setState({ confirmedCases: res.data.confirmed });
      this.setState({ recoveredCases: res.data.recovered });
      this.setState({ deaths: res.data.deaths });
      const recoveredRate = this.roundValue(
        (res.data.recovered.value / res.data.confirmed.value) * 100
      );
      const deathRate = this.roundValue(
        (res.data.deaths.value / res.data.confirmed.value) * 100
      );
      this.setState({ recoveredRate: recoveredRate });
      this.setState({ deathRate: deathRate });
    });
  }
  roundValue(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  render() {
    return (
      <section>
        <div className="row header">
          <div className="col-md-2">
            <img src={Logo} className="logoImg" alt="logo" />
          </div>
          <div className="col-md-8">
            <h1 className="text-center title"> Corona Virus Update</h1>
          </div>
        </div>
        <section className="content">
          <div className="container">
          <h2> About Corona Virus</h2>
          <p>
            Coronavirus disease (COVID-19) is an infectious disease caused by a new virus.
            The disease causes respiratory illness (like the flu) with symptoms such as a cough, fever, and in more severe cases, difficulty breathing. You can protect yourself by washing your hands frequently, avoiding touching your face, and avoiding close contact (1 meter or 3 feet) with people who are unwell.
          </p>
          <h2> How it Spreads</h2>
          <p>
            Coronavirus disease spreads primarily through contact with an infected person when they cough or sneeze. It also spreads when a person touches a surface or object that has the virus on it, then touches their eyes, nose, or mouth.
          </p>
          <h2> Prevention</h2>
          <p>
            There’s currently no vaccine to prevent coronavirus disease (COVID-19). <br />
            You can protect yourself and help prevent spreading the virus to others if you: <br />
            Do: <br />
            <ul>
              <li>Wash your hands regularly for 20 seconds, with soap and water or alcohol-based hand rub</li>
              <li>Cover your nose and mouth with a disposable tissue or flexed elbow when you cough or sneeze</li>
              <li>Avoid close contact (1 meter or 3 feet) with people who are unwell</li>
              <li>Stay home and self-isolate from others in the household if you feel unwell</li>
            </ul>
            Don't <br />
            <ul>
              <li>Touch your eyes, nose, or mouth if your hands are not clean</li>
            </ul>
          </p>
          </div>
          <div className="d-flex justify-content-center">
            <div className="card col-md-4">
              <div className="card-body">
                <h3 className="card-title">World Wide</h3>
                <h5 className="card-text">
                  Total Confirmed Cases :
                  <span className="bold-text">
                    {this.state.confirmedCases === ""
                      ? ""
                      : this.state.confirmedCases.value}
                  </span>
                </h5>
                <h5 className="card-text">
                  Total Recovered Cases :
                  <span className="bold-text">
                    {this.state.recoveredCases === ""
                      ? ""
                      : this.state.recoveredCases.value}
                  </span>
                </h5>
                <h5 className="card-text">
                  Total Deaths :
                  <span className="bold-text">
                    {this.state.deaths === "" ? "" : this.state.deaths.value}
                  </span>
                </h5>
                <h6 className="card-text">
                  Recovered Rate:
                  <span className="bold-text">
                    {this.state.recoveredRate === ""
                      ? ""
                      : this.state.recoveredRate}{" "}
                    %
                  </span>
                </h6>
                <h6 className="card-text">
                  Death Rate:
                  <span className="bold-text">
                    {this.state.deathRate === "" ? "" : this.state.deathRate} %
                  </span>
                </h6>
              </div>
            </div>
          </div>
          <div className="container bg">
            <h1 className="text-center"> Countries</h1> <br />
            {!this.state.loading && (
              <Countries list={this.state.countriesList} />
            )}
          </div>
        </section>
        <footer>
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center">© 2020 All rights reserved by 
                <a href="http://soultechzone.com/"> Soul Tech Zone </a>
              </h3>
            </div>
          </div>
        </footer>
      </section>
    );
  }
}

export default App;
