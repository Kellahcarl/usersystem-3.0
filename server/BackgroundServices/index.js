require("dotenv").config();
const cron = require("node-cron");
const express = require("express");
const path = require("path");
const cors = require("cors");

const registration = require("./controllers/registration");
// const projectAssign = require("./controllers/project-assign");
const taskAssign = require("./controllers/taskAssign");

const run = async () => {
  cron.schedule("2 * * * * *", async () => {
    await registration.run();
  });

  //   cron.schedule("2 * * * * *", async () => {
  //     await projectAssign.run();
  //   });
  cron.schedule("2 * * * * *", async () => {
    await taskAssign.run();
  });
};

run();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set("views", path.join(__dirname, "views"));

app.get("*", (req, res) => {
  res.status(404).send({ message: "Page not found" });
});

const PORT = process.env.EMAIL_SERVER_PORT;
app.listen(PORT, () =>
  console.log(`background services running on port ${PORT}`)
);
