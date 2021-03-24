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



/* initialise the faculty table */
router.get('/build', function (req, res, next) {
  pool.query('SELECT * FROM faculty', (error, results) => {
    if (error) {
      pool.query(`CREATE TABLE faculty (
        Name                varchar(80),
        ID                  int,
        Department          varchar(80),
        DateOfjoin          date,
        Working             boolean,
        Image               varchar(80),
        MediaId             varchar(80),
        WorkDescription     varchar(80)
    );`, (error, results) => {
        if (error) {
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


/* GET All Faculty listing. */
router.get('/all', function (req, res, next) {
  pool.query('SELECT * FROM faculty', (error, results) => {
    if (error) {
      res.status(200).json({ "error": "An error occured while retriving the data from the data base" })
    }
    else
      res.status(200).json(results.rows)
  })
  //res.send('listing all the faculty of the college.From all the departments.');
});

/* GET Department wise Faculty listing. */
router.get('/department/:department', function (req, res, next) {
  console.log(req.params.department);
  //if you want to use % as a param to the endpint then we have to use the %25 as % is encoded like that.
  //check more about url-encoding 
  pool.query(`SELECT * FROM faculty where department LIKE '${req.params.department}'`, (error, results) => {
    if (error) {
      res.status(200).json(error)
    }
    else {
      res.status(200).json(results.rows)
    }

  })
  //res.send('listing all the faculty of the college.From Department '+req.params.department);
});

/* GET single Faculty data. */
router.get('/one/:id', function (req, res, next) {
  pool.query(`SELECT * FROM faculty where id=${req.params.id}`, (error, results) => {
    if (error) {
      res.status(200).json(error)
    }
    else {
      res.status(200).json(results.rows)
    }
  })
  //res.send('Details of the single Faculty bearing ID::'+req.params.id);
});

/* POST Add new single Faculty data. */
//using the curl with the post request
//curl --header "Content-Type: application/json" \--data '{"helloo":"hey!!"}' http://localhost:3000/faculty -X POST
router.post('/', function (req, res, next) {


  pool.query(`INSERT INTO faculty (name,image,department,designation,workdescription,facebook,twitter,linkedin,email)
  values ('${req.body.name}','${req.body.image}','${req.body.department}','${req.body.designation}',
    '${req.body.workdescription}','${req.body.facebook}','${req.body.twitter}','${req.body.linkedin},'${req.body.email}''); `, (error, results) => {
    if (error) {
      res.status(200).json(error)
    }
    else
      return res.status(200).json(results.rows)
  })
  // res.send('Details of the single Faculty bearing ID::'+req.params.id+'were being inserted into DB.');
});




/* UPDATE single Faculty data. */
router.put('/', function (req, res, next) {
  res.send('Details of the single Faculty bearing ID::' + req.params.id + 'were being updated in DB.');
});


/* DELETE single Faculty data. */
router.delete('/:id', function (req, res, next) {
  pool.query(`DELETE FROM FACULTY WHERE  id=${req.params.id}`, (error, results) => {
    if (error) {
      res.status(200).json(error)
    } else {
      res.status(200).json(results)
    }
  })
  //res.send('Details of the single Faculty bearing ID::'+req.params.id+'were being removevd from DB.');
});

module.exports = router;
