'use client'
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditNote() {
    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const note = notes.find(n => String(n.id) === String(id));
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        const updated = notes.map(note =>
            String(note.id) === String(id)
                ? { ...note, title, content }
                : note
        );

        localStorage.setItem('notes', JSON.stringify(updated));
        router.push('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
                <h1 className="text-xl font-bold mb-4">Edit Note</h1>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full mb-3 p-2 border rounded"/>
                <textarea value={content} onChange={(e)=>setContent(e.target.value)} className="w-full mb-3 p-2 border rounded h-28"/>
                <button className="w-full bg-blue-500 text-white py-2 rounded">Update</button>
            </form>
        </div>
    );
}
