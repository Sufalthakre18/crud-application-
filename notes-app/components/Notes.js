'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import Error from "next/error";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotes = async () => {
        try {
            const res = await fetch('/api/notes');
            if (!res.ok) throw new Error('eailed to fetch');
            const data = await res.json();
            setNotes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const deleteNote = async (id) => {
        try {
            const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">My Notes</h1>
                <Link href="/create" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create New Note
                </Link>
                {loading ? (
                    <p className="text-center">loading....</p>
                ) : notes.length === 0 ? (<p>No notes yet</p>) :
                    (
                        <ul className="space-y-3">
                            {notes.map((note) => (
                                <li key={note.id} className="p-4 border rounded-lg bg-gray-50">
                                    <h2 className="text-xl font-semibold">{note.title}</h2>
                                    <p className="text-gray-600">{note.content.substring(0, 100)}.....</p>
                                    <p className="text-sm text-gray-500">Created: {new Date(note.createdAt).toLocaleString()}</p>
                                    <div className="mt-2">
                                        <Link href={`/edit/${note._id}`} className="text-blue-500 hover:underline mr-4">
                                            Edit
                                        </Link>
                                        <button onClick={() => deleteNote(note._id)} className="text-red-500 hover:underline">
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </div>
    );
}