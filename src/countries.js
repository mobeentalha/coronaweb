import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allList: [],
      newList: [],
      loading: true,
      value: "",
      error: "",
      hide: false,
      searchResult: [],
      tempData: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  stateSetting(list) {
    this.setState({ newList: this.state.newList.concat([list]) });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  sortByAsc= () =>{
    this.setState(prevState => {
      this.state.newList.sort((a,b) => a.confirmedValue - b.confirmedValue)
    })
  }
  sortByDesc= () =>{
    this.setState(prevState => {
      this.state.newList.sort((a,b) => b.confirmedValue - a.confirmedValue)
    })
  }
  handleSubmit(event) {
    let searchResult = []
    if (this.state.value === "") {
      this.setState({ error: "Please Enter Value in Search Filed" });
      setTimeout(() => {
        this.setState({ hide: true });
      }, 4000);
    } else {
      axios
        .get(`https://covid19.mathdro.id/api/countries/` + this.state.value)
        .then((res) => {
          const result = {
            name: this.state.value,
            confirmedValue: res.data.confirmed.value,
            recoveredValue: res.data.recovered.value,
            deathValue: res.data.deaths.value,
            recorveredRate: this.roundValue(
              (res.data.recovered.value / res.data.confirmed.value) * 100
            ),
            deathRate: this.roundValue(
              (res.data.deaths.value / res.data.confirmed.value) * 100
            ),
          };
          searchResult = [...searchResult, result]
          this.setState({ newList: searchResult });
        });
    }
    event.preventDefault();
  }
  componentDidMount() {
    const list = this.props.list;
    const lastIndex = list.length - 1;
    list.map((item, i) => {
      axios
        .get(`https://covid19.mathdro.id/api/countries/` + item.name)
        .then((res) => {
          const object = {
            name: item.name,
            confirmedValue: res.data.confirmed.value,
            recoveredValue: res.data.recovered.value,
            deathValue: res.data.deaths.value,
            recorveredRate: this.roundValue(
              (res.data.recovered.value / res.data.confirmed.value) * 100
            ),
            deathRate: this.roundValue(
              (res.data.deaths.value / res.data.confirmed.value) * 100
            ),
          };
          this.stateSetting(object);
          if (i === lastIndex) {
            this.setState({ loading: false, tempData: this.state.newList });
          }
        });
    });

    return true;
  }
  getAllData= ()=>{
    this.setState({
      newList: this.state.tempData
    })
  }
  roundValue(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  render() {

    let newData = this.state.newList;
    return (
      <section>
        <div className="row mar">
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search By Country"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary btn-xs"
            onClick={this.handleSubmit}
          >
            SEARCH
          </button>
          <button
            type="button"
            className="btn btn-primary btn-xs"
            onClick={this.getAllData}
          >
            ALL DATA
          </button>
          <button
            type="button"
            className="btn btn-primary btn-xs"
            onClick={this.sortByAsc}
          >
            Ascending 
          </button>
          <button
            type="button"
            className="btn btn-primary btn-xs"
            onClick={this.sortByDesc}
          >
            Descending
          </button>
          {this.state.error === "" ? (
            ""
          ) : (
            <div
              className={
                this.state.hide === false
                  ? "alert alert-danger col-md-4"
                  : "hide"
              }
              role="alert"
            >
              {this.state.error}
            </div>
          )}
        </div>
        <div className="row">
          {!this.state.loading &&
            newData.map((item) => {
              return (
                <div className="col-md-4 mar">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">{item.name}</h3>
                      <h5 className="card-text">
                        {" "}
                        Confirmed Cases : {item.confirmedValue}
                      </h5>
                      <h5 className="card-text">
                        {" "}
                        Recovered Cases : {item.recoveredValue}
                      </h5>
                      <h5 className="card-text"> Deaths : {item.deathValue}</h5>
                      <h6 className="card-text">
                        {" "}
                        Recovered Rate : {item.recorveredRate} %
                      </h6>
                      <h6 className="card-text">
                        {" "}
                        Death Rate : {item.deathRate} %
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    );
  }
}
export default Countries;
