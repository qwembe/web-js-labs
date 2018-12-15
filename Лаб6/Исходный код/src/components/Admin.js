import React, { Component } from "react";
import BrokersList from "./BrokersList";

class Admin extends Component {
  state = {};
  componentDidMount() {
    this.loadBrokers();
    this.loadStocks();
  }
  loadBrokers = () => {
    fetch("http://localhost:3001/brokers")
      .then(res => res.json())
      .then(res =>
        this.setState({
          brokers: res
        })
      );
  };
  loadStocks = () => {
    fetch("http://localhost:3001/stocks")
      .then(res => res.json())
      .then(res =>
        this.setState({
          stocks: res
        })
      );
  };
  render() {
    console.log("--admin");
    return (
      <div>
        <h1>Hello Admin</h1>
        <BrokersList
          brokers={this.state.brokers}
          stocks={this.state.stocks}
          loadBrokers={this.loadBrokers}
          loadStocks={this.loadStocks}
        />
      </div>
    );
  }
}

export default Admin;
