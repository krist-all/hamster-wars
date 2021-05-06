const getDatabase = require('../database');
const db = getDatabase();
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const winnersRef = db.collection('hamsters');
        const snapshot = await winnersRef.orderBy('wins', 'desc').limit(5).get();
            if(snapshot.empty){
            res.sendStatus(404);
            return;
            }
        winners = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            winners.push(data);
        });
        res.status(200).send(winners);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;