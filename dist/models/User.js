import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
    id: ObjectId,
    // name: String,
    // email:String,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // avatar: {
    //   type: String,
    //   required: true,
    // },
    role: {
        type: String,
        required: true,
        default: "USER",
    },
});
export default mongoose.model("User", UserSchema);
//{ timestamps: true }
//})
// const UserSchema = new Schema({
//   id: ObjectId,
//   name: {
//     type: String,
//     required: [true, "name not provided "],
//   },
//   email: {
//     type: String,
//     unique: [true, "email already exists in database!"],
//     lowercase: true,
//     trim: true,
//     required: [true, "email not provided"],
//     validate: {
//       validator: function (v) {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
//       },
//       message: '{VALUE} is not a valid email!'
//     }
//   },
//   role: {
//     type: String,
//     enum: ["normal", "admin"],
//     required: [true, "Please specify user role"]
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });
// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// const UserSchema = new Schema({
//   name: String,
//   role: String,
//   email: String,
//   password: String,
//   avatar: String
// });
// export default mongoose.model("User", UserSchema, "users");
