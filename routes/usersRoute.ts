import express from "express"

import UserController from "../controllers/usersController.js"
import { validateUser } from "../middlewares/userValidate.js"

const router = express.Router()

router.get("/", UserController.findAllUser)
router.get("/:userId", UserController.findOneUser)
router.post("/",validateUser, UserController.createOneUser)
router.put("/:userId", UserController.findOneAndUpdate);
router.delete("/:userId", UserController.findOneAndDelete);
router.get("/offset", UserController.getOffsetUser);

router.post("/signup", UserController.signup)
router.post("/login", UserController.login)
router.delete("/", UserController.deleteAll)

// router.use((req, res, next) => {
//     console.log("👀 got here")
//     res.on("finish", () => {
//       console.log("Record created:", {
//         /* log data */
//       })
//     })
//     next()
//   })

export default router
