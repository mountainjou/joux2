const express = require('express');
const router = express.Router();
const config = require('config');

let Vote = require('../../models/Vote');

// 주주총회 생성
router.post(
    '/makevote',
    async (req, res) => {
        
        let { corp, contents, token, char, place, date } = req.body;

        // console.log(req.body);

        try {
            let vote = new Vote({
                contents,
                corp,
                // : [
                //     // {cNum, content}
                // ],
                token,
                char,
                place,
                date
            });
            console.log(vote);
            // 데이터 베이스에 저장한다.
            await vote.save(function (err) {
                if(err){
                  console.log(err);
                }
                res.json({msg:"성공"})
              });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.get("/getvote", async (req, res) => {
    try {
      const voteDetail = await vote.find();
      res.json(voteDetail);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;