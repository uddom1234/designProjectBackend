const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

module.exports = (connection) => {

    router.get('/allCompetition', async (req, res) => {        
        const query = `SELECT * FROM competition;`
        
        try {
            const [results] = await connection.query(query)
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e);
        }
    });

    router.post('/allCategory', async (req, res) => {
        const { categoryID } = req.body;
        const query = `
        SELECT category.categoryID, equipmentType.equipmentName, genderClassification.gender, ageClassification.age
        FROM category
        JOIN equipmentType ON category.equipmentTypeID = equipmentType.equipmentTypeID
        JOIN genderClassification ON category.genderClassificationID = genderClassification.genderClassificationID
        JOIN ageClassification ON category.ageClassificationID = ageClassification.ageClassificationID
        JOIN competition ON competition.categoryID = category.categoryID
        WHERE category.categoryID = ${categoryID}
        `;

        try {
            const [results] = await connection.query(query)
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e);
        }
    })


    router.post('/highscore', async (req, res) => {
        const {categoryID, competitionID } = req.body;

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
        competition.competitionID = ${competitionID}
        AND competition.categoryID = ${categoryID}
    GROUP BY
        archers.archerID,
        competition.categoryID
    ORDER BY
        TotalScore DESC;
    
        `

        try {
            const [results] = await connection.query(query)
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e);
        }
    })

    return router;
};
