const getDatabase = require('../database');
const db = getDatabase();
const express = require('express');
const router = express.Router();


 router.get('/', async (req, res) => {
    const hamstersRef = db.collection('hamsters');
    const snapshot = await hamstersRef.get();
    if(snapshot.empty){
        res.send([]);
        return;
    }
    let hamsters = [];
    snapshot.forEach(document => {
        const data = document.data();
        data.id = document.id
        hamsters.push(data);
    });
    res.send(hamsters);
})

router.get('/random', async (req, res) => {
    const hamstersRef = db.collection('hamsters');
    const snapshot = await hamstersRef.get();
    if(snapshot.empty){
        res.send([]);
        return;
    } 
    let hamsters = [];
    snapshot.forEach(document => {
        const data = document.data();
        data.id = document.id
        hamsters.push(data);
    });
    let random = Math.floor(Math.random() * hamsters.length);
    res.send(hamsters[random]); 
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    const docRef = await db.collection('hamsters').doc(id).get();
    if(!docRef.exists){
        res.sendStatus(404);
        return;
    }
    const data = docRef.data();
    res.status(200).send(data);
})

router.post('/', async (req, res) =>{
    const object = req.body;

    if(isHamsterObject(object)){
        res.sendStatus(400);
        return;
    }
    const docRef = await db.collection('hamsters').add(object);
    res.send(docRef.id);
})

router.put('/:id', async (req, res) => {
    const object = req.body;
    const id = req.params.id;
    
    if(isHamsterObject(object)){
        res.sendStatus(400);
        return;
    } else if(!id){
        res.sendStatus(404);
        return;
    }
    const docRef = db.collection('hamsters').doc(id)
    await docRef.set(object, {merge: true})
    res.sendStatus(200);
})

router.delete('/:id', async (req, res) =>{
    const object = req.body;
    const id = req.params.id;

    if(!id){
        res.sendStatus(404);
        return;
    } else if(isHamsterObject(object)){
        res.sendStatus(400);
        return;
    }
    await db.collection('hamsters').doc(id).delete();
    res.sendStatus(200);
})

function isHamsterObject(hamster){
    if(!hamster){
        return false;
    }else if(!hamster.name || !hamster.age || !hamster.favFoods || !hamster.loves || !hamster.imgName || !hamster.wins || !hamster.defeats || !hamster.games){
        return false;
    }else {
        return true;
    }
}

module.exports = router;