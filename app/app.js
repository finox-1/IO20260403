const express = require("express");
var path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const webPush = require("web-push");

// const { renewCertificates } = require("./api/certbotRenewal");
// renewCertificates();

const app = express();

app.set("view engine", "ejs");

app.use(
  cors({
    origin: [
      "http://localhost",
      "http://localhost:8080",
      "http://localhost:3000",
      "http://bowsys.mn:3000",
      "http://103.119.92.95:3001",
      "https://bowsys.mn",
      "http://bowsys.mn",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/static", express.static(path.join(__dirname, "./api/assets")));

// app.use("/static/qrmenu", express.static(process.env.BASE_QRMENU_IMAGES_DIR));
// app.use("/static/qrcode", express.static(process.env.BASE_QRMENU_QRCODES_DIR));

app.use(express.static(path.join(__dirname, "../dist")));

app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    type: "error",
    message: err.message,
  });
});

const publicVapidKey = "";
const privateVapidKey = "";

// webPush.setVapidDetails("mailto:test@example.com", publicVapidKey, privateVapidKey);

const subscriptions = {};

app.post("/subscribe", (req, res) => {
  const { email, subscription } = req.body;
  if (!email || !subscription) {
    return res.status(400).json({ error: "Email and subscription are required." });
  }

  subscriptions[email] = subscription;

  console.log("New subscription added for:", email, subscription);

  return res.status(201).json({ message: "Subscription saved." });
});

app.post("/sendNotification", async (req, res) => {
  const { email, title, message } = req.body;
  console.log(req.body);

  if (!email || !title || !message) {
    return res.status(400).json({ error: "email, title, and message are required" });
  }

  const subscription = subscriptions[email];
  console.log(subscription);

  if (!subscription) {
    return res.status(404).json({ error: `No subscription found for ${email}` });
  }

  const payload = JSON.stringify({ title, message });

  try {
    // await webPush.sendNotification(subscription, payload);
    res.status(200).json({ message: `Notification sent to ${email}` });
  } catch (err) {
    console.error("Error sending notification:", err);
    res.status(500).json({ error: "Failed to send notification." });
  }
});

app.get("/sendNotification", async (req, res) => {
  // Retrieve subscription by email
  const subscription = subscriptions["b"];
  console.log(subscription);

  let m = "HELLO";
  const payload = JSON.stringify({ m });

  try {
    // await webPush.sendNotification(subscription, payload);
    res.status(200).json({ message: `Notification sent to $b` });
  } catch (err) {
    console.error("Error sending notification:", err);
    res.status(500).json({ error: "Failed to send notification." });
  }
});

module.exports = app;
