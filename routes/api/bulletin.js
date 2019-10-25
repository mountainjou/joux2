var express = require('express');
var router = express.Router();

var Bulletin = require('../../models/Bulletin');

router.post('/', function (req, res) {
  console.log(req.body)
    var bulletin = new Bulletin();
    bulletin.rname = req.body.values.rname;
    bulletin.uname = req.body.values.uname;
    bulletin.report = req.body.values.report;
    // bulletin.date = 

    console.log(bulletin);

    bulletin.save(function (err) {
      if(err){
        console.log(err);
      }
      res.json({msg:"성공"})
    });
  });

module.exports = router;