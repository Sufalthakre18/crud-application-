'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getNotes, saveNotes } from "@/utils/localStorage";

export default function CreateNote() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        const notes = getNotes();

        const newNote = {
            _id: Date.now().toString(),
            title,
            content,
            createdAt: new Date().toISOString()
        };

        saveNotes([newNote, ...notes]);
        router.push('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md p-6 rounded-xl shadow-md"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Create Note</h1>

                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full mb-4 p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                    Create
                </button>
            </form>
        </div>
    );
}
