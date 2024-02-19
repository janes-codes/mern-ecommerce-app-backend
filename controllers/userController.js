const userModel = require("../Models/userModel")
const jwt = require('jsonwebtoken');
const rolesModel = require("../Models/rolesModel")
const mongoose = require('mongoose')

module.exports.signUp = async (req, res) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const image = req.body.url || 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
    const type = req.body.type || 'USER'

    const roleData = await rolesModel.findOne({ role: type})
    console.log(roleData, "13")
    const roles = [roleData._id]
    console.log(roles, "10")

    if (!name) {
        return res.send({ code: 400, message: 'Name Required.' })
    } else if (!password) {
        return res.send({ code: 400, message: 'Password Required.' })
    } else {
        //  logic here
        const user = await userModel.findOne({email: email})
        if(!user) {
            const newUser = new userModel({ name, email, password, image, type, roles})
            const isSaved = await newUser.save()
            if (isSaved) {
                res.send({ code: 200, message: 'Saved' })
            } else {
                res.send({ code: 500, message: 'Server Err' })
            }
        } else {
            res.send({ code: 401, message: 'email already exist' })
        }
        
    }

}

module.exports.login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!email) {
        return res.send({ code: 400, message: 'Name Required.' })
    } else if (!password) {
        return res.send({ code: 400, message: 'Password Required.' })
    } else {
         // main logic
        const isEmailExists = await userModel.findOne({email: email}).populate('roles')

        console.log(isEmailExists, "42")
        if (isEmailExists) {
            console.log(isEmailExists.password, "isEmailExists")
            if (isEmailExists.password == req.body.password) {
                const token = jwt.sign({
                    // expAfter: Math.floor(Date.now() / 1000) + (60 * 60), 
                    email: isEmailExists.email,
                    password: isEmailExists.password,
                    type: isEmailExists.type,
                    roles: isEmailExists.roles,
                }, 'MYKEY', {expiresIn: '1h'});
                return res.send({
                    code: 200, 
                    message: 'login success', 
                    token: token, user: 
                    isEmailExists,
                })
            } else {
                return res.send({ code: 404, message: 'invalid email or password'})
            }
        } else {
            return res.send({ code: 404, message: 'invalid email or password'})
        }
     }
}

module.exports.addToCart = async (req, res) => {
    console.log(req.body, "62")
    // const userId = req.body.userId
    // const productId = (req.body.productId)

    // if(req.body.userId){
    const isUpdate = await userModel.updateOne({ _id: req.body.userId }, {$addToSet: {cart: req.body.productId}
    })
    console.log (isUpdate, "9090")
    if(isUpdate) {
        if(isUpdate.modifiedCount === 0) {
            return res.send({ code: 201, message: 'Add to cart success.' })
        }
        return res.send({ code: 200, message: 'Add to cart success.' })
    }else {
        return res.send({ code: 500, message: 'Server Err' })
    }
}

module.exports.getCart = async (req, res) => {
    const userId = req.body.userId
    console.log(userId)
    const data = await userModel.findOne({_id: userId}).populate('cart')

    if (data) {
        return res.send({ code: 200, message: 'Get cart success.', data: data })
    } else {
        return res.send({ code: 500, message: 'Server Err' })
    }
}


module.exports.deleteCart = async (req, res) => {
    console.log(req.body, "64")

    const userId = req.body.userId
    const objId = req.body.deleteData
    console.log(userId, objId, "9999")

    const validObjIds = objId.filter(objId => mongoose.Types.ObjectId.isValid(objId))

    if (validObjIds.length !== objId.length) {
        const invalidObjIds = objId.filter(objId => !mongoose.Types.ObjectId.isValid(objId));
        console.error('Invalid ObjectIds:', invalidObjIds)}
     else {
        const del = await userModel.updateMany({_id: userId},{$pull: {cart: {$in: validObjIds.map(objId => mongoose.Types.ObjectId.createFromHexString(objId))}}})
            if(del) {
                return res.send({ code: 200, message: 'Delete cart sucesss.'})
            }else {
                return res.send({ code: 500, message: 'Server Err' })
            }
      }
}