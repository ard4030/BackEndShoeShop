const res = require('express/lib/response');

async function sendingSms (mobile,code) {
    const MelipayamakApi = require('melipayamak');
    const username = '09164524864';
    const password = '32edm46';
    const api = new MelipayamakApi(username,password);
    const sms = api.sms('soap');
    const to = [mobile.mobile];
    const from = '50004001524864';
    const text = `وبسایت خاوران کد ورود :  ${code}`
    const isflash = false;
   await sms.send(to,from,text, isflash).then(res=>{
       if(res.string[0] === "1" || res.string[0].length == 19){
         return {success:true,message:"send sms is successful"}   
       }else{
        return {success:false,message:"sms is not send"}   
       }
        //RecId or Error Number 
    }).catch(err=>{
        console.log("this is " , err)
    })
}



module.exports = {
    sendingSms,

}