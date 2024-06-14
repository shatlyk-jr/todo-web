const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");
const sequelize = require("./config/database");

const app = express();
const PORT = process.env.PORT || 2001;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server alive on ${PORT}`);
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Database integrated");
    })
    .catch((err) => console.log(err));
});
