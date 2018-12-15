import React, { Component } from "react";
import UserContent from "./UserContent";

class User extends Component {
  state = {};
  componentDidMount() {
    this.loadBroker();
    this.loadStocks();
  }
  loadBroker = () => {
    fetch(`http://localhost:3001/brokers/${this.props.id}`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          broker: res
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
    const { broker, stocks } = this.state;
    if (!broker || !stocks) return <div />;
    console.log("--user");
    return (
      <div class="w3-container">
        <UserContent
          broker={broker}
          stocks={stocks}
          loadBroker={this.loadBroker}
          loadStocks={this.loadStocks}

        />
      </div>
    );
  }
}

export default User;
