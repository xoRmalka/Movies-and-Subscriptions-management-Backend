const express = require("express");
const moviesBLL = require("./BLL/moviesBLL");
const membersBLL = require("./BLL/membersBLL");

require("./Config/database");

const app = express();
const cors = require("cors");

const subscriptionsControllers = require("./Controllers/subscriptionsControllers");

app.use(express.json());
app.use(cors());

// moviesBLL.getAllMoviesAndSave();
// membersBLL.getAllMembersAndSave();

app.use("/subscriptions", subscriptionsControllers);

app.listen(8001, () => {
  console.log("Server running on port 8001");
});
