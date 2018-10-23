const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const users = [
  {uid:1, name:'mark', email:'mark@mail.com', password:'mark@123'},
  {uid:2, name:'karthi', email:'karthi@mail.com', password:'karthi@123'},
  {uid:3, name:'joel', email:'joel@mail.com', password:'joel@123'}
];

// get all users
app.get('/api/users', (req, res) => {
  res.send(users);
});

//get user by id
app.get('/api/users/:id', (req, res) => {  
  const user = users.find(u => u.uid === parseInt(req.params.id));
  if(!user) res.status(404).send('No records with the mentioned uid: '+req.params.id)
  res.send(user);
});

//get user by email
app.get('/api/users/:email', () => {
  const user = users.find(u => u.email === req.params.email);
  if(!user) res.status(404).send('No records with the mentioned email: '+req.body.email)
  res.send(user);
});

// create new user

app.listen(port, () => console.log(`listening to ${port}..`));
