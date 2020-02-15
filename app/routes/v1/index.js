import express from 'express';
import initPortfolioRoutes from './portfolioRoutes';
import initStockRoutes from './stockRoutes';
import initTradeRoutes from './tradeRoutes';

const initVersion1Routes = () => {
  const v1Router = express.Router();

  v1Router.use('/portfolio', initPortfolioRoutes());
  v1Router.use('/stock', initStockRoutes());
  v1Router.use('/trade', initTradeRoutes());

  return v1Router;
};

export default initVersion1Routes;
