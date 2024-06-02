import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email :{type: String, required: true},
    password :{type: String, required: true},
    // personality: {type: String},
    // // answers: {q1: {type:String},q2: {type:String},q3: {type:String},q4: {type:String},q5: {type:String},q6: {type:String},q7: {type:String},q8: {type:String},q9: {type:String},q10: {type:String}},
    // career : {
    //     name: {type: String},
    //     reason: {type: String},
    //     categories: {type: Array}
    // },
    // roadmapData: {type: Array}
})

const userModel = mongoose.model('user', userSchema)

export default userModel