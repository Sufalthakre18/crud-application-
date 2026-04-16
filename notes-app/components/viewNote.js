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

    if (!note) return <p>Note not found</p>;

    return (
        <div className="p-6">
            <h1>{note.title}</h1>
            <p>{note.content}</p>
        </div>
    );
}
