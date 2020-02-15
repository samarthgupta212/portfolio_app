import _ from 'lodash';
import { Responder } from '../lib';
import { Portfolio, PortfolioTrade } from '../models';
import { createTrade } from './concerns/tradeUtil';

// this updates portfolio for given portfolioId
// Expected body => qty = quantity of stock sold/bought, price = price at which stock is bought/sold, type = BUY/SELL
const update = async (req, res) => {
  try {
    const { portfolioId } = req.params
    const { price, qty, type } = req.body;

    const portfolio = await Portfolio.findOne({
      where: {id: portfolioId},
    });
    if (!portfolio) throw new Error("Portfolio Stock not found")
    await createTrade(portfolio.stockId, price, qty, type);

    return Responder.success(res, { success: true });
  } catch (error) {
    return Responder.operationFailed(res, { error, status: 400 });
  }
}

// Sells all the shares for given portfolioId
// Expected Body => price = price at which stock needs to be sold
const remove = async (req, res) => {
  try {
    const { portfolioId } = req.params;
    const { price } = req.body;

    const portfolio = await Portfolio.findOne({
      where: {id: portfolioId},
    });
    if (!portfolio) throw new Error("Portfolio Stock not found")

    await createTrade(portfolio.stockId, price, portfolio.qty, "SELL");

    return Responder.success(res, { success: true });
  } catch (error) {
    return Responder.operationFailed(res, { error, status: 400 });
  }
}

// fetch returns given protfolio with trades for given portfolioId
const fetch = async (req, res) => {
  try {
    const { portfolioId } = req.params;
    const portfolio = await Portfolio.findOne({
      where: {id: portfolioId},
      include: {
        model: PortfolioTrade, as: 'portfolioTrades',
        attributes: ['portfolioId', 'price', 'type', 'qty', 'createdAt'],
      },
      order: [
       [{ model: PortfolioTrade, as: 'portfolioTrades' }, 'createdAt', 'DESC']
      ],
    });
    if (!portfolio) throw new Error("Portfolio Stock not found")

    return Responder.success(res, { success: true, portfolio });
  } catch (error) {
    return Responder.operationFailed(res, { error, status: 400 });
  }
};

// fetchAll returns all portfolios
const fetchAll = async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll({
      order: [['createdAt', 'DESC']]
    });

    return Responder.success(res, { success: true, portfolios });
  } catch (error) {
    return Responder.operationFailed(res, { error, status: 400 });
  }
};

// fetchReturns given returns
const fetchReturns = async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll({});

    let returnAmount = 0;
    _.forEach(portfolios, (portfolio) => {
      returnAmount += portfolio.getReturn();
   });

    return Responder.success(res, { success: true, returnAmount });
  } catch (error) {
    return Responder.operationFailed(res, { error, status: 400 });
  }
}

module.exports = {
  update,
  remove,
  fetch,
  fetchAll,
  fetchReturns
}
