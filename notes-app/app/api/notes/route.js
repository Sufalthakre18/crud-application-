import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";
import mongoose from "mongoose";

export async function GET() {
    try {
        await dbConnect();
        const notes = await Note.find({}).sort({ createdAt: -1 })
        return new Response(JSON.stringify(notes), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'failed to fetch notes' }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect()
        const { title, content } = await request.json()
        if (!title || !content) {
            return new Response(JSON.stringify({ error: 'title and content are required' }), { status: 400 });
        }
        const note= await Note.create({title,content})
        return new Response(JSON.stringify(note), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'fail to create note' }), { status: 500 });
    }

}

