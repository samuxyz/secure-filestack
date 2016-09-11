import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import getPermissions from './src/core';
import list from './data';

const app = express();
const port = process.env.PORT || 8080;

//setup Pug(Jade)
app.set('view engine', 'pug')
   .set('views', './views');

//Log with Morgan
app.use(morgan('dev'));

//parse the body to get picture data                                        
app.use(bodyParser.urlencoded({extended: true}));          

//Static files
app.use(express.static(__dirname + '/public')); 

//Index
app.route('/')
	.get((req, res) => res.render('index', {list}));

//Upload
app.route('/upload')
	.get((req, res) => res.render('upload', getPermissions()))
	.post((req,res) => {
		let {url, caption} = req.body;
		let handler = url.substring(url.lastIndexOf('/') + 1);
		let permissions = getPermissions(handler);
		list.push(Object.assign({handler, caption}, permissions));
		res.redirect('/upload');
	});

app.listen(port);

console.log(`listening on port ${port}`);