import Chat from "@/lib/Chat-model";
import dbConnect from "@/lib/db-connect";

export const POST = async (req:any, { params }:any) => {
  try {
    await dbConnect();

    const body = await req.json()

    const { chatId } = params

    const { name, groupPhoto } = body

    const updatedGroupChat = await Chat.findByIdAndUpdate(
      chatId,
      { name, groupPhoto },
      { new: true }
    )

    return new Response(JSON.stringify(updatedGroupChat), { status: 200 })
  } catch (err) {
    return new Response("Failed to update group chat info", { status: 500 })
  }
}