const express = require("express");
require("./db/mongoose");
// require external routers
const userRouter = require("./router/user");


const app = express();
const port = process.env.PORT;


app.use(express.json()); // parse incoming JSON into a JS object
app.use(express.static('public')); // the React app will be bundled and placed in the public folder
app.use(userRouter); // load external routers

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => console.log(`App is up and running and listening on port ${port}`));
