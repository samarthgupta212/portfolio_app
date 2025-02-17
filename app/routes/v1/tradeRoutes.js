import express from 'express';
import { tradeController } from '../../controllers';
import validate from 'express-validation';
import validation from '../../validators';

const initTradeRoutes = () => {
  const tradeRoutes = express.Router();

  tradeRoutes.post('/', validate(validation.trade.create), tradeController.create);
  tradeRoutes.get('/', tradeController.fetchAll);
  
  return tradeRoutes;
};

export default initTradeRoutes;
