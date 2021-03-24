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


/* initialise the placements table */
router.get('/build', function(req, res, next) {
  pool.query('SELECT * FROM placements', (error, results) => {
    if (error) {
      pool.query(`CREATE TABLE placements (
        ID                  int,
        Year                int,
        Percentage          int
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


/* GET All placements listing.for admin page */
router.get('/all', function(req, res, next) {

  pool.query('SELECT * FROM placements', (error, results) => {
    
      if(error){
        console.log(error);
        
        res.status(200).json("error in table creation")

      }
      else{
        res.status(200).json(results.rows)
      }
    }
  )
  //res.send('listing all the placements of the college');
});

/* GET recent placements listing.for display */
router.get('/recent', function(req, res, next) {
  pool.query('SELECT * FROM placements order by id desc limit 5', (error, results) => {
    if(error){
      console.log(error);
      res.status(200).json("error in table creation")
    }
    else{
      res.status(200).json(results.rows)
    }
  }
)// res.send('listing all the placements of the college.From Department '+req.params.department);
});

/* GET single placements data. */
router.get('/single/:id', function(req, res, next) {
  pool.query(`SELECT * FROM placements where id= ${req.params.id}`, (error, results) => {
    if(error){
      console.log(error);
      res.status(200).json("error in table creation")
    }
    else{
      res.status(200).json(results.rows)
    }
  }
) 
 // res.send('Details of the single placements bearing ID::'+req.params.id);
});

/* POST Add new single placements data. */
router.post('/', function(req, res, next) {
  pool.query(`INSERT INTO placements (year,percentage)
   values ('${req.body.year}','${req.body.percentage}'); `, (error, results) => {
    if(error){
      console.log(error);
      res.status(200).json("error in table creation")
    }
    else{
      res.status(200).json(results.rows)
    }
  }
)
  //res.send('Details of the single placements bearing ID::'+req.params.id+'were being inserted into DB.');
});

/* UPDATE single placements data. */
router.put('/', function(req, res, next) {
  res.send('Details of the single placements bearing ID::'+req.params.id+'were being updated in DB.');
});


/* DELETE single placements data. */
router.delete('/:id', function(req, res, next) {
  pool.query(`DELETE FROM placements WHERE id=${req.params.id}`, (error, results) => {
    if(error){
      console.log(error);
      res.status(200).json("error in table creation")
    }
    else{
      res.status(200).json(results.rows)//returns [] if successfull
    }
  }
)
 // res.send('Details of the single placements bearing ID::'+req.params.id+'were being removevd from DB.');
});

module.exports = router;
