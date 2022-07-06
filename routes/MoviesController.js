const express = require('express');
const router = express.Router();
const db = require('../db/mongodb');



let collectionName = 'movies';

router.get('/moviesByGenre', async (req, res) => {
    let header = req.headers['authorization'];
    if (header != "Bearer FSMovies2021") {
        return res.status(401).send({ code: 401, message: 'Not Authenticated' })
    }
    const moviesResult = await db.getDb().collection(collectionName).aggregate([{
        $unwind: { path: "$genres" }
    }, {
        $group: {
            _id: { genres: "$genres" },
            movies: { $push: "$$ROOT" }
        }
    },]).toArray();

    console.log("moviesResult===>", moviesResult)

    const data = moviesResult.length > 0 ? moviesResult : [];
    res.status(200).send({
        code: 200,
        message: 'Success',
        data
    })
})

module.exports = router;