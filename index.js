// importação das libs
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
// const moment = require('moment');
const path = require('path');

// atribuindo ao app a função express
const app = express();

// configuração global do servidor
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  const ano = req.body.dtnascimento.substr(0, req.body.dtnascimento.length - 6);
  // let ano = req.body.dtnascimento.getFullYear();
  // let dateObj = new Date();
  // let month = dateObj.getUTCMonth() + 1; //months from 1-12
  // let day = dateObj.getUTCDate();
  // let year = dateObj.getUTCFullYear();

  // let newdate = year + "-" + month + "-" + day;

  // const idade = moment().diff(moment(newdate, 'YYYY-MM-DD'), moment(req.body.dtnascimento, 'YYYY-MM-DD'));
  // console.log(idade);

  if ((2018 - ano) >= 18) {
    res.redirect(`/major?nome=${req.body.nome}`);
  } else {
    res.redirect(`/minor?nome=${req.body.nome}`);
  }
});

app.use(['/major', '/minor'], (req, res, next) => {
  if (!req.query.nome) {
    res.redirect('/');
  }
  next();
});

app.get('/major', (req, res) => {
  res.send(`Parabéns ${req.query.nome}, você tem mais que 18 anos.`);
  res.render('major');
});

app.get('/minor', (req, res) => {
  res.send(`Que pena ${req.query.nome}, você tem menos que 18 anos.`);
  res.render('minor');
});

app.listen(3000);
