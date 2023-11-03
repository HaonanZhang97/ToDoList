import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
var daily = [];
var work = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  const now = new Date()
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const day = now.toLocaleDateString("en-US", options);
  res.render('index.ejs', { listTitle: day, list: daily });
});

app.post('/', (req, res) => {
  if (req.body.delete) {
    daily.splice(req.body.delete, 1);
  } else {
    daily.push([req.body.Heading, req.body.Detail]);
  }
  res.redirect('/')
});

app.get('/work', (req, res) => {
  res.render('index.ejs', { listTitle: "Get Ready to Work", list: work });
});

app.post('/work', (req, res) => {
  if (req.body.delete) {
    work.splice(req.body.delete, 1);
  } else {
    work.push([req.body.Heading, req.body.Detail]);
  }
  res.redirect('/work')
});

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
