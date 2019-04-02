const express = require("express");
const proxy = require("http-proxy-middleware");
var cors = require("cors");

const app = express();

const port = 5050;
const BTFX_REST_URL = "https://api.bitfinex.com/v2";

app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

app.use(
  proxy("**", {
    target: BTFX_REST_URL,
    changeOrigin: true
  })
);

app.listen(port, () => console.log(`Node proxy listening on ${port}!`));
