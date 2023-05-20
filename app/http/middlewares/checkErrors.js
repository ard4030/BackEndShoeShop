const { validationResult } = require("express-validator");

function expressValidatorMapper(req, res, next) {
  let messages = {};
  const result = validationResult(req);
/*   console.log(result) */
  messages = {}
  if (result?.errors?.length > 0) {
    result?.errors.forEach((err) => {
        messages[err.param] = err.msg;
    });
      return res.status(200).json({
          status : 400,
          success : false,
          messages
      });
  }
  next()
}
const  yupValidator = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    
    return res.status(500).json({ type: err.name, message: err.message });
  }
};
module.exports = {
  expressValidatorMapper,
  yupValidator
};
