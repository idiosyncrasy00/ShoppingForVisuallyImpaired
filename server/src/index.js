const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")


const PORT = 8000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000"
}));

app.get("/", (req, res) => {
    res.send("Hello there")
});

// Database

(async () => {
    console.log("Setting database ...")
    const db = require("./models");
    await db.connect_db()
})();

// Routes

console.log("Setting routes ...")
app.use("/api/products", require("./routes/product.route"));

// Start project

app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`))