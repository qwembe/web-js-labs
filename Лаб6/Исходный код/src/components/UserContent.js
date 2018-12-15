import React, {Component} from "react";
import openSocket from "socket.io-client";

class UserContent extends Component {
    constructor(props) {
        super(props);
        this.socket = openSocket("http://localhost:3030");
        this.connect();
    }

    componentWillMount() {
        console.log("will mount");
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    connect = () => {
        this.socket.on("updateComponents", data => {
            console.log(this.socket);
            this.props.loadBroker();
            this.props.loadStocks();
        });
    };

    handleBuy(e) {
        e.preventDefault();
        const {broker, stocks} = this.props;
        const count = e.target.parentElement.elements.buy.value;
        const stock = stocks.find(item => item.id === +e.target.dataset.id);
        if (broker.bank < stock.price * count) {
            alert("Не достаточно средств для покупки");
            return;
        }
        if (count > stock.leftCount) {
            alert("Нет столько акций");
            return;
        }
        if (count < 0 || isNaN(+count)) {
            alert("Не правильный ввод");
            return;
        }
        fetch("http://localhost:3001/stocks/buy", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                stockId: stock.id,
                count,
                brokerId: broker.id
            })
        }).then(() => this.socket.emit("updateComponents"));
    }

    handleSell(e) {
        e.preventDefault();
        const {broker} = this.props;
        const count = e.target.parentElement.elements.sell.value;
        const stockId = +e.target.dataset.id;
        const brokerStock = broker.stocks.find(item => item.id === stockId);
        if (brokerStock.count < count) {
            alert("У Вас нет столько акций");
            return;
        }
        if (count < 0 || isNaN(+count)) {
            alert("Не правильный ввод");
            return;
        }
        fetch("http://localhost:3001/stocks/sell", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                stockId,
                count,
                brokerId: broker.id
            })
        }).then(() => this.socket.emit("updateComponents"));
    }

    render() {
        const {broker, stocks} = this.props;
        console.log("--userContent");
        const brokerStocksPrice = broker.stocks.map(stock => {
            return (
                <li key={stock.id}>
                    <div>{stock.distribution}</div>
                    <div>count: {stock.count}</div>
                    <div>{stock.count * stock.price}$</div>
                </li>
            );
        });
        const stocksList = stocks.map(stock => {
            return (
                <li key={stock.id}>
                    <h3>{stock.distribution}</h3>
                    <div>left count: {stock.leftCount}</div>
                    <div>total count: {stock.count}</div>
                    <div>price: {stock.price}</div>
                    <form>
                        <label htmlFor="buy">Buy: </label>
                        <input type="text" name="buy"/>
                        <input
                            type="submit"
                            value="buy"
                            onClick={e => this.handleBuy(e)}
                            data-id={stock.id}
                        />
                    </form>
                    <form>
                        <label htmlFor="sell">Sell: </label>
                        <input type="text" name="sell"/>
                        <input
                            type="submit"
                            value="sell"
                            onClick={e => this.handleSell(e)}
                            data-id={stock.id}
                        />
                    </form>
                </li>
            );
        });
        return (
            <div class = " w3-container ">
                <h2 class="w3-container ">
                    {broker.firstName}  {broker.surName }
                </h2>
                <div class="w3-container">Bank: {broker.bank}</div>
                <ul class="w3-ul w3-card-4" style={{width:25 +'%'}} >{brokerStocksPrice}</ul>
                <ul class="w3-ul w3-border w3-margin" style={{width:30 +'%'}} >{stocksList}</ul>
            </div>
        );
    }
}

export default UserContent;
