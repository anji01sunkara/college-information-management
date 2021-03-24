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


/* initialise the notices table */
router.get('/build', function(req, res, next) {
  pool.query('SELECT * FROM notices', (error, results) => {
    if (error) {
      pool.query(`CREATE TABLE notices (
        ID                  int,
        NoticeData          varchar(80),
        link          varchar(80),
        DateAdded           date
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




/* GET All notices listing.for admin page */
router.get('/all', function(req, res, next) {
  pool.query(`select * from notices`,(error,results)=>{
    if(error){
      res.status(200).json(error)
    }
    else{
      res.status(200).json(results.rows)
    }
  })
  //res.send('listing all the notices of the college..');
});

/* GET recent notices listing.for display */
router.get('/recent', function(req, res, next) {
  pool.query(`select * from notices order by id desc limit 10`,(error,results)=>{
    if(error){
      res.status(200).json(error)
    }
    else{
      res.status(200).json(results.rows)
    }
  })
  //res.send('listing all the notices of the college which are recent');
});

/* GET single notices data. */
router.get('/single/:id', function(req, res, next) {
  pool.query(`select * from notices where id='${req.params.id}'`,(error,results)=>{
    if(error){
      res.status(200).json(error)
    }
    else{
      res.status(200).json(results.rows)
    }
  })
  //res.send('Details of the single notices bearing ID::'+req.params.id);
});

/* POST Add new single notices data. */
router.post('/', function(req, res, next) {
  pool.query(`INSERT INTO notices (noticedata,link) values('${req.body.noticedata}','${req.body.link}')`,(error,results)=>{
      if(error){
        res.status(200).json(error)
      }
      else{
        res.status(200).json(results.rows)
      }
    })
  //res.send('Details of the single notices bearing ID::'+req.params.id+'were being inserted into DB.');
});

/* UPDATE single notices data. */
router.put('/', function(req, res, next) {
  res.send('Details of the single notices bearing ID::'+req.params.id+'were being updated in DB.');
});


/* DELETE single notices data. */
router.delete('/:id', function(req, res, next) {
  pool.query(`delete from notices where id=${req.params.id}`,(error,results)=>{
    if(error){
      res.status(200).json(error)
    }
    else{
      res.status(200).json(results.rows)
    }
  })
  //res.send('Details of the single notices bearing ID::'+req.params.id+'were being removevd from DB.');
});

module.exports = router;
