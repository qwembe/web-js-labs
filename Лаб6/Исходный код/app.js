const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
let barge = require("./barge.json");
const fs = require("fs");
const io = require("socket.io").listen(3030);

const app = express();

app.use(cookieParser());
app.use(express.static(__dirname));

const corsOptions = {
  credentials: true,
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.get("/", (req, res, next) => {
  console.log("get /");
  const { name, password } = req.query;
  const broker = barge.brokers
    .concat(barge.admin)
    .find(broker => broker.login === name && broker.password === password);
  if (broker) res.status(200).json(broker);
});

app.get("/brokers", (req, res, next) => {
  const stocks = barge.stocks;
  const newBrokers = barge.brokers.map(broker => {
    const emptyStocks = stocks.filter(
      stock => !broker.stocks.find(item => item.id === stock.id)
    );
    return Object.assign({}, broker, {
      stocks: broker.stocks
        .map(brokerStock => {
          const stock = stocks.find(item => brokerStock.id === item.id);
          return Object.assign({}, brokerStock, {
            distribution: stock.distribution,
            price: stock.price,
            totalCount: stock.count
          });
        })
        .concat(
          emptyStocks.map(stock => {
            return {
              id: stock.id,
              distribution: stock.distribution,
              price: stock.price,
              totalCount: stock.count,
              count: 0
            };
          })
        )
    });
  });
  res.json(Object.assign(newBrokers));
});

app.get("/barge", (req, res, next) => {
  res.json(barge.barge);
});

app.get("/stocks", (req, res, next) => {
  const { stocks, brokers } = barge;
  const newStocks = stocks.map(stock => {
    return Object.assign({}, stock, {
      leftCount:
        stock.count -
        brokers.reduce((prev, cur) => {
          return (
            prev +
            (cur.stocks.find(brokerStock => brokerStock.id === stock.id)
              ? +cur.stocks.find(brokerStock => brokerStock.id === stock.id)
                  .count
              : 0)
          );
        }, 0)
    });
  });
  res.json(newStocks);
});

app.post("/stocks/buy", (req, res, next) => {
  let { stockId, count, brokerId } = req.body;
  stockId = +stockId;
  count = +count;
  console.log("post /stocks/buy");
  const broker = barge.brokers.find(broker => broker.id === +brokerId);
  const stock = barge.stocks.find(stock => stock.id === stockId);
  const brokerStock = broker.stocks.find(
    brokerStock => brokerStock.id === stockId
  );
  if (!brokerStock) {
    broker.stocks.push({
      id: stockId,
      count
    });
  } else {
    brokerStock.count += count;
  }
  broker.bank -= count * stock.price;
  writeToJSON("./barge.json", barge);
  res.json(barge);
});

io.on("connection", socket => {
  console.log("New client connected");
  socket.on("updateComponents", () => {
    console.log("update");
    io.sockets.emit("updateComponents");
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.post("/stocks/sell", (req, res, next) => {
  let { stockId, count, brokerId } = req.body;
  stockId = +stockId;
  count = +count;
  console.log("post /stocks/sell");
  const broker = barge.brokers.find(broker => broker.id === +brokerId);
  const stock = barge.stocks.find(stock => stock.id === stockId);
  const brokerStock = broker.stocks.find(
    brokerStock => brokerStock.id === stockId
  );
  brokerStock.count -= count;
  broker.bank += count * stock.price;
  writeToJSON("./barge.json", barge);
  res.json(barge);
});

app.post("/barge", (req, res, next) => {
  const { startTime, endTime, intervalTime } = req.body;
  const bargeObj = {
    startTime,
    endTime,
    intervalTime
  };
  console.log(bargeObj);
  Object.assign(barge.barge, bargeObj);
  writeToJSON("./barge.json", barge);
  res.json(barge);
});

app.get("/brokers/:id", (req, res, next) => {
  const broker = barge.brokers.find(broker => broker.id === +req.params.id);
  const stocks = barge.stocks;
  const emptyStocks = stocks.filter(
    stock => !broker.stocks.find(item => item.id === stock.id)
  );
  const newStocks = broker.stocks
    .map(brokerStock => {
      const stock = stocks.find(item => brokerStock.id === item.id);
      return Object.assign({}, brokerStock, {
        distribution: stock.distribution,
        price: stock.price,
        totalCount: stock.count
      });
    })
    .concat(
      emptyStocks.map(stock => {
        return {
          id: stock.id,
          distribution: stock.distribution,
          price: stock.price,
          totalCount: stock.count,
          count: 0
        };
      })
    );
  const newBroker = Object.assign({}, broker, {
    stocks: newStocks
  });
  res.json(newBroker);
});

function writeToJSON(url, data) {
  fs.writeFileSync(url, JSON.stringify(data, null, 4), "utf-8", err => {
    if (err) throw err;
  });
}

app.listen(3001, "0.0.0.0", err => {
  if (err) {
    console.log(err);
  }
  console.info(
    "==> 🌎 Listening on port %s. Open up http://0.0.0.0:3001/ in your browser."
  );
});
