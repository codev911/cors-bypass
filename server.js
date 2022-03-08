const axios = require('axios')
const cors = require('cors')

var express = require('express'),
    app = express(),
    port = process.env.PORT || 8000,
    bodyParser = require('body-parser')

var allowlist = ['http://localhost:4200', 'http://192.168.100.233:4200']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }

app.use(cors(corsOptionsDelegate));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/bypass', async (req,res) => {
    if(req.query.url === undefined || req.query.url === null){
        res.send({
            "error":"error"
        })
    }else{
        try{
            const data = await axios.get(req.query.url)
            res.send(data.data)
        }catch{
            res.send({
                "error":"error"
            })
        }
    }
})

app.listen(port);
console.log('Bullfrog cors bypass start on : ' + port);
