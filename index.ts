import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import jwt from "jsonwebtoken"
//import crypto from "crypto"

import itemsRoute from "./routes/itemsRoute.js"
import productsRoute from "./routes/productsRoute.js"
import usersRoute from "./routes/usersRoute.js"
import categoryRoute from "./routes/categoriesRoute.js";

import { loggingMiddleware } from "./middlewares/logging.js"
import { apiErrorHandler } from "./middlewares/error.js"
import { routeNotFound } from "./middlewares/routeNotFound.js"
import sizesRoute from "./routes/sizesRoute.js"
import authRoute from "./routes/authRoute.js"
import ordersRoute from "./routes/ordersRoute.js"
import { checkAuth } from "./middlewares/checkAuth.js"


const PORT = 8080
const app = express()

//const jwt= require("jsonwebtoken")

app.use(express.json())

// TODO: Validate .env using Zod
const mongoURL = process.env.DB_URL as string
mongoose.connect(mongoURL).then(() => console.log("Connected!"))

app.get("/hello", loggingMiddleware, (_, res) => {
  res.json({ msg: "hello, from Express.js!" })
})

app.use("/api/v1/items", itemsRoute)
app.use("/api/v1/products", productsRoute)
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/orders", ordersRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/sizes", sizesRoute);

// for generating secret key
// const key = crypto.randomBytes(64).toString("hex")
// console.log("Key:",key)

//login code shifted to user controller
app.post("/api/v1/login", (req, res) =>{
  const user = {
    id: 'abcde-fghijk',
    email :'test@test.io',
    password :'123456',
  }
  
  if(req.body.email !== user.email || req.body.password !== user.password){
    return res.json({
      msg:'Invalid credential'
    })
  }
  const payload = {
    userId: user.id,
    email :user.email,
  }
 // const token = jwt.sign(payload,"secret")
  const token = jwt.sign(payload, process.env.TOKEN_SECRET as string)
  console.log("Token:",token)
  res.json({token})
});

app.get("/api/v1/protected", checkAuth, (req, res) => {
  res.json({ items: [1, 2, 3, 4, 5] })
})
//following code shifted to checkauth
// app.get("/api/v1/protected", (req, res) =>{
//   console.log("req:",req.headers)
//   //const token = req.headers.authorization  we get full info of token here
//   const token = req.headers.authorization?.split(" ")[1]
//   console.log("Token:",token)
//   try {
//     if (token){
//       const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
//       console.log("Decoded:",decoded)
//     }
//     res.json({items:[1,2,3,4,5]})
//   } catch (err){
//     console.log("Error:",err)
//     //handle error with 402 forbidden mean token is invalid
//     res.status(403).json({msg:"GET OUT"})
//   }
  

// })



//yazan code 7 Nov 2023

// // Admin getting orders
// app.get("/api/v1/orders", async (req, res) => {
//   const orderItems = await OrderItem.find()
//     .populate("productId")
//     .populate("orderId")

//   res.status(201).json({ orderItems })
// })

// app.post("/api/v1/checkout", async (req, res) => {
//   const {
//     name,
//     products,
//   }: {
//     name: string
//     products: {
//       id: string
//       quantity: number
//     }[]
//   } = req.body
//   const order = new Order({ name })
//   await order.save()

//   const orderId = order._id
//   console.log("orderId:", orderId)

//   await Promise.all(
//     products.map((product) => {
//       const orderItem = new OrderItem({
//         orderId,
//         productId: product.id,
//         quantity: product.quantity,
//       })
//       orderItem.save()
//     })
//   )

//   res.status(201).json({ message: "order is created", order })
// })
//yazan code end

app.use(apiErrorHandler)
app.use(routeNotFound)

app.listen(PORT, () => {
  console.log(`👀 app is running at localhost:${PORT}`)
})
