const Joi = require('joi');
import { tradeValues } from '../enums';

module.exports.get = {
  params: {
    portfolioId: Joi.number().integer().min(1).required(),
  }
};

module.exports.delete = {
  params: {
    portfolioId: Joi.number().integer().min(1).required(),
  },
  body: {
    price: Joi.number().min(0.0001).required(),
  }
}

module.exports.put = {
  params: {
    portfolioId: Joi.number().integer().min(1).required(),
  },
  body: {
    qty: Joi.number().integer().min(1).required(),
    price: Joi.number().min(0.0001).required(),
    type: Joi.string().valid(tradeValues)
  }
}
