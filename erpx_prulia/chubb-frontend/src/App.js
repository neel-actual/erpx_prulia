import React from "react";
import "./App.scss";
import { HashRouter as Router, Route } from "react-router-dom";
import PersonalAccidentInsurance from "./components/PersonalAccidentInsurance/PersonalAccidentInsurance";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation";
import Home from "./components/Homepage/home";
import Form from "./components/Form/form";
import Declaration from "./components/Declaration/Declaration";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      premiums: {
        mainInsured: "265",
        spouse: "265",
        child: "26.50"
      },
      total: 0,
      mainInsured: false,
      spouse: false,
      child: false,
      childs: 1,
      childsArr: [],
      memberDetails: {}
    };
  }

  getChecked = (ev, name) => {
    this.setState(
      {
        [name]: !this.state[name]
      },
      () => {
        this.recalculateTotal(ev);
      }
    );
  };

  gettingValues = (ev, name) => {
    if (name === "childs") {
      if (ev.target.value <= 0) {
        ev.target.value = 1;
      }
      let childsArr = [];
      for (let i = 0; i < ev.target.value; i++) {
        childsArr.push(i);
      }
      this.setState(
        {
          childsArr,
          [name]: ev.target.value
        },
        () => {
          this.recalculateTotal();
        }
      );
    } else {
      this.setState(
        {
          [name]: ev.target.value
        },
        () => {
          this.recalculateTotal();
        }
      );
    }
  };

  recalculateTotal = () => {
    let sum = Object.keys(this.state.premiums).reduce((sum, key) => {
      if (this.state[key]) {
        let val = parseFloat(this.state.premiums[key]);

        if (key === "child") val *= this.state.childs;

        sum += val;
      }

      return sum;
    }, 0);

    this.setState({
      total: sum
    });
  };

  render() {
    return (
      <div>
        <Router>
          <Route
            path="/personal-accident-insurance"
            render={() => (
              <PersonalAccidentInsurance
                gettingValues={this.gettingValues}
                getChecked={this.getChecked}
                state={this.state}
              />
            )}
          />

          <Route
            path="/personal-information"
            render={() => (
              <PersonalInformation
                state={this.state}
                gettingValues={this.gettingValues}
                getChecked={this.getChecked}
              />
            )}
          />

          <Route exact path="/" render={() => <Home state={this.state} />} />

          <Route
            exact
            path="/proposal-form"
            render={() => (
              <Form state={this.state} gettingValues={this.gettingValues} />
            )}
          />

          <Route
            exact
            path="/declaration"
            render={() => (
              <Declaration
                state={this.state}
                gettingValues={this.gettingValues}
                getChecked={this.getChecked}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
