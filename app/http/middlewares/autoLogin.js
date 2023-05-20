const { UserModel } = require("../../models/auth");
const { verifyJwtToken, verifyJwtToken1 } = require("../../modules/functions");

const checkLogin = async (req,res,next) => {

    try {
        let authError = {status:401,message:"لطفا وارد شوید"}
        const authorization = req?.headers?.authorization;
        if(!authorization) throw authError;
        let token = authorization.split(" ")?.[1];
        if(!token) throw authError; 
        const result = verifyJwtToken(token);
        const {mobile} = result;
        const user = await UserModel.findOne({mobile})
        if(!user) throw authError;
        req.mobile = user;
        return(next())
    } catch (error) {
        next(error)
    }
}

const checkLogin1 = async (req,res,next) => {

    try {
        let authError = {status:401,message:"لطفا وارد شوید"}
        const authorization = req?.headers?.authorization;
        if(!authorization) throw authError;
        let token = authorization.split(" ")?.[1];
        if(!token) throw authError; 
        const result = verifyJwtToken1(token);
        const {username} = result;
        const user = await UserModel.findOne({ $or: [ { username: username}, { email: username } ] });
        console.log(user)
        if(!user) throw authError;
        req.user = {
            name: user.name,
            email: user.email,
            id:user._id
        };
        return(next())
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkLogin,
    checkLogin1
}