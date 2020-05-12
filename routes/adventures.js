const router = require('express').Router();

const Adventure = require('../models/adventure')

router.get('/', async (req, res) => {
    try {
        const adventures = await Adventure.find();
        res.json(adventures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const adventure = new Adventure({
        title: req.body.title,
        startLevel: req.body.startLevel,
        endLevel: req.body.endLevel,
        description: req.body.description,
        link: req.body.link,
        price: req.body.price
    });
    try {
        const newAdventure = await adventure.save();
        res.status(201).json(newAdventure);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

async function getAdventure(req, res, next){
    try{
        adventure = await Adventure.findById(req.params.id);
        if(adventure == null){
            return res.status(404).json({ message: "Can't find adventure" });
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
    res.adventure = adventure;
    next();
}

router.get('/:id', getAdventure, (req,res) => {
    res.json(res.adventure);
});

router.delete('/:id', getAdventure, async (req,res) => {
    try{
        await res.adventure.remove();
        res.status(204).json({ message: 'Deleted This Adventure' });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', getAdventure, async (req,res) => {
    if(req.body.title != null){
        res.adventure.title = req.body.title;
    }
    if(req.body.startLevel != null){
        res.adventure.startLevel = req.body.startLevel;
    }
    if(req.body.endLevel != null){
        res.adventure.endLevel = req.body.endLevel;
    }
    if(req.body.description != null){
        res.adventure.description = req.body.description;
    }
    if(req.body.link != null){
        res.adventure.link = req.body.link;
    }
    if(req.body.price != null){
        res.adventure.price = req.body.price;
    }

    try{
        const updatedAdventure = await res.adventure.save();
        res.status(200).json(updatedAdventure);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;