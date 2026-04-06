const express = require("express");
const http = require("http");
const path = require("path");
const moment = require("moment-timezone");

const app = require("../app/app");
const attachIo = require("../socket/socket");
const centralRouter = require("../app/api/router");

// const { scheduleBowsysTodoDueDateJob } = require("../app/middleware/utilities/todoBowsysUtil");

require("dotenv").config({ path: path.join(__dirname, "../.env") });
const PORT = 3001
const httpServer = http.createServer(app);
const io = attachIo(httpServer);

// scheduleBowsysTodoDueDateJob();

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

app.use("/", centralRouter);

// require("../socket/auctionSocket")(io);  //! devMuuguu: ашиглахгүй тул comment хийв
require("../socket/internetSocket")(io);
require("../socket/chatSocket")(io);

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(moment().tz("Asia/Ulaanbaatar").format("YYYY-MM-DD HH:mm:ss"), `- Listening on port ${PORT}`);
});