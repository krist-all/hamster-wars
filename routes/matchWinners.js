const getDatabase = require('../database');
const db = getDatabase();
const express = require('express');
const router = express.Router();



router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const winnerRef = db.collection('matches');
    const snapshot = await winnerRef.where('winnerId', '==', `${id}`).get();
    if(snapshot.empty){
        res.sendStatus(404);
        return;
    }
    matchWinners = [];
    snapshot.forEach(doc =>{
        const data = doc.data();
        matchWinners.push(data);
    })
    res.send(matchWinners);

})

module.exports = router;