const getDatabase = require('../database');
const db = getDatabase();
const express = require('express');
const router = express.Router();

 router.get('/', async (req, res) => {
     try {
        const hamstersRef = db.collection('hamsters');
        const snapshot = await hamstersRef.get();
            if(snapshot.empty){
                res.send([]);
                return;
            }
        let hamsters = [];
        snapshot.forEach(document => {
            const data = document.data();
            data.id = document.id;
            hamsters.push(data);
        });
        res.send(hamsters);
     } catch (error) {
         res.status(500).send(error.message);  
     }
})

router.get('/random', async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).send(error.message); 
    }
})

router.get('/:id', async (req, res) =>{
    try {
        const id = req.params.id;
        const docRef = await db.collection('hamsters').doc(id).get();
            if(!docRef.exists){
                res.sendStatus(404);
                return;
            } 
            const data = docRef.data();
            return res.status(200).send(data)
        
    } catch (error) {
        res.status(500).send(error.message);  
    }
})

router.post('/', async (req, res) =>{
    try {
        const object = req.body;

        if(!object){
            res.sendStatus(400);
            return;
        }
        const docRef = await db.collection('hamsters').add(object);
        hamsterId = {
                id: docRef.id
        }
        res.status(200).send(hamsterId);
    } catch (error) {
        res.status(500).send(error.message);  
    }
})

router.put('/:id', async (req, res) => {
    try {
        const object = req.body;
        const id = req.params.id;
        const docRef = await db.collection('hamsters').doc(id).get();
            if(!docRef.exists){
                res.sendStatus(404);
                return;
        } else if(!Object.keys(object).length){
                res.sendStatus(400);
                return;
        } else{
            const update = db.collection('hamsters').doc(id)
            await update.set(object, {merge: true})
            res.sendStatus(200);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.delete('/:id', async (req, res) =>{
    try {
        const id = req.params.id;
        const docRef = await db.collection('hamsters').doc(id).get();
        
        if(!docRef.exists){
            res.sendStatus(404);
            return;
        } else {
            await db.collection('hamsters').doc(id).delete();
            res.sendStatus(200);
        } 
    } catch (error) {
        res.status(500).send(error.message);
    }  
})

module.exports = router;