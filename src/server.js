const express = require("express");
const getRoutes = require("./routes");

const app = express();
const port = 3000;

const publicFolder = `${__dirname}/public`;

app.use(express.static(publicFolder));
app.set("view engine", "ejs");
const routes = getRoutes();
app.use(routes);

app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
