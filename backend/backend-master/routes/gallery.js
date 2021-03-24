var express = require('express');
var router = express.Router();


const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})



/* initialise the gallery table */
router.get('/build', function(req, res, next) {
  pool.query('SELECT * FROM gallery', (error, results) => {
    if (error) {
      pool.query(`CREATE TABLE gallery (
        Title               varchar(80),
        ID                  int,
        ImageUrl            varchar(1000),
        Tag                 varchar(80),
        Dateadded           date
    );`, (error, results) => {
      if(error){
        console.log(error);
        res.status(200).json("error in table creation")
      }
      else
        res.status(200).json([])
      })
    }
    else
    res.status(200).json(results.rows)
  })
});




/* GET All gallery listing. */
router.get('/all', function(req, res, next) {
  pool.query(`SELECT * FROM gallery`,(error,results)=>{
    if (error) {
      res.status(200).json(error)
    } else {
      res.status(200).json(results.rows)
    }
  })
  //res.send('listing all images in the gallery of the college.');
});

/* GET single image data. */
router.get('/single/:id', function(req, res, next) {
  pool.query(`SELECT * FROM gallery where id=${req.params.id}`,(error,results)=>{
    if (error) {
      res.status(200).json(error)
    } else {
      res.status(200).json(results.rows)
    }
  })
  //res.send('Details of the single image bearing ID::'+req.params.id);
});

/* POST Add new single image data. */
router.post('/', function(req, res, next) {
  pool.query(`INSERT INTO GALLERY (title,imageurl,tag) 
  values('${req.body.title}','${req.body.imageurl}','${req.body.tag}')`,(error,results)=>{
      if(error){
        console.log(error);
        
        res.status(200).json(error)
      }
      else{
        console.log(results);
        
        res.status(200).json(results.rows)
      }
    })
  //res.send('Details of the single image bearing ID::'+req.params.id+'were being inserted into DB.');
});

/* UPDATE single image data. */
router.put('/', function(req, res, next) {
  res.send('Details of the single image bearing ID::'+req.params.id+'were being updated in DB.');
});


/* DELETE single image data. */
router.delete('/:id', function(req, res, next) {
  pool.query(`delete from gallery where id=${req.params.id}`,(error,results)=>{
    if(error){
      res.status(200).json(error)
    }
    else{
      res.status(200).json(results.rows)//returns [] if deletion is success
    }
  })
  //res.send('Details of the single image bearing ID::'+req.params.id+'were being removevd from DB.');
});

module.exports = router;
