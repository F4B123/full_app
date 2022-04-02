const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const routerController = require('./routes/routerController');
const cors = require("cors")
const userController = require('./controller/user-controller');


var corsOptions = {
  origin: function (origin, callback) {
    // db.loadOrigins is an example call to load
    // a list of origins from a backing database
    callback(null,true)
  }
}


app.use(cors(corsOptions))
app.use(express.json({limit:"100mb",}))
app.use(express.urlencoded({ extended: true }));

app.use('/',routerController);

app.get('/contract',userController.loginGetRole);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

