const express = require("express");

require("./Config/database");

const app = express();
const cors = require("cors");

const subscriptionsController = require("./Controllers/subscriptionsController");
const cinemaControllers = require("./Controllers/cinemaControllers");
const loginController = require("./Controllers/loginController");

app.use(express.json());
app.use(cors());

app.use("/subscriptions", subscriptionsController);
app.use("/cinema", cinemaControllers);
app.use("/auth", loginController);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
