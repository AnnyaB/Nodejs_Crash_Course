
/*const Person = require('./person');

const person1 = new Person('Krsna', 16);

person1.greeting();


const Logger = require('./logger');

const logger = new Logger();

logger.on('message', (data) => console.log('Called Listener: ', data )); 

logger.log('Hare Krsna'); 
logger.log('All glories to Srila Prabhupada'); 
logger.log('Jai Jai Shree Radhe');*/ 


const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {

    //console.log(req.url)

    /*if(req.url == '/api/users'){


        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {

        if(err) throw err;
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(content);

        
        const users =  [

                {name: 'Radha Raman', age : 15},
                {name: 'Sita Nath', age : 20},
                {name: 'Revati Nath', age : 16}

        ];

        res.writeHead(200, {'Content-Type':'application /json'});
        res.end(JSON.stringify(users));

        }*/
        

    //Build file path 

    let filePath = path.join(__dirname, 'public', req.url === '/'? 'index.html' : req.url );


    
    /*console.log(filePath)
    res.end();*/


    //Extension of file 

    let extname = path.extname(filePath);

    //Initial content type 

    let contentType = 'text/html';

    //Check ext and set content type 

    switch(extname) {

       case '.js':
         contentType = 'text/javascript';
         break;

       case '.css':

         contentType = 'text/css';
         break;

       case '.json':
          
         contentType = 'application/json';
        break;

        case '.png':

         contentType = 'image/png';
         break;

         case '.jpg':

         contentType = 'image/jpg';

         break;

    }

    //Read File 
    
    fs.readFile(filePath, (err, content) => {

        if(err){

            if(err.code == 'ENOENT'){

                //page Not Found 

                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {

                
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end(content, 'utf8');
                
            })


            } else {


                //Some server error 

                res.WriteHead(500);
                res.end('Server Error: ', err.code);

            }
        }   else{

            //Success 

             res.writeHead(200, {'Content-Type':contentType});
             res.end(content, 'utf8');

        }
    });

});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log('Server running on port', PORT));
