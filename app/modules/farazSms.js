const request = require("request");

function farazSms1(mobile, code) {
  request.post(
    {
      url: "http://ippanel.com/api/select",
      body: {
        op: "send",
        uname: "09164524864",
        pass: "faraz6550047404",
        message: `وبسایت خاوران کد ورود شما${code}`,
        from: "5000125475 ",
        to: [mobile],
      },
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
        console.log(response.body);
      } else {
        console.log(error);
      }
    }
  );
}

function farazSms2(mobile, code) {
  request.post(
    {
      url: "http://ippanel.com/api/select",
      body: {
        op: "pattern",
        user: "09164524864",
        pass: "faraz6550047404",
        fromNum: "5000125475",
        toNum: `${+mobile}`,
        patternCode: "6cdq3d5g14wzjb7",
        inputData: [
          { code: code },
          // {"brand":"bmw"}
        ],
      },
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  );
}

function farazSms3(mobile) {
  request.post(
    {
      url: "http://ippanel.com/api/select",
      body: {
        op: "pattern",
        user: "09164524864",
        pass: "faraz6550047404",
        fromNum: "5000125475",
        toNum: `09164524864`,
        patternCode: "3shqzmqrab91fiq",
        inputData: [
          { mobile: mobile },
          // {"brand":"bmw"}
        ],
      },
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(response.body);
      } else {
        console.log("whatever you want");
      }
    }
  );
}

module.exports = {
  farazSms1,
  farazSms2,
  farazSms3
};
