
import User from "@/lib/user-model";
import dbConnect from "@/lib/db-connect";

export const GET = async (req:any, { params }:any) => {
  try {
    await dbConnect()

    const { query } = params

    const searchedContacts = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    })

    return new Response(JSON.stringify(searchedContacts), { status: 200 })
  } catch (err) {
    return new Response("Failed to search contact", { status: 500 })
  }
}