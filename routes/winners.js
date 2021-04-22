const getDatabase = require('../database');
const db = getDatabase();
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
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
    res.send(winners);
})

module.exports = router;