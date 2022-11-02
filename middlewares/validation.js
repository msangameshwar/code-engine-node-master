const joi = require("joi");

const tradeSchema = joi.object({
  type: joi.string().valid("buy", "sale").required(),
  user_id: joi.number().required(),
  symbol: joi.string().required(),
  shares: joi.number().min(1).max(100).required().messages({
    "string.email": `Share value must be in range 1 to 100`,
  }),
  price: joi.number().required(),
});

const patchTradeSchema = joi.object({
  type: joi.string().valid("buy", "sale"),
  user_id: joi.number(),
  symbol: joi.string(),
  shares: joi.number().min(1).max(100).messages({
    "string.email": `Share value must be in range 1 to 100`,
  }),
  price: joi.number(),
});

const postValidation = async (req, res, next) => {
  return await validationHelper(req.body, res, next, tradeSchema);
};

const patchValidation = async (req, res, next) => {
  return await validationHelper(req.body, res, next, patchTradeSchema);
};

const validationHelper = async (body, res, next, schema) => {
  
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  try {
    const { error, value } = await schema.validate(body, options);

    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Oops, Something went wrong. please try again",
    });
  }
};

module.exports = { postValidation, patchValidation };
