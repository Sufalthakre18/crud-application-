'use client'

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditNote() {
    const router = useRouter();
    const params = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const id = params?.id;

    useEffect(() => {
        if (!id) return;

        try {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];

            // ✅ FIX: use _id instead of id
            const note = notes.find(n => String(n._id) === String(id));

            if (note) {
                setTitle(note.title);
                setContent(note.content);
            } else {
                setError("Note not found");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];

            // ✅ FIX: update using _id
            const updatedNotes = notes.map(note =>
                String(note._id) === String(id)
                    ? { ...note, title, content }
                    : note
            );

            localStorage.setItem('notes', JSON.stringify(updatedNotes));

            router.push('/');
        } catch (err) {
            setError("Failed to update note");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                
                <h1 className="text-2xl font-bold mb-2">✏️ Edit Note</h1>
                <p className="text-gray-500 text-sm mb-4">
                    Update your note details below
                </p>

                {error && (
                    <p className="text-red-500 mb-3">{error}</p>
                )}

                {!error && (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded mb-3"
                            placeholder="Title"
                            required
                        />

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border rounded mb-3 h-28"
                            placeholder="Content"
                            required
                        />

                        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                            Update Note
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
