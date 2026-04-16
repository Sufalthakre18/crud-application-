'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getNotes, saveNotes } from "@/utils/localStorage";

export default function CreateNote() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        try {
            const notes = getNotes();

            const newNote = {
                _id: Date.now().toString(),
                title,
                content,
                createdAt: new Date().toISOString()
            };

            const updatedNotes = [newNote, ...notes];
            saveNotes(updatedNotes);

            router.push('/');
        } catch (err) {
            setError('Failed to create note');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Create New Note</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full mb-3 p-2 border"
                        required
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        className="w-full mb-3 p-2 border"
                        required
                    />
                    <button className="w-full bg-green-500 text-white p-2 rounded">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}
