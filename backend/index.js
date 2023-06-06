const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const user_routes = require("./routes/user.route");
const admin_routes = require("./routes/admin.route");
const doctor_routes = require("./routes/doctor.route");

const cors = require("cors");
// dotenv config
dotenv.config();

// mongo connection
connectDB();

// rest object
const app = express();

// cors call
app.use(cors());

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", user_routes);
app.use("/api/v1/admin", admin_routes);
app.use("/api/v1/doctor", doctor_routes);

// Port listen
const port = 8000;

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
