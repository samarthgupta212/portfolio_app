const Joi = require('joi');
import { tradeValues } from '../enums';

module.exports.create = {
  body: {
    qty: Joi.number().integer().min(1).required(),
    stockId: Joi.number().integer().min(1).required(),
    price: Joi.number().min(0.0001).required(),
    type: Joi.string().valid(tradeValues)
  }
};
