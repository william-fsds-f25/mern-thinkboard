/* 

    Way #1

    export async function getAllNotes(req,res) {

        res.status(200).send("You just fetched the notes");

    };


    Way #2

    const getAllnotes = (req,res) => {
        res.status(200).send("You just fetched the notes");
    };

    Way #3

    export function getAllNotes(req,res) {

        res.status(200).send("You just fetched the notes");

    };

} */

const Note = require("../models/Note.js");


async function getAllNotes(req,res) // or you can put an underscore (_) if there is any variables that is not going to be used
{
    try {

        const notes = await Note.find().sort({createdAt: -1}); // -1 will sort in desc, order (newest first), 1 will 
        res.status(200).json(notes)
    
    } catch (error) {

        console.error("Error in getAllNotes controller", error);


        res.status(500).json({ message: "Interal server error"} );

    }

}


async function getNodeById(req,res)
{
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({message: "Note not found"});
        res.json(note);
        
    } catch (error) {

        console.error("Error in getAllNotes controller",error);
        res.status(500).json({message:"internal server error"});
        
    }
    

}

async function createNote(req,res) {

    try {

        const { title,content } = req.body
        const note = new Note({title,content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);


    } catch (error) {
        console.error("Error in createNote controller",error);
        res.status(500).json({ message: "Internal server error" });

    }

}

async function updateNote (req,res) {

    try {

        const {title, content} = req.body;
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title,content },
            {
                new: true, /*Give the new notes with the updated field*/
            }
        );

        if (!updateNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json({message: "Note updated successfully"});
    }
    catch(error){
        console.error("Error in updateNote controller",error);
        res.status(500).json({message: "Internal server error"});

    }
}

async function deleteNote (req,res) {

    try {

        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if (!deleteNote) return res.status(404).json({ message: "Note not found"});
        res.json({message:"Note deleted successfully"});

    }
    catch(error){
        console.error("Error in deleteNote controller",error);
        res.status(500).json({message: "Internal server error"});

    }


}

module.exports = {getAllNotes, createNote, updateNote, deleteNote, getNodeById};
 