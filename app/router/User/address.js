const router = require("express").Router();

const { AddressController } = require("../../http/controllers/User/address.controller");
const { expressValidatorMapper } = require("../../http/middlewares/checkErrors");
const { VerifyAccessToken} = require("../../http/middlewares/veryfyAccessToken");
const { addressValidator } = require("../../http/validations/address");


router.post("/addAddress",VerifyAccessToken,addressValidator(),expressValidatorMapper,AddressController.addAddress)
router.post("/getAddressById",VerifyAccessToken,AddressController.getAddressById) 
router.post("/updateAddress",VerifyAccessToken,addressValidator(),expressValidatorMapper,AddressController.updateAddress)
router.post("/deleteAddress",VerifyAccessToken,AddressController.deleteAddress)


module.exports = {
    addressRouter : router
}