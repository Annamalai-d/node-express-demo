const express = require('express');
const app = express();
const Joi = require('joi');
const logger = require('./logger');
const Auth = require('./Authenticator');
//Built-in-middlewares
app.use(express.json()); // to parse the json object if any in request body  
app.use(express.urlencoded({extended: true})); // to convert the req body to json format and to serve the request 
app.use(express.static()); // to serve the static files in the appliucation like(txt, img, etc..)

//Custom middlewares
app.use(logger);
app.use(Auth);

const courses = [
	{id:1, name:'course1'},
	{id:2, name:'course2'},
	{id:3, name:'course3'}
];
const port = process.env.PORT || 3000;
app.get('/', (req, res)=> {
	res.send('Home');
});

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id == parseInt(req.params.id));
	if(!course){
		res.status(404).send('No such course is available');
	}
	res.send(course);
});

app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  }
  const result = Joi.validate(req.body, schema);
  if(result.error)
  {
    res.status(400).send(result.error.details[0].message);
    return;
  }
	const course = {
      id: courses.length + 1,
      name: req.body.name
		};  
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id == parseInt(req.params.id));
  console.log(course)
	if(!course){
		res.status(404).send('No such course is available');
  }  
  const {error} = ValidateCourse(req.body);
  if(error)
  {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

function ValidateCourse (course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
 return Joi.validate(course, schema);
}

app.listen(port, () => console.log(`Listening to ${port}..`));