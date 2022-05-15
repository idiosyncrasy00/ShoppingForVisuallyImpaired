const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const socket = require("socket.io")


const PORT = 8000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors({
    origin: "*"
}));

app.use(express.static("public"))

app.get("/hello", (req, res) => res.send("Hello there"));

// Routes

console.log("Setting routes ...")
app.use("/api", require("./src/routes"));

// Start project

(async () => {
    console.log("Setting database ...")
    const db = require("./src/models");
    await db.connect_db()

    const server = app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`))

    const io = socket(server, {
        cors: {
            origin: `http://localhost:${PORT}`
        }
    })

    require("./src/utils/socket")(io);

})();

