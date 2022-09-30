const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

const app = express();
app.set('port', process.env.PORT || 3000)

// Where we will keep books
let books = [];

app.use(cors());
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// Configuring body parser middleware
app.use(bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(app.get('port'), () => console.log(`app listening on port ${app.get('port')}!`))