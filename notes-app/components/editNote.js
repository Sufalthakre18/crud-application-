'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditNote() {
    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch note from localStorage
    useEffect(() => {
        try {
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            const note = notes.find(n => n.id === id);

            if (!note) {
                setError("Note not found");
            } else {
                setTitle(note.title);
                setContent(note.content);
            }
        } catch (err) {
            setError("Failed to load note");
        } finally {
            setLoading(false);
        }
    }, [id]);

    // Update note
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        try {
            const notes = JSON.parse(localStorage.getItem("notes")) || [];

            const updatedNotes = notes.map(note =>
                note.id === id
                    ? { ...note, title, content }
                    : note
            );

            localStorage.setItem("notes", JSON.stringify(updatedNotes));
            router.push('/');
        } catch (err) {
            setError("Failed to update note");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <p className="text-gray-600 text-lg animate-pulse">Loading note...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-10 px-4">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">✏️ Edit Note</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Update your note details below
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter note title..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note here..."
                            className="w-full p-3 border border-gray-300 rounded-lg h-36 resize-none focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="submit"
                            className="flex-1 bg-indigo-500 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition shadow-md"
                        >
                            Update Note
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="flex-1 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
