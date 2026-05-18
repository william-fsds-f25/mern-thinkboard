import React, { useState, useEffect } from 'react'
import Navbar from '../src/components/Navbar'
import RateLimitedUI from '../src/components/RateLimitedUI';
import api from '../src/lib/axios';
import toast from "react-hot-toast";
import NoteCard from "../src/components/NoteCard";
import NotesNotFound from "../src/components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, SetIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchNotes = async () => {

      try {

        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data)
        SetIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error);
        if (error.response?.status === 429) {
          SetIsRateLimited(true)
          
        } else {
          toast.error("Failed to load notes");

        }
      } finally {
        setLoading(false)
      }
    };

    fetchNotes();
  }, []);



  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited &&  <NotesNotFound />}

        {notes.length === 0 && !isRateLimited && (
          <div className="text-center text-base-content/60 py-10">
            <p className="text-lg">No notes found. Create your first note!</p>
          </div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
    
  );
}

export default HomePage;
