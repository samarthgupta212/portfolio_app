import { Stock, Trade, Portfolio, PortfolioTrade } from "../../models";

const updatePortfolioOnStockBuy = async (tradeId, stockId, qty, price) => {
  let portfolio = await Portfolio.findOne({
    where: {
      stockId,
      userId: 1,
    }
  });

  let prevQty = 0, newQty = qty, prevAverageBuyPrice = 0, newAverageBuyPrice = price
  if (!portfolio) {
    portfolio = await Portfolio.create({
      stockId,
      qty,
      userId: 1,
      avgBuyPrice: price,
    });
  } else {
    prevQty = portfolio.qty;
    prevAverageBuyPrice = portfolio.avgBuyPrice
    newQty = prevQty + qty
    newAverageBuyPrice = (portfolio.qty *  portfolio.avgBuyPrice + qty * price) / newQty;
    portfolio.avgBuyPrice = newAverageBuyPrice
    portfolio.qty = newQty
    await portfolio.save();
  }

  const portfolioTrade = await PortfolioTrade.create({
    portfolioId: portfolio.id,
    tradeId,
    prevQty,
    newQty,
    price,
    prevAverageBuyPrice,
    newAverageBuyPrice,
    qty,
    type: "BUY",
  });
}

const updatePortfolioOnStockSell = async (tradeId, stockId, qty, price) => {
  let portfolio = await Portfolio.findOne({
    where: {
      stockId,
      userId: 1,
    }
  });

  if (!portfolio) throw new Error("Portfolio was not there for given stock")
  if (portfolio.qty < qty) throw new Error("Cannot sell more qty than u can bought");
  let prevQty = portfolio.qty, newQty = portfolio.qty - qty, prevAverageBuyPrice = portfolio.avgBuyPrice,
    newAverageBuyPrice = prevAverageBuyPrice;
  portfolio.qty = newQty;

  // Remove portfolio when qty = 0 
  if (!portfolio.qty) {
    await portfolio.destroy();
    return;
  }
  await portfolio.save();
  const portfolioTrade = await PortfolioTrade.create({
    portfolioId: portfolio.id,
    tradeId,
    prevQty,
    newQty,
    price,
    prevAverageBuyPrice,
    newAverageBuyPrice,
    qty,
    type: "SELL",
  });

}

export {
  updatePortfolioOnStockBuy,
  updatePortfolioOnStockSell,
}
