'use client'
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getNotes, saveNotes } from "@/utils/localStorage";

export default function EditNote() {

    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const notes = getNotes();
        const note = notes.find(n => n._id === id);

        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const notes = getNotes();

        const updated = notes.map(n =>
            n._id === id ? { ...n, title, content } : n
        );

        saveNotes(updated);
        router.push('/');
    };

    return (
        <div className="p-6">
            <h1>Edit Note</h1>

            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                <button>Update</button>
            </form>
        </div>
    );
}
