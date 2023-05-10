const express = require("express");
const moviesBLL = require("./BLL/moviesBLL");
const membersBLL = require("./BLL/membersBLL");

require("./Config/database");

const app = express();
const cors = require("cors");

const subscriptionsMoviesController = require("./Controllers/subscriptionsMoviesController");
const subscriptionsMembersController = require("./Controllers/subscriptionsMembersController");

app.use(express.json());
app.use(cors());

//First data import
// moviesBLL.getAllMoviesAndSave();
// membersBLL.getAllMembersAndSave();

app.use("/movies", subscriptionsMoviesController);
app.use("/members", subscriptionsMembersController);

app.listen(8001, () => {
  console.log("Server running on port 8001");
});
