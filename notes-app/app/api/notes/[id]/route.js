import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET(request, { params }) {
    try {
        await dbConnect()
        const note = await Note.findById(params.id)
        if (!note) {
            return new Response(JSON.stringify({ error: 'Note not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(note), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'fail to fetch note' }), { status: 500 });
    }
}
export async function PUT(request, { params }) {
    try {
        await dbConnect()
        const { title, content } = await request.json();
        if (!title || !content) {
            return new Response(JSON.stringify({ error: 'title and content are required' }), { status: 400 });
        }
        const note =await Note.findByIdAndUpdate(params.id,{title,content},{new:true})
        if(!note){
            return new Response(JSON.stringify({ error: 'Note not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(note),{status:200});
    } catch (error) {
        return new Response(JSON.stringify({ error: 'fail to update note' }), { status: 500 });
    }
}
export async function DELETE(request, { params }) {
    try {
        await dbConnect()
        const note =await Note.findByIdAndDelete(params.id)
        if(!note) return new Response(JSON.stringify({ error: 'Note not found' }), { status: 404 });
        return new Response(JSON.stringify({ message: 'Note deleted' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'fail to delete note' }), { status: 500 });
    }
}