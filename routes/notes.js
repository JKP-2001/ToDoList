
const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE1: Fetching All Notes using endpoint "/api/notes/fetchAllNotes"
router.get("/fetchAllNotes", fetchuser, async (req, res) => {
    try {
        const id = req.user.id;
        const notes = await Notes.find({ user: id });
        res.json(notes);
    } catch (err) {
        res.json(err.message)
    }
})


//ROUTE2: Add new note using endpoint "/api/notes/"createnote
router.post("/createnote", [
    body("title", "title is required").exists(),
    body('description', "Description must required").exists(),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 })
], fetchuser, async (req, res) => {
    const errors = validationResult(req);  //Return Array is any of the validation failed

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
        });
        const notes = await Notes.find({ user: req.user.id });
        res.status(200).json(notes);
    } catch (err) {
        res.status(400).send(err.message);
    }
})


//ROUTE3: Add new note using endpoint "/api/notes/updatenote/:id"

router.patch("/updatenote/:id", [
    body("title", "title is required").exists(),
    body('description', "Description must required").exists(),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 })
], fetchuser, async (req, res) => {
    const errors = validationResult(req);  //Return Array is any of the validation failed
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;
        console.log(id);
        const userid = req.user.id;
        const note = await Notes.findById({ _id: id });
        const newnote = {
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        }
        if (!note) {
            res.status(404).json("Notes Not exist");
        }
        else {
            if (note.user.toString() !== userid) {
                res.status(401).json("This Note Doesn't Belongs To The Logged In User");
            }
            else {
                const updatednote = await Notes.findByIdAndUpdate((req.params.id), { $set: newnote }, { new: true });
                const notes = await Notes.find({ user: userid });
                res.status(200).json(notes);
            }
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
})


//ROUTE4 Add new note using endpoint "/api/notes/updatenote/:id"

router.delete("/delete/:id", fetchuser, async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const userid = req.user.id;
        const note = await Notes.findById({ _id: id });

        if (!note) {
            res.status(404).json("Notes Not exist");
        }
        else {
            if (note.user.toString() !== userid) {
                res.status(401).json("This Note Doesn't Belongs To The Logged In User");
            }
            else {
                const updatednote = await Notes.findByIdAndDelete((req.params.id));
                const notes = await Notes.find({ user: userid });
                res.status(200).json(notes);
            }
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
})


//ROUTE5 Fetch note using endpoint "/api/notes/fetchnote/:id"
router.get("/fetchnote/:id", fetchuser, async (req, res) => {
    const id = req.params.id;
    const userid = req.user.id;
    try {
        const note = await Notes.findById(id);
        if (!note) {
            res.status(400).json("Note Not Exist");
        }
        else{
            if (note.user.toString() !== userid) {
                res.status(401).json("This Note Doesn't Belongs To The Logged In User");
            }
            else {
                res.status(200).json(note);
            }
        }
    }catch(err){
        res.status(400).json(err.message);
    }
})


module.exports = router;