import User from "@/lib/user-model";
import dbConnect from "@/lib/db-connect";

export const GET = async (req, res) => {
  try {
    await dbConnect()

    const allUsers = await User.find()

    return new Response(JSON.stringify(allUsers), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to get all users", { status: 500 })
  }
}