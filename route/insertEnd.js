const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = (connection) => {


    //get all rounds
    router.get('/selectRound', async (req, res) => {
        //querying all round type from roundtype table
        
        const query = `SELECT *, roundTypeID FROM roundtype;`
        try {
            const [results] = await connection.query(query)
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    router.post('/chooseArcher', async (req, res) => {
        const { archerID } = req.body;
        //querying all archer from archer table
        const query = `SELECT * FROM archers WHERE archerID = ${archerID};`

        try {
            const [results] = await connection.query(query)
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e);
        }
    
    })

    router.post('/equipment', async (req, res) => {
        const { archerID } = req.body;

        try {
            let query = `SELECT * FROM archerEquipment WHERE archerID = ${archerID};`

            const [fetchArcherEquipment] = await connection.query(query)
            equipmentNameQuery = `SELECT * FROM equipmentType WHERE equipmentTypeID = ${fetchArcherEquipment[0].equipmentID};`

            const [results] = await connection.query(equipmentNameQuery)

            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e);
        }
    
    })

    router.post('/insertEnd', async (req, res) => {
        const { archerID, roundID, score, date, time } = req.body;
        console.log(score)
        try{
            let scoreQuery = `INSERT INTO score (arrowOne, arrowTwo, arrowThree, arrowFour, arrowFive, arrowSix) 
            VALUES (${score[0]}, ${score[1]}, ${score[2]}, ${score[3]}, ${score[4]}, ${score[5]});`;
            
            const [results] = await connection.query(scoreQuery);
            // scoreID = results[0].insertId;
            scoreID = results.insertId

            query = `
            INSERT INTO end (
                archerID, 
                roundID,
                date, 
                time,
                scoreID 
                )
            VALUES (
                ${archerID},
                ${roundID},
                "${date}", 
                "${time}",
                ${scoreID})`

            await connection.query(query);
            res.status(200).send('Sucess');
        } catch (e) {
            res.status(500).send(e);
        }
})

    return router;
};
