const express = require('express');
const router = express.Router();
const config = require('config');

// 주주총회 생성
router.post(
    '/',
    async (req, res) => {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { corp, contents, token, char, place, date } = req.body;

        console.log(req.body);

        try {
            meeting = new meeting({
                corp,
                contents,
                // : [
                //     // {cNum, content}
                // ],
                token,
                char,
                place,
                date
            });

            // 데이터 베이스에 저장한다.
            await meeting.save();
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;