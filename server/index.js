const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const routerController = require('./routes/routerController');

app.use(express.json({limit:"100mb",}))
app.use(express.urlencoded({ extended: true }));

app.use('/',routerController);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

