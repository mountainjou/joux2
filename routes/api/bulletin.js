var express = require('express');
var router = express.Router();
var Bulletin = require('../../models/Bulletin');

router.post('/', function (req, res) {
  console.log(req.body)
    var bulletin = new Bulletin();
    bulletin.rname = req.body.values.rname;
    bulletin.uname = req.body.values.uname;
    bulletin.report = req.body.values.report;

    console.log(bulletin);

    bulletin.save(function (err) {
      if(err){
        console.log(err);
      }
      res.json({msg:"성공"})
    });
  });

router.get("/", async (req, res) => {
  try {
    const gongsi = await Bulletin.find().sort({ date: -1 });
    res.json(gongsi);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id)
  try {
  const gongsiDetail = await Bulletin.findById({_id});
    res.json(gongsiDetail);
    console.log(gongsiDetail);

    // const gongsi = await Bulletin.find().sort({ date: -1 });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;