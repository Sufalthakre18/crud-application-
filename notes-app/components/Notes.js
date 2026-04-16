'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { getNotes, saveNotes } from "@/utils/localStorage";

export default function Notes() {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        setNotes(getNotes());
    }, []);

    const deleteNote = (id) => {
        const updated = notes.filter(note => note._id !== id);
        saveNotes(updated);
        setNotes(updated);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">My Notes</h1>

                <Link href="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create Note
                </Link>

                {notes.length === 0 ? (
                    <p>No notes</p>
                ) : (
                    <ul className="mt-4 space-y-3">
                        {notes.map(note => (
                            <li key={note._id} className="p-4 border rounded">
                                <h2>{note.title}</h2>
                                <p>{note.content}</p>

                                <div className="mt-2 flex gap-2">
                                    <Link href={`/view/${note._id}`}>View</Link>
                                    <Link href={`/edit/${note._id}`}>Edit</Link>
                                    <button onClick={() => deleteNote(note._id)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
