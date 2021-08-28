var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const cors = require('cors');
const { query } = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.post('/getstockdetails', (req, res) => {
  const { api_key } = req.body;
  const decodedApiKey = Buffer.from(api_key, 'base64').toString('ascii');
  const [username, password] = decodedApiKey.split("&");
  if (username == "Batman" && password == "iambatman") {
    var con = mysql.createConnection({
      host: "sql6.freemysqlhosting.net",
      port: 3306,
      user: "sql6433285",
      password: "My5hLwyYKi",
      database: "sql6433285"
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log("connected");
      con.query("SELECT * FROM stockdetails", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.status(200).send({ result: result });
      });
    });
  }
});

var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
