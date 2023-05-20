
const {body} = require("express-validator");  

function addressValidator(){

        return [
        body("ostanName").isLength({min:2,max:80}).withMessage("نام استان وارد شده صحیح نیست"),
        body("cityName").isLength({min:2,max:80}).withMessage("نام شهر وارد شده صحیح نیست"),
        body("name").isLength({min:2,max:80}).withMessage("نام و نام خانوادگی حداقل 2 و حداکثر 8 کاراکتر"),
        body("mobile").custom((value, {req,res}) => {
             if(req.body.mobile){
                const usernameRegex = /09(0[0-9]|1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/gi
                if(usernameRegex.test(req.body.mobile)){
                    return true
                }
                  throw "شماره موبایل صحیح نیست"  
            }else{
                throw "شماره موبایل نمیتواند خالی باشد"
            }
        }),
        body("postalCode").isLength({min:10,max:10}).withMessage("کد پستی بدون خط فاصله و 10 رقم"),

    ]

}


module.exports = {
    addressValidator,
}