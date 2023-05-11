const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = (connection) => {

    router.post('/insertArcher', async (req, res) => {
        const { clubID, firstName, lastName, gender, dateOfBirth } = req.body;
        //querying all archer from archer table
        const query = `INSERT INTO archers (clubID, firstName, lastName, gender, dateOfBirth) 
        VALUES (${clubID}, ${firstName}, ${lastName}, ${gender}, ${dateOfBirth});`

        try {
            await connection.query(query)
            res.status(200).send('Archer added');
        } catch (e) {
            res.status(500).send(e);
        }
    })

    router.post('/getScore', async (req, res) => {
        const { archerID } = req.body;

        query = `
        SELECT  
            score.arrowOne,
            score.arrowTwo,
            score.arrowThree,
            score.arrowFour,
            score.arrowFive,
            score.arrowSix

        FROM score
        JOIN end ON score.scoreID = end.scoreID
        JOIN archers ON end.archerID = archers.archerID  
        WHERE archers.archerID = ${archerID};`

        try {
            const [result] = await connection.query(query)
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send(e);
        }
    })


    router.delete('/deleteArcher', async (req, res) => {
        const { archerID } = req.body;

        const query = `DELETE FROM archers WHERE archerID = ${archerID};`

        try {
            await connection.query(query)
            res.status(200).send('Archer deleted');
        } catch (e) {
            res.status(500).send(e);
        }
    })


    return router;
};
