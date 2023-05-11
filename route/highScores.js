const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = (connection) => {

    router.post('/allCompetition', async (req, res) => {
        const { competitionType } = req.body;
        
        const query = `SELECT * FROM competition WHERE competitionType = '${competitionType}';`
        try {
            const [results] = await connection.query(query)
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    router.get('/allCategory', async (req, res) => {
        query = `SELECT * FROM category;`
        try {
            const [results] = await connection.query(query)
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e);
        }
    })


    router.post('/highscore', async (req, res) => {
        const {competitionType, categoryID} = req.body;

        const query = 
        `SELECT
            archers.archerID,
            archers.firstName,
            archers.lastName,
            competition.categoryID,
            SUM(score.arrowOne + score.arrowTwo + score.arrowThree + score.arrowFour + score.arrowFive + score.arrowSix) AS TotalScore
 
        FROM
            archers
        JOIN
            end ON archers.archerID = end.archerID
        JOIN
            round ON end.roundID = round.roundID
        JOIN
            score ON end.scoreID = score.scoreID
        JOIN
            competition ON round.competitionID = competition.competitionID
        WHERE
            competition.competitionType = ${competitionType}
            AND competition.categoryID = ${categoryID}
        GROUP BY
            archers.archerID,
            competition.categoryID`

        try {
            const [results] = await connection.query(query)
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e);
        }
    })

    return router;
};
