'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getNotes } from "@/utils/localStorage";

export default function ViewNote() {

    const { id } = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {
        const notes = getNotes();
        const found = notes.find(n => n._id === id);
        setNote(found);
    }, [id]);

    if (!note) return <p className="text-center mt-10">Note not found</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="bg-white max-w-2xl w-full p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-3">{note.title}</h1>
                <p className="text-gray-600 whitespace-pre-line">{note.content}</p>
            </div>
        </div>
    );
}
