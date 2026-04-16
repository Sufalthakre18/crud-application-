'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { getNotes, saveNotes } from "@/utils/localStorage";

export default function Notes() {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        setNotes(getNotes());
    }, []);

    const deleteNote = (id) => {
        const updated = notes.filter(note => note._id !== id);
        saveNotes(updated);
        setNotes(updated);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">📝 My Notes</h1>

                    <Link
                        href="/create"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        + Create Note
                    </Link>
                </div>

                {/* Empty State */}
                {notes.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No notes yet 😔</p>
                        <p>Create your first note!</p>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {notes.map(note => (
                            <div
                                key={note._id}
                                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                        {note.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {note.content}
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <Link
                                        href={`/view/${note._id}`}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        View
                                    </Link>

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/edit/${note._id}`}
                                            className="text-yellow-600 hover:bg-yellow-100 px-2 py-1 rounded"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => deleteNote(note._id)}
                                            className="text-red-600 hover:bg-red-100 px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
