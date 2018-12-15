import React, { Component } from "react";
import openSocket from "socket.io-client";

class BrokersList extends Component {
  constructor(props) {
    super(props);
    this.socket = openSocket("http://localhost:3030");
    this.connect();
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }
  connect = () => {
    this.socket.on("updateComponents", data => {
      console.log(this.socket);
      this.props.loadBrokers();
      this.props.loadStocks();
    });
  };
  render() {
    if (!this.props.brokers || !this.props.stocks) return <div />;
    const { brokers, stocks } = this.props;
    console.log("--brokers list", brokers);
    const brokersList = brokers.map(broker => {
      return (
        <li key={+broker.id}>
          <div>
            {broker.firstName} {broker.surName}
          </div>
          <div>Bank: {broker.bank}</div>
          <ul>
            {broker.stocks
              .map(stock => {
                return (
                  <li key={+stock.id}>
                    {stock.distribution}: {stock.count}
                  </li>
                );
              })
              .sort((a, b) => {
                return +a.key - +b.key;
              })}
          </ul>
        </li>
      );
    });
    const stocksList = stocks.map(stock => {
      return (
        <li key={stock.id}>
          {stock.distribution}: {stock.leftCount}
        </li>
      );
    });
    return (
      <div>
        <ul>{brokersList}</ul>
        <ul>{stocksList}</ul>
      </div>
    );
  }
}

export default BrokersList;
