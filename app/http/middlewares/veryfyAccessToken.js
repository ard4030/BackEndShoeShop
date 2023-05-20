
const { UserModel } = require("../../models/user");
const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");

function VerifyAccessToken(req,res,next){
    // const headers = req.headers.cookie;
    // const [bearer,token] = headers.cookie?.split("=") || [];
    const token = req.cookies['token']

    if(token){
        JWT.verify(token,ACCESS_TOKEN_SECRET_KEY,async (err,payload) => {
            try {
                if(err) return next({status:400,message:"لطفا وارد حساب کاربری خود شوید",success:false})
                const {mobile} = payload || {};
                const user = await UserModel.findOne({mobile} , {password : 0,otp:0})
                //کد های بالا اگر مقدارشون 0 قرار بدیم برنمیگردونه
                if(!user) return next({status:400,message:"حساب کاربری یافت نشد",success:false})
                req.user = user;
                return next()
            } catch (error) {
                next(error)
            }
        })
    }

   else return  next({status:400,message:"لطفا وارد حساب کاربری خود شوید",success:false})
}

// function VerifyAccessToken1(req,res,next){
//     // const headers = req.headers.cookie;
//     // const [bearer,token] = headers.cookie?.split("=") || [];
//     const token = req.headers.token
//     if(token){
//         JWT.verify(token,ACCESS_TOKEN_SECRET_KEY,async (err,payload) => {
//             try {
//                 if(err) return next({status:400,message:"لطفا وارد حساب کاربری خود شوید",success:false})
//                 const {mobile} = payload || {};
//                 const user = await UserModel.findOne({mobile} , {password : 0,otp:0})
//                 //کد های بالا اگر مقدارشون 0 قرار بدیم برنمیگردونه
//                 if(!user) return next({status:400,message:"حساب کاربری یافت نشد",success:false})
//                 req.user = user;
//                 return next()
//             } catch (error) {
//                 next(error)
//             }
//         })
//     }

//    else return  next({status:400,message:"لطفا وارد حساب کاربری خود شوید",success:false})
// }

function checkAccess (role) {
    return function (req,res,next) {
        try {
            const user = req.user;
            if(user.Roles.includes(role)) return next();    
            throw {
                status:403,
                message : "شما به این قسمت دسترسی ندارید"
            }
        } catch (error) {
            next(error)
        }
    }     
}



module.exports = {
    VerifyAccessToken,
    // VerifyAccessToken1,
    checkAccess
}


