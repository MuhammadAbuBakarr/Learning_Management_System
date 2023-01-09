const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");
const { postAttendanceDaily } = require("./controllers/attendanceControllers");
dotenv.config({ path: "./config.env" });
const port = process.env.port;
require("./database/connection");
app.use(express.json());
app.use(require("./routes/routes"));
app.use(cookieParser());

// cron.schedule("0 0 * * *", postAttendanceDaily);
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
