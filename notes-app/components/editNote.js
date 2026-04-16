'use client'

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditNote() {
    const router = useRouter();
    const params = useParams();

    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // ✅ Fix: wait for params to be available
    useEffect(() => {
        if (params?.id) {
            setId(params.id);
        }
    }, [params]);

    // ✅ Fetch note safely
    useEffect(() => {
        if (!id) return;

        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        const note = notes.find(n => String(n.id) === String(id));

        if (note) {
            setTitle(note.title);
            setContent(note.content);
        } else {
            setError("Note not found");
        }

        setLoading(false);
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        const updatedNotes = notes.map(note =>
            String(note.id) === String(id)
                ? { ...note, title, content }
                : note
        );

        localStorage.setItem('notes', JSON.stringify(updatedNotes));

        router.push('/');
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">✏️ Edit Note</h1>

                {error && <p className="text-red-500 mb-3">{error}</p>}

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

                    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Update Note
                    </button>
                </form>
            </div>
        </div>
    );
}
