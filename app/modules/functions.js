const path = require("path")
const jwt = require("jsonwebtoken");
const fs = require("fs")
const bcrypt = require('bcrypt');
const { UserModel } = require("../models/user");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("../utils/constans");
const { ProductModel } = require("../models/product");


function hashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt)
}

function tokenGenerator(payload){
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn : "3 days"})
    return token;
}

function verifyJwtToken(token){
    const result = jwt.verify(token,process.env.SECRET_KEY)
    if(!result?.mobile) throw {status:401,message:"لطفا وارد شوید"}
    return result
}

function verifyJwtToken1(token){
    const result = jwt.verify(token,process.env.SECRET_KEY)
    if(!result?.username) throw {status:401,message:"لطفا وارد شوید"}
    return result
}

function createUploadPath(mobile) {
    const userUploadId = mobile+""
    const uploadPath = path.join(__dirname,"..","..","public","imagUpload",userUploadId);
    fs.mkdirSync(uploadPath,{recursive:true});
    return path.join("public","imagUpload",userUploadId)
}

function createLinkForFiles(fileAddress, req){
    return fileAddress? (req.protocol + "://" + req.get("host")+ "/" + (fileAddress.replace(/[\\\\]/gm, "/"))) : undefined
}

function createUrlImage(req) {
     const publicUrl = path.join(__dirname,"..","..") + "\\" 
     return publicUrl; 
}

function RandomNumberGenerator(){
    return Math.floor((Math.random() * 90000) + 10000)
}

function SignAccessToken(userId){
    return new Promise(async (resolve,reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,
        };
        const option = {
            expiresIn : "2d"
        };
        jwt.sign(payload,ACCESS_TOKEN_SECRET_KEY,option,(error,token) => {
            if(error) reject({status:400,message:"خطای سیستمی",success:false})
            resolve(token)
        })
    })
}

function SignRefreshToken(userId){
    return new Promise(async (resolve,reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,
        };
        const option = {
            expiresIn : "1y"
        };
        jwt.sign(payload,REFRESH_TOKEN_SECRET_KEY,option,(error,token) => {
            if(error) reject({status:400,message:"خطای سیستمی",success:false})
            resolve(token)
        })
    })
}

function VerifyRefreshToken(token){
       return new Promise((resolve,reject) => {
        jwt.verify(token,REFRESH_TOKEN_SECRET_KEY,async (err,payload) => {
            if(err) reject({status:400,message:"لطفا وارد حساب کاربری خود شوید",success:false})
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile} , {password : 0,otp:0})
            if(!user) reject({status:400,message:"حساب کاربری سافت نشد",success:false})
            resolve(mobile)
        })
       })
}

function calcModesPrice(modes) {
    let TotalModesPrice = 0;
 
    modes.forEach(element => {
        TotalModesPrice = parseInt(TotalModesPrice) + parseInt(element.price) 
    });
    return TotalModesPrice;
}

function isEqual(arr1, arr2) {
    // console.log(arr1)
    // console.log(arr2)

    if (arr1 === arr2) {
      return true;
    }
  
    if (arr1.length !== arr2.length) {
      return false;
    }

    let x = true
    arr1.forEach((element, index) => { 
        if(JSON.stringify(element) !== JSON.stringify(arr2[index])) x = false
        // console.log(JSON.stringify(element))
        // console.log(JSON.stringify(arr2[index]))
     })
    if (x== false) return false
    // for (let i = 0; i < arr1.length; i++) {
    //   if (arr1[i] !== arr2[i]) {
    //     return false;
    //   }
    // }
    return true;
}

async function checkCount(product,data,count){
    const addonItem = data;
    let x = false;
    
    if(data.length < 1 || !data.length){
        if((count + 1) > parseInt(product.quantity)){
            
            x = 'موجودی انبار ناکافی';
            return x
        }
    }
    
    addonItem.map(item => {
        product.addonItem.forEach(element => {
            if(item.title === element.title){
                element.specs.map(item1 => {
                    if(item.key === item1.key){
                        // console.log(`${item1.quantity} - ${count}`)
                        if((count + 1 ) > parseInt(item1.quantity)){
                            x = `تعداد بیشتری از این محصول با  ${item.title} -   ${item.key} در انبار موجود نیست`;
                            return
                        }
                    }
                })
            }
        });
    })

    return x
}


module.exports = {
    tokenGenerator,
    verifyJwtToken,
    verifyJwtToken1,
    createUploadPath,
    createLinkForFiles,
    createUrlImage,
    hashString,
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    calcModesPrice,
    isEqual,
    checkCount
}