import bcrypt from "bcrypt";
import User from "../models/User.js";
export const signup = (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        else {
            res.status(200).send({ message: "User Registered successfully" });
            return user;
        }
    });
};
// export const signin = (req: Request, res: Response) => {
//     User.findOne({
//       email: req.body.email
//     })
//       .exec((err: any, user: any) => {
//         if (err) {
//           res.status(500).send({message: err});
//           return;
//         }
//         if (!user) {
//           return res.status(404).send({message: "User Not found."});
//         }
//         //comparing passwords
//         const passwordIsValid = bcrypt.compareSync(
//           req.body.password,
//           user.password
//         );
//         // checking if password was valid and send response accordingly
//         if (!passwordIsValid) {
//           return res.status(401)
//             .send({
//               accessToken: null,
//               message: "Invalid Password!"
//             });
//         }
//         //signing token with user id
//         const token = jwt.sign({
//           id: user.id
//         }, process.env.API_SECRET, {    //API_SECRET --- should be in .env
//           expiresIn: 86400
//         });
//         //responding to client request with user profile success message and  access token .
//         res.status(200)
//           .send({
//             user: {
//               id: user._id,
//               email: user.email,
//               name: user.name,
//             },
//             message: "Login successfull",
//             accessToken: token,
//           });
//       });
//   };
