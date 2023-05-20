const { DiscountModel } = require("../../../models/discount");
const { PaymentMethodModel } = require("../../../models/paymentmethod");
const { ERRORING } = require("../../../utils/constans");

class InitialController {

    async initialAll(req,res,next){
        try {
            // Initial Payment Methodes
            const Here = await PaymentMethodModel.remove();
            const savePaymentsMethod = await PaymentMethodModel.insertMany([
               {name:'online',title:"پرداخت آنلاین",enable:true},
               {name:'delivery',title:"پرداخت در محل",enable:false},
               {name:'cardtocard',title:"کارت به کارت",enable:false},
            ]) 
            if(!savePaymentsMethod) throw {status:200,success:false,message:'در تنظیمات پرداخت خطایی رخ داده . لطفا با پشتیبانی فنی در ارتباط باشید'}
            
            
            
            return res.status(200).json({
                status:200,
                success:true,
                message:'تنظیمات اولیه با موفقیت انجام شد'
            })


        } catch (error) {
            next(error)
        }
    }

    async initialPaymentMethods(req,res,next){
        try {
            
            // Initial Payment Methodes
            const Here = await PaymentMethodModel.remove();
            if(!Here) throw ERRORING;
            const savePaymentsMethod = await PaymentMethodModel.insertMany([
               {name:'online',title:"پرداخت آنلاین",enable:true},
               {name:'delivery',title:"پرداخت در محل",enable:false},
               {name:'cardtocard',title:"کارت به کارت",enable:false},
            ]) 
            if(!savePaymentsMethod) throw {status:200,success:false,message:'در تنظیمات پرداخت خطایی رخ داده . لطفا با پشتیبانی فنی در ارتباط باشید'}
            
            return res.status(200).json({
                status:200,
                success:true,
                message:'تنظیمات اولیه با موفقیت انجام شد'
            })


        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = {
    InitialController : new InitialController()
}