const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = (connection) => {

    router.post('/insertCompetition', async (req, res) => {
        const { competitionName, date, competitionType, categoryID } = req.body;
        //querying all archer from archer table
        const query = `INSERT INTO competition (competitionName, date, competitionType, categoryID) 
        VALUES (${competitionName}, '${date}', ${competitionType}, ${categoryID});`

        try {
            await connection.query(query)
            res.status(200).send('Insert competition success');
        } catch (e) {
            res.status(500).send(e);
        }
    })

    router.get('/allCompetition', async (req, res) => {
        //querying all archer from archer table
        const query = `SELECT * FROM competition;`

        try {
            const [result] = await connection.query(query)
            res.status(200).send(result);
        } catch (e) {
            res.status(500).send(e);
        }
    })

    router.delete('/deleteCompetition', async (req, res) => {
        const { competitionID } = req.body;
        const query = `DELETE FROM competition WHERE competitionID = ${competitionID};`

        try {
            await connection.query(query)
            res.status(200).send('Competition Deleted!');
        } catch (e) {
            res.status(500).send(e);
        }
    })

    return router;
};
