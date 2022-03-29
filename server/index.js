
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
var routes = require('./routes.js');

app.use(express.json({
  limit:"100mb",
  }))

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});


app.use('/',routes);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

