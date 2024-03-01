import mongoose, { Document, Schema } from "mongoose";


interface OrderDocument extends Document {
  quantity: string[],
  productId: string[],
  productImage: string[],
  productName: string[],
  subTotal: number,
  shipping: number,
  importFees: number,
  totalAmount: number,
  email: string,
  userId: string
  orderStatus: string,
  createdAt: Date
  shippingInfo:string
}

const orderSchema = new Schema<OrderDocument>({

  productId: { type: [String], required: true },
  productImage: { type: [String], required: true },
  productName: { type: [String], required: true },
  userId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  quantity: { type: [String], required: true },
  orderStatus: { type: String, default: "Processing" },
  shippingInfo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }

});

export default mongoose.models.Order || mongoose.model<OrderDocument>("Order", orderSchema);
