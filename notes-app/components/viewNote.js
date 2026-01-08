'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ViewNote() {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNote = async () => {
    try {
      const res = await fetch(`/api/notes/${id}`);
      if (!res.ok) throw new Error("Failed to fetch note");
      const data = await res.json();
      setNote(data);
    } catch (err) {
      setError("Failed to load note.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        loading note...
      </div>
    );
  }

  return (
    <div className="min-h-screen  from-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6 border-b pb-4">
            {error && <p className="text-red-500 mb-4">{error}</p>}
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            {note.title}
          </h1>
          <p className="text-sm text-gray-500">
            Created on {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {note.content}
        </div>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            Home
          </Link>
          <Link href={`/edit/${note._id}`} className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition">
            Edit 
          </Link>
        </div>

      </div>
    </div>
  );
}
