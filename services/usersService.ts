import mongoose, { ObjectId } from "mongoose"
import UserRepo  from "../models/User.js"
//import { LoginRequest, User } from "../types/users.js"
import { User } from "../types/user.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const usersRepo = new UserRepo()

async function paginateUsers(pageNumber:number, pageSize:number) {
  const skip = (pageNumber - 1) * pageSize;
  const users = await UserRepo.find().skip(skip).limit(pageSize).exec();
  return users;
}

async function findAll() {
  const users = await UserRepo.find().exec()
  return users
}

async function findOne(userId: number) {
  const id = new mongoose.Types.ObjectId(userId)
  const user = await UserRepo.findById(userId)
  return user
}

//old one to create user
async function createOne(user: User) {
  const newUser = new UserRepo(user)
  return await newUser.save()
}

//update
async function findOneAndUpdate(userId: string, user: User) {
  const id = new mongoose.Types.ObjectId(userId);
  return await UserRepo.findByIdAndUpdate(id, user);
}

//delete by id
async function findOneAndDelete(userId: string) {
  const id = new mongoose.Types.ObjectId(userId);
  return await UserRepo.findByIdAndDelete(id);
}
 
// async function handleLogin(loginRequest: LoginRequest) {
//   const { email, password } = loginRequest;
//   const user = await UserRepo.findOne({ email, password});
//   return user;
// }

//find email
async function findOneByEmail(email: string) {
  return UserRepo.findOne({ email })
}

//signup for user
async function createNewOne({
  name,
  email,
  password
}: {
  name: string,
  email: string,
  password: string
}) {
  const hashedPassword = bcrypt.hashSync(password, 10)

  bcrypt.compare(password, hashedPassword).then(function(result) {
    // result == true
  console.log("result==",result)
});

  //console.log("HashedPassword:", hashedPassword)

  const userFromDB = await findOneByEmail(email) //check for email duplication
  if (userFromDB) {
    return null
  }
  const user = new UserRepo({
    name,
    email,
    password: hashedPassword,
  })
  await user.save()
  const userWithoutPass = {
    name: user.name,
    email: user.email,
    role: user.role,
  }
  return userWithoutPass
}

//login for user
async function login(email: string, password: string) {
  const user = await findOneByEmail(email)
  if (!user) {
    return {
      message: "Can not find user by email",
      status: false,
      accessToken: null,
    }
  }

  const hashedPassword = user.password
  console.log("hashedPassword==",hashedPassword)
  console.log("Password==",password)
  const isValid = bcrypt.compareSync(password, hashedPassword)
  if (!isValid) {
    return {
      message: "Wrong password",
      status: false,
      accessToken: null,
    }
  } //not working

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  }
  const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: "1h",
  })
  console.log("AccessToken:",accessToken)
  return {
    message: "valid credentials",
    status: true,
    accessToken,
  }
}

export default {
  paginateUsers,
  findOne,
  findAll,
  createOne,
  findOneAndUpdate,
  findOneAndDelete,
  createNewOne,
  findOneByEmail,
  login
}
