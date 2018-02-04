const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine','hbs');

//Middlewars
app.use((req,res,next)=>{
	debugger;
	var now = new Date().toString();
	var log = `${now}:${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log + '\n',(err)=>{												
					if(err)
					{console.log('Unable to append to server log.');}
												});
											
												
												
												
	next();
	
});
app.use(express.static(__dirname +'/public'));
/* app.use((req,res,next)=>{
	res.render('maintainance.hbs',{
		
		downTimeMessage:'Site is under maintainance!'
		
	});											
		
	
}); */

hbs.registerHelper('getCurrentFullYear',()=>{
	
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
	
	return text.toUpperCase();
	
});

//Request Handlers

app.get('/',(req, res)=>{
	
	//res.send('<h1>Hello Express!<h1>');
	/* res.send({
		name:'Andrew',
		likes:['Eating','Sleeping']
	
	});
	 */
	
	 
	 res.render('home.hbs',{
			pageTitle:'Home Page',
			welcomeMessage:'Welcome Home!'
	 });
	 
	 
	 
});
app.get('/about',(req,res)=>{
	
	res.render('about.hbs',{
		
		pageTitle : 'About page'
				
	});
	
});

app.get('/projects',(req,res)=>{
	res.render('projects.hbs',{
		
		pageTitle : 'Portfolio page',
		projectsMessage:'Thank you for visiting my portfolio'
	});
	
});



app.get('/bad',(req,res)=>{
	
	res.send({
		errorMessage:"Something Went Wrong"
		
	});
	
});



app.listen(port,()=>{
	
	console.log(`Server is up on port ${port}` );
});