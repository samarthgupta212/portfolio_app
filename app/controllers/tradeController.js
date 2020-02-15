import { Responder } from '../lib';
import { Stock } from "../models";
import { createTrade } from './concerns/tradeUtil';

const create = async (req, res) => {
  try {
    const { qty, stockId, price, type } = req.body

    const stock = await Stock.findOne({
        where: {id: stockId},
    });
    if (!stock) throw new Error("Invalid stock")

    await createTrade(stockId, price, qty, type);

    return Responder.success(res, { success: true });
  } catch (error) {
    return Responder.operationFailed(res, { error, status: 400 });
  }
};

module.exports = {
  create
}
