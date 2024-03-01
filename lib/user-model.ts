import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    image: {type: String, required: false, default:"https://res.cloudinary.com/dps8xubee/image/upload/v1684105438/avatar/pmbgserj2nobgqn2auwr.png"},
    token:{ type: String, required: true,default:'AAAEEE9' },
    tokenExpiration:{type:Date,required:false},
    address: { type: String, required: true ,default:""},
    city: { type: String, required: true,default:"" },
    postal:{type: String, required: true,default:""},
    country:{ type: String, required: true,default:"" },
    chats: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
      default: [],
    }
},
  {
    timestamps: true,
  }
  
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;