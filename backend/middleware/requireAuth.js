import jwt from "jsonwebtoken";
import userModel from "../models/UserModel";

const requireAuth = async (req, res, next) => {

    const {authorization} = req.headers

    if(!authorization){
        return res.send("Authorization token required")
    }

    const token = authorization.split(' ')[1]

    try {

        const id = jwt.verify(token, process.env.SECRET_KEY)
        console.log(id)
        req.user = await userModel.findOne({id})
        next()

    } catch (error) {
        console.log(error)   
        res.send("Request not authorized")
    }
}