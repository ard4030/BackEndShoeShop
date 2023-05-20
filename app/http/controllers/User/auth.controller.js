
const { UserModel } = require("../../../models/user");
const { farazSms2 } = require("../../../modules/farazSms");
const { RandomNumberGenerator, SignAccessToken, SignRefreshToken } = require("../../../modules/functions");
const { USER_ROLE, ERRORING, DOMAIN_COOKIE } = require("../../../utils/constans");
var mongoose = require('mongoose');
const { DevidModel } = require("../../../models/devid");
const { serialize } = require("cookie");

class AuthController {

    async saveUser(mobile,code){
        let otp = {
            code,
            expiresIn : Date.now() + 180000,
            timeSend : new Date().getTime()
        }
        const result = await this.checkExistUser(mobile);
        if(result){
          return (await this.updateUser(mobile,{otp}))
        }

        return !!(await UserModel.create({
            mobile,
            otp,
            Roles : [USER_ROLE]
        }))
    } 

    getOtp =  async (req,res,next) => {
        try {
            const {mobile} = req.body;
            const result1  = await UserModel.findOne({mobile});
            if(result1) {
                const sendTime = result1.otp.timeSend;
                const now  = Date.now();
                if((sendTime + 60000) > now ) throw {status:400,message:"محدودیت در ارسال پیامک . لطفا 1 دقیقه منتظر بمانید"}
                const code = RandomNumberGenerator();
                const resultSms = farazSms2(mobile,code);
                const result = await this.saveUser(mobile,code);
                if(!result) throw {status:400,message:"خطا در ارسال پیامک",success:false}
                return res.status(200).json({
                        statusCode:200,
                        message : "کد اعتبار سنجی با موفقیت ارسال شد",
                        success:true,
                        code,
                        mobile
                })
            }else{
                const code = RandomNumberGenerator();
                // const resultSms = sendingSms(mobile,code);
                const resultSms = farazSms2(mobile,code)
                // if(resultSms.success == false) throw {status:400,message:"خطا در ارسال اس ام اس"}  
                const result = await this.saveUser(mobile,code)
                if(!result) throw {status:400,message:"خطا در ارسال پیامک",success:false}
                return res.status(200).json({
                        statusCode:200,
                        message : "کد اعتبار سنجی با موفقیت ارسال شد",
                        success:true,
                        code,
                        mobile
                })

            }

        } catch (error) {
            next(error)
        }
    } 

    async checkOtp(req,res,next){
        try {
            const {mobile , code} = req.body;
            const user = await UserModel.findOne({mobile})
            if(!user) throw createError.NotFound("کاربری یافت نشد");
            if(user.otp.code != code) throw {status:400,message:"کد وارد شده صحیح نیست",success:false}
            let now = new Date().getTime();
            if(user.otp.expiresIn < now) throw {status:400,message:"کد شما منقضی شده",success:false}
            const accessToken = await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id);
            const expiration = 24 * 60 * 60;
            const serialized = serialize("token", accessToken, {
              httpOnly: true,
              maxAge: expiration,
              path: '/',
            //   domain: DOMAIN_COOKIE,
            });

            res.status(200)
            .setHeader('Set-Cookie',serialized)
            .json({
                success:true,
                message:'ورود با موفقیت انجام شد'
            })
        } catch (error) {
            next(error)
        }
    } 


    async checkExistUser(mobile){
        const user = await UserModel.findOne({mobile})
        return !!user
    }

    async updateUser(mobile,objectData = {}){
        Object.keys(objectData).forEach(key => {
            if([""," ",0,null,undefined,NaN,"0"].includes(objectData[key])) delete objectData[key]
        })
        const updateResult = UserModel.updateOne({mobile},{$set : objectData})
        return !!(await updateResult).modifiedCount
    }

    isLogin(req,res,next){
        return res.status(200).json({
            success:true,
            message:"login",
            user:req.user
        })
    }

    async logOut(req,res,next){
        try {
            const serialized = serialize('token',"", {path:"/", maxAge:0})
            res.status(200).setHeader("Set-Cookie",serialized).json({
            success:true,
            message:"خروج با موفقیت انجام شد"
            }) 
        } catch (error) {
            next(error)
        }
    }


    async david(req,res,next){
        try {
            const deviceId = req.cookies['deviceId'];
            if(!deviceId){
                var newDeviceId = mongoose.Types.ObjectId();
                const expiration = 24 * 60 * 60 * 100;
                const serialized  = serialize("deviceId",
                newDeviceId,{
                        httpOnly:true,
                        maxAge:expiration,
                        path:'/',
                        //   domain: DOMAIN_COOKIE,
                    });
                res.status(200)
                .setHeader('Set-Cookie',serialized)
            }
            res.status(200).json({success:true})
        } catch (error) {
            next(error)
        }
    }

    


    // async setAccess(req,res,next){
    //     try {
    //         const {userId,access} = req.body;
    //         var id = mongoose.Types.ObjectId(userId);
    //         const result = await UserModel.findOne({_id:id})
    //         if(!result) throw ERRORING;
    //         if(result.Roles.includes(access) == false){
    //             let rols = result.Roles;
    //             rols.push(access)
    //             await UserModel.updateOne({_id:userId},{$set:{Roles:rols}})
    //         }
    //         res.status(200).json({
    //             status:200,
    //             success:true,
    //             message:"دسترسی به کاربر اضافه شد"
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    // async deleteAccess(req,res,next){
    //     try {
    //         const {userId,access} = req.body;
    //         var id = mongoose.Types.ObjectId(userId);
    //         const result = await UserModel.findOne({_id:id})
    //         if(!result) throw ERRORING;
    //         if(result.Roles.includes(access) == true){
    //             let rols = result.Roles.filter(item => item != access);  
    //             await UserModel.updateOne({id:userId},{$set:{Roles:rols}})
    //         }
    //         res.status(200).json({
    //             status:200,
    //             success:true,
    //             message:"دسترسی از کاربر حذف شد"
    //         })
    //     } catch (error) {
    //         next(error)
    //     }
    // }

}

module.exports = {
    AuthController : new AuthController()
}