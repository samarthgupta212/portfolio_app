import express from 'express';
import { stockController } from '../../controllers';

const initStockRoutes = () => {
  const stockRoutes = express.Router();

  stockRoutes.post('/', stockController.create);

  return stockRoutes;
};

export default initStockRoutes;
