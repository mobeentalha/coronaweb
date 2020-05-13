import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import "./App.css";
import Logo from "./logo.png";
import Countries from "./countries.js";
import MapChart from "./map";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    data: [],
    confirmedCases: "",
    recoveredCases: "",
    deaths: "",
    activeCase: "",
    todayCase: "",
    countriesList: [],
    recoveredRate: "",
    deathRate: "",
    loading: true,
    content: "",
    setContent: "",
  };
  this.setTooltipContent = this.setTooltipContent.bind(this);
}
  componentDidMount() {
    axios.get(`https://coronavirus-19-api.herokuapp.com/countries`).then((res) => {
      
      const length = res.data.length;
      var i = 1;
      const list= [];
      for(i = 1; i< length; i++){
        const cID = res.data[i];
        list.push(cID.country)
      }
      this.setState({ countriesList: list });
      this.setState({ loading: false })
      // const cID = res.data;
      // this.setState({ countriesList: cID });
      // this.setState({ loading: false });
    });

    axios.get(`https://coronavirus-19-api.herokuapp.com/countries`).then((res) => {
      const data = res.data[0];
      this.setState({ confirmedCases: data.cases });
      this.setState({ recoveredCases: data.recovered});
      this.setState({ deaths: data.deaths });
      this.setState({ activeCase: data.active})
      this.setState({ todayCase: data.todayCases})
    });
  }
  roundValue(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  setTooltipContent(value){
    this.setState({content: value})
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
            <div className="row">
              <div className="col-md-12">
                <MapChart setTooltipContent={this.setTooltipContent} />
                <ReactTooltip>{this.state.content}</ReactTooltip>
              </div>
            </div>
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
                      : this.state.confirmedCases}
                  </span>
                </h5>
                <h5 className="card-text">
                  Total Recovered Cases :
                  <span className="bold-text">
                    {this.state.recoveredCases === ""
                      ? ""
                      : this.state.recoveredCases}
                  </span>
                </h5>
                <h5 className="card-text">
                  Total Deaths :
                  <span className="bold-text">
                    {this.state.deaths === "" ? "" : this.state.deaths}
                  </span>
                </h5>
                <h6 className="card-text">
                  Active Case:
                  <span className="bold-text">
                    {this.state.activeCase === ""
                      ? ""
                      : this.state.activeCase}{" "}
                  </span>
                </h6>
                <h6 className="card-text">
                  Today Case:
                  <span className="bold-text">
                    {this.state.todayCase === "" ? "" : this.state.todayCase}
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
