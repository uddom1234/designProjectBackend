const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = (connection) => {

    router.post('/insertRound', async (req, res) => {
        const { roundTypeID, competitionID, startTime } = req.body;
        //querying all archer from archer table
        const query = `INSERT INTO round (roundtypeID, competitionID, startTime) 
        VALUES (
            ${roundTypeID},
            ${competitionID},
            "${startTime}"
        );`

        try {
            await connection.query(query)
            res.status(200).send('Round added');
        } catch (e) {
            res.status(500).send(e);
        }
    
    })

    router.get('/allRound', async (req, res) => {
        query = `SELECT * FROM roundtype JOIN round ON roundtype.roundtypeID = round.roundtypeID;`

        try {
            const [result] = await connection.query(query)
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send(e);
        }
    })

    router.put('updateStartTime', async (req, res) => {
        const {roundID, startTime} = req.body;

        const query = `UPDATE round SET startTime = "${startTime}" WHERE roundID = ${roundID};`

        try {
            await connection.query(query)
            res.status(200).send('Round updated');
        } catch (e) {
            res.status(500).send(e);
        }
    })

    router.delete('/deleteRound', async (req, res) => {
        const {roundID} = req.body;

        const query = `DELETE FROM round WHERE roundID = ${roundID};`

        try {
            await connection.query(query)
            res.status(200).send('Round deleted');
        } catch (e) {
            res.status(500).send(e);
        }
    })


    return router;
};
