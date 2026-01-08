'use client'

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Error from "next/error"

export default function EditNote() {

    const params = useParams()
    const id = params.id
    const router = useRouter()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);


    const fetchNote = async () => {
        try {
            const res = await fetch(`/api/notes/${id}`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setTitle(data.title);
            setContent(data.content);
        } catch (err) {
            setError('Failed to load note.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch(`/api/notes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });
            if (!res.ok) throw new Error('Fail to update');
            router.push('/');
        } catch (err) {
            setError('Failed to update note');
        }
    };

    useEffect(() => {
        fetchNote();
    }, [id])

    if (loading) return <p className="text-center py-8">Loading....</p>;
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border rounded h-32"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}