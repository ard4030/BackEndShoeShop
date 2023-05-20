
const {body} = require("express-validator");  

function numberValidator(){

     return [
         body("mobile").custom((value, {req,res}) => {
             if(req.body.mobile){
                // const usernameRegex = /09(0[0-9]|1[0-9]|1[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/gi
                const usernameRegex = /09[0-9]{2}[0-9]{3}[0-9]{4}$/;
                if(usernameRegex.test(req.body.mobile)){
                    return true
                }
                  throw "شماره موبایل صحیح نیست"  
            }else{
                throw "شماره موبایل نمیتواند خالی باشد"
            }
        }) 
    ] 
}

function userValidator(){
    return [
        body("username").isLength({min:4,max:10}).withMessage("یوزر نیم حداقل 4 و حداکثر 10 کاراکتر"),
        body("password").isLength({min:8,max:16}).withMessage("پسورد حداقل 8 و حداکثر 16 کاراکتر"),
        body("email").isEmail().withMessage("ایمیل وارد شده صحیح نیست"),
        body("name").isLength({min:2,max:20}).withMessage("نام شما حداقل 2 و  حداکثر 20 کاراکتر"),
    ]
}

module.exports = {
    numberValidator,
    userValidator,
}