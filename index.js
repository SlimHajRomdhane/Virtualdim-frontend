const express = require("express");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");

const app = express();
app.use(history());
app.use(serveStatic(__dirname + "/build"));

app.listen(3000);
