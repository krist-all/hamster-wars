const getDatabase = require('../database');
const db = getDatabase();
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const matchesRef = db.collection('matches');
    const snapshot = await matchesRef.get();
    if(snapshot.empty){
        res.send([]);
        return;
    }
    let matches = [];
    snapshot.forEach(document => {
        const data = document.data();
        data.id = document.id
        matches.push(data);
    });
    res.send(matches); 
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const docRef = await db.collection('matches').doc(id).get();
    if(!docRef.exists){
        res.sendStatus(404);
        return;
    }
    const data = docRef.data();
    res.send(data);
})

router.post('/', async (req, res) =>{
    const object = req.body;

    if(!isMatchesObject(object)){
        res.sendStatus(400);
        return;
    }
    const docRef = await db.collection('matches').add(object);
    res.send(docRef.id);
})

router.put('/:id', async (req, res) => {
    const object = req.body;
    const id = req.params.id;

    if(!isMatchesObject(object)){
        res.sendStatus(400);
        return;
    } else if(!id){
        res.sendStatus(404);
        return;
    }
    const docRef = db.collection('matches').doc(id)
    await docRef.set(object, {merge: true})
    res.sendStatus(200);
})

router.delete('/:id', async (req, res) =>{
    const object = req.body;
    const id = req.params.id;

    if(!id){
        res.sendStatus(404);
        return;
    } else if(isMatchesObject(object)){
        res.sendStatus(400);
        return;
    }
    await db.collection('matches').doc(id).delete();
    res.sendStatus(200);
})


function isMatchesObject(match){
    if(!match){
        return false;
    }else if(!match.winnerId || !match.loserId){
        return false;
    }else {
        return true;
    }
}


module.exports = router;