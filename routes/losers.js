const getDatabase = require('../database');
const db = getDatabase();
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const losersRef = db.collection('hamsters');
        const snapshot = await losersRef.orderBy('defeats', 'desc').limit(5).get();
            if(snapshot.empty){
                res.sendStatus(404);
                return;
            }
        losers = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            losers.push(data);
        });
        res.send(losers);  
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;