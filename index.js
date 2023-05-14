// index.js
const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(express.static("public"));
app.set("port", process.env.PORT || 3000);

// task api routing settings
app.use("/api/v1/tasks", taskRoute);

/*
app.listen(app.get("port"), () => {
    console.log(`The server is running at http://localhost:${app.get("port")}.`);
});
*/

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(app.get("port"), () => {
        console.log(`The server is running at http://localhost:${app.get("port")}.`);
    });
    } catch (err) {
        console.log(err);
    }
}
start();