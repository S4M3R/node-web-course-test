const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

const port = process.env.PORT || 3000;
var app = express();

//MiddleWares
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

//Modo mantenimento
// app.use((req,res,next) => {res.render('mantenimiento.hbs')});

app.use(express.static(__dirname+"/public"));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n', (err) => {
    if(err){
      console.log(err);
    }
  })
  next();
});


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
})


app.get('/',(req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomeMessage: 'Hola gente',
    currentYear: new Date().getFullYear()
  });
  // // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Agustin',
  //   likes: [
  //     'Caminar',
  //     'Correr'
  //   ]
  // });
});

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
});

app.get('/projects', (req, res) => {
  res.render('projects', {
    pageTitle: 'Projects'
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
