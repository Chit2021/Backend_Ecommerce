// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
// const OrderSchema = new Schema({
//   id: ObjectId,
//   name: String,
// });
// export default mongoose.model("Order", OrderSchema);
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const OrderSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
});
const Order = mongoose.model("Order", OrderSchema);
export default Order;
