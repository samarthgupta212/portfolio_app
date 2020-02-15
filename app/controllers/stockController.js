import { Responder } from '../lib';
import { Stock } from "../models";

const create = async (req, res) => {
  try {
    const { name, ticker } = req.body;
    const stock = await Stock.create({
        name: name,
        ticker: ticker,
    });

    return Responder.success(res, { success: true, stock: stock });
  } catch (error) {
    return Responder.operationFailed(res, { error, status: 400 });
  }
};

module.exports = {
  create
}
