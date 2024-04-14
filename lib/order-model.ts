import mongoose, { Document, Schema } from "mongoose";


interface OrderDocument extends Document {
  quantity: string[],
  product: string[],
  image: string[],
  name: string[],
  totalAmount: string,
  email: string,
  userId: string
  orderStatus: string,
  createdAt: Date
  shipping:string
}

const orderSchema = new Schema<OrderDocument>({

  product: { type: [String], required: true },
  image: { type: [String], required: true },
  name: { type: [String], required: true },
  userId: { type: String, required: true },
  totalAmount: { type: String, required: true },
  quantity: { type: [String], required: true },
  orderStatus: { type: String, default: "Preparando" },
  shipping: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
  
});

export default mongoose.models.Order || mongoose.model<OrderDocument>("Order", orderSchema);
