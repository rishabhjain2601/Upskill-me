import userModel from '../models/UserModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET_KEY, {expiresIn : '2d'})
}

export const userSignup = async (req, res) => {
    const userExists = await userModel.findOne({ email: req.body.email })
    if (userExists) {
        res.send("User already exists")
    } else {
        const saltRounds = 10;
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword

        userModel.create(data)
            .then(users => res.json(users))
            .catch(err => res.json(err))

        const user = await userModel.findOne({ email: data.email })

        const token = createToken(user.id)
    }
}

export const userLogin = async (req, res) => {
    try {
        const check = await userModel.findOne({ email: req.body.email });
        if (!check) {
            res.send("User does not exist")
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
        if (isPasswordMatch) {
            const token = createToken(check.id)
            res.send('Password matched', token)
        }
        else {
            res.send("Wrong password")
        }

    } catch {
        res.send("Wrong details")
    }
}