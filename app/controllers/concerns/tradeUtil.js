import { sequelize } from '../../models';
import { updatePortfolioOnStockBuy, updatePortfolioOnStockSell } from './portfolioUtil';
import { Stock, Trade, Portfolio, PortfolioTrade } from "../../models";

const createTrade = async (stockId, price, qty, type) => {
  await sequelize.transaction(async () => {
    const trade = await Trade.create({
      stockId,
      qty,
      userId: 1,
      price,
      type,
    });

    if (type == "BUY") {
      await updatePortfolioOnStockBuy(trade.id, stockId, qty, price);
    }
    if (type == "SELL") {
      await updatePortfolioOnStockSell(trade.id, stockId, qty, price);
    }
  });
}

export {
  createTrade
}
