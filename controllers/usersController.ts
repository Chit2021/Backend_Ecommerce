import { NextFunction, Request, Response } from "express";
import UsersService from "../services/usersService.js";
import { ApiError } from "../errors/ApiError.js";
//import { LoginRequest } from "../types/users.js";
import UserRepo from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ResponseHandler } from "../responses/ResponseHandler.js";

//Pagination
export async function getOffsetUser(req:Request, res: Response, next: NextFunction)  {
  
  const pageNumber = Number(req.query.pageNumber) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  if(pageNumber<0){
    next(ApiError.internal("PageNumber Must be Non Negative"))
    return
  }
  const users = await UsersService.paginateUsers(pageNumber, pageSize);
  if(!users) {
    next(ApiError.internal("Internal Server error"));
  }
  next(ResponseHandler.resourceFetched(JSON.stringify(users)))
  //res.json(users); 
}

export async function findAllUser(_: Request, res: Response) {
  const users = await UsersService.findAll();
  res.json({ users });
}

//Find user by ID
export async function findOneUser(req: Request, res: Response, next: NextFunction) {
  const userId = Number(req.params.userId);
  const user = await UsersService.findOne(userId);
  if (!user) {
    next(ApiError.resourceNotFound("User not found."))
    return;
  }
  next(ResponseHandler.resourceFetched(JSON.stringify(user)))
 // res.json({ user });
}

//Create user old code while basic crud
export async function createOneUser(req: Request, res: Response) {
  const newUser = req.body;
  const user = await UsersService.createOne(newUser);
  res.status(201).json({ user });
}

//Update user
export async function findOneAndUpdate(req: Request,res: Response,next: NextFunction) {
    const newUser = req.body;
    const userId = req.params.userId;
    const updatedUser = await UsersService.findOneAndUpdate(userId, newUser);
  
    if (!updatedUser) {
      next(ApiError.resourceNotFound("User not found."));
      return;
    }
    next(ResponseHandler.resourceUpdated(JSON.stringify(updatedUser), `User with ${updatedUser._id} has been updated`))
    // res.status(200).json({ updatedUser });
}

//Delete user by ID
export async function findOneAndDelete( req: Request, res: Response, next: NextFunction ) {
    const userId = req.params.userId;
    const deletedUser = await UsersService.findOneAndDelete(userId);

    if(!deletedUser) {
        next(ApiError.resourceNotFound("User not found."));
        return;
    }
   // next(ResponseHandler.resourceDeleted(JSON.stringify(deletedUser), `User with ${deletedUser._id} has been Deleted`))
   res.status(200).json("User deleted ...");
}

//first try for login
// export async function login(req: Request,res: Response,next: NextFunction) {
//   const loginRequest: LoginRequest = req.body;
//   const user = await UsersService.handleLogin(loginRequest);
//   if (!user) {
//     next(ApiError.unauthorized("Incorrect email or password"));
//     return;
//   }
//   res.status(200).json({ user });
// }

//SignUp for user
export async function signup(req: Request, res: Response) {
  const { name, email, password} = req.body
  const user = await UsersService.createNewOne({ name, email, password })
  if (!user) {
    res.status(400).json({
      message: "User exists",
      user: null,
    })
    return
  }

  res.status(201).json({
    message: "user created",
    user,
  })
}

//login
export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password} = req.body
  const login = await UsersService.login(email, password)

  if (login.status === false) {
    next(ApiError.badRequest("Login failed..."));
   // res.status(400).json({ accessToken: null, message: "Bad credentials" })
    return
  }

  res.json({ message: login.message, accessToken: login.accessToken })
}

//new all in one controller
// export async function login(req: Request, res: Response, next: NextFunction) {
//   const { email, password} = req.body
//   const user = await UserRepo.findOne({email})
//   console.log("User==",user)

//   if (!user) {
//     next(ApiError.badRequest("Login failed..."));
//     //res.status(400).json({ accessToken: null, message: "Bad credentials" })
//     return
//   }
//   const hashedPassword = user.password
//   console.log("Hashed Password==",hashedPassword)

//   const isValid = bcrypt.compareSync(password, hashedPassword)
//   console.log("Valid==",isValid) 
//   if (!isValid) {
//     return {
//       message: "bad credentials",
//       status: false,
//       accessToken: null,
//     }
//   }
//   const payload = {
//     userId: user.id,
//     email: user.email,
//     role: user.role,
//   }
//   console.log("Payload==",payload)
//   const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
//     expiresIn: "1h",
//   })
//   console.log("AccessToken:",accessToken)
//   return {
//     message: "valid credentials",
//     status: true,
//     accessToken,
//   }
//   //res.json({ message: login.message, accessToken: login.accessToken })
// }

//delete all users
export async function deleteAll(req: Request, res: Response) {
  await UserRepo.deleteMany()
  res.status(201).json({
    message: "users are deleted",
  })
}

export default {
  getOffsetUser,
  findOneUser,
  findAllUser,
  createOneUser,
  findOneAndUpdate,
  findOneAndDelete,
  login,
  signup,
  deleteAll
};
