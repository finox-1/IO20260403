const express = require("express");
const router = express.Router();
const path = require("path");



// const todoDemoRouter = require("./todoDemo");

// router.use("/demo", todoDemoRouter);

router.get((req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

module.exports = router;