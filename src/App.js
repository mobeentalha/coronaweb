import React, { Component }  from 'react';
import axios from 'axios';
import './App.css';
import Logo from './logo.png'

class App extends Component { 
  state = { 
    data: [],
    confirmedCases: '',
    recoveredCases: '',
    deaths: '', 
    allConfirmed: [],
    countriesList: []
  };
  componentDidMount() {
    axios.get(`https://covid19.mathdro.id/api/countries`)
      .then(res => {
        console.log('Countries ', res.data.countries)
        const cID = res.data.countries;
        this.setState({countriesList : cID})
      })
    
    

    axios.get(`https://covid19.mathdro.id/api`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
        this.setState({confirmedCases: res.data.confirmed})
        this.setState({recoveredCases: res.data.recovered})
        this.setState({deaths: res.data.deaths})
      })
      axios.get(`https://covid19.mathdro.id/api/confirmed`)
        .then(res => {
          const data = res.data;
          this.setState({allConfirmed:  data });
        })
  }
  componentDidUpdate(){
    if(this.state.countriesList.length > 0){
      const countriesList = this.state.countriesList;
      countriesList.map(value => 
        axios.get(`https://covid19.mathdro.id/api/countries/`+value.name)
          .then(res => {
            console.log('Result ', res.data.confirmed.value)
            this.setState({allConfirmed: res.data.confirmed.value})
          })
      )
    }
  }
  render (){
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
          <div className="d-flex justify-content-center">
            <div class="card c1">
              <div class="card-body">
                <h3 class="card-title">World Wide</h3>
                <h5 class="card-text"> Total Confirmed Cases :  
                    <span className="bold-text">{this.state.confirmedCases === '' ? '' : this.state.confirmedCases.value}</span>
                </h5>
                <h5 class="card-text"> Total Recovered Cases :  
                  <span className="bold-text">
                    {this.state.recoveredCases === '' ? '' : this.state.recoveredCases.value}
                  </span>
                </h5>
                <h5 class="card-text"> Total Deaths :  
                  <span className="bold-text">
                    {this.state.deaths === '' ? '' : this.state.deaths.value}
                  </span>
                </h5>
              </div>
            </div>
          </div>
          <div className="container bg">
            <h1 className="text-center"> Countries</h1>
            <div className="row mar"> 
            {/* {this.state.allConfirmed.forEach(all =>  
               <p> {all}</p>
            )} */}
            </div>
          </div>
        </section>
     </section>
  )
}
}

export default App;
