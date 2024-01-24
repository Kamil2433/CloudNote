const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");

router.get("/getnotes", fetchuser, async (req, res) => {
  try {
    let allnote = await Notes.find({ User: req.user.id });

    res.json(allnote);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addnote", fetchuser, async (req, res) => {
  console.log(req.user.id);
  try {
    const { title, description, image,date } = req.body;

    const note = new Notes({
      title,
      description,
      image,
      date,
      User: req.user.id,
    });

    const saved = await note.save();

    res.json(saved);
  } catch (error) {
    console.log(error);
  }
});

router.put("/update/:id", fetchuser, async (req, res) => {
  try {
    // const //{reqtitle,reqdescription,reqwimage}=req.body;

    //   const newnote=new Notes({
    // title,description,image,user:req.user.id
    //   })

    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    console.log(note.User.toString());

    console.log(req.user.id.toString());

    if (note.User.toString() !== req.user.id) {
      return res.status(401).send("Cannot update this note");
    }

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
      },
    };

    const up = await Notes.findByIdAndUpdate(req.params.id, updateDoc, options);

    res.json(up);
  } catch (error) {
    console.log(error);
  }
});


//delete
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    // const //{reqtitle,reqdescription,reqwimage}=req.body;

    //   const newnote=new Notes({
    // title,description,image,user:req.user.id
    //   })

    const note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    // console.log(note.User.toString());

    // console.log(req.user.id.toString());

    if (note.User.toString() !== req.user.id) {
      return res.status(401).send("Cannot update this note");
    }

    // const options = { upsert: true };

    // const updateDoc = {
    //   $set: {
    //     title: req.body.title,
    //     description: req.body.description,
    //     image: req.body.image,
    //   },
    // };

    const up = await Notes.findByIdAndDelete(req.params.id);

    res.json(up);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
