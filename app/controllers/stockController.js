import { Responder } from '../lib';
import { Stock } from "../models";

const create = async (req, res) => {
  try {
    const { name, ticker } = req.body;
    let stock = await Stock.findOne({
      where: { ticker: ticker },
    })
    if (stock) throw new Error("Stock already exists")

    stock = await Stock.create({
        name: name,
        ticker: ticker,
    });
    return Responder.success(res, { success: true, stock });
  } catch (error) {
    return Responder.operationFailed(res, { error, status: 400 });
  }
};

const fetch = async (req, res) => {
  try {
    const stocks = await Stock.findAll({});

    return Responder.success(res, { success: true, stocks });
  } catch (error) {
    return Responder.operationFailed(res, { error, status: 400 });
  }
};

module.exports = {
  create,
  fetch
}
