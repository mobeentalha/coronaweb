import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class Countries extends Component {
  state = {
    allList: [],
    newList: [],
    loading: true,
  };
  stateSetting(list) {
    this.setState({ newList: this.state.newList.concat([list]) });
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
            recorveredRate: this.roundValue((res.data.recovered.value / res.data.confirmed.value) * 100),
            deathRate: this.roundValue((res.data.deaths.value / res.data.confirmed.value) * 100)
          };
          this.stateSetting(object);
          if (i === lastIndex) {
            this.setState({ loading: false });
          }
        });
    });

    return true;
  }
  roundValue(num){
    return +(Math.round(num + "e+2")  + "e-2");
  }
  render() {
    return (
      <div className="row">
        {!this.state.loading &&
          this.state.newList.map((item) => {
            return (
              <div className="col-md-4 mar">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">{item.name}</h3>
                    <h5 className="card-text"> Confirmed Cases : {item.confirmedValue}</h5>
                    <h5 className="card-text"> Recovered Cases : {item.recoveredValue}</h5>
                    <h5 className="card-text"> Deaths : {item.deathValue}</h5>
                    <h6 className="card-text"> Recovered Rate : {item.recorveredRate} %</h6>
                    <h6 className="card-text"> Death Rate : {item.deathRate} %</h6>
                  </div>
                </div>
              </div> 
            );
          })}
        
      </div>
    );
  }
}
export default Countries;
