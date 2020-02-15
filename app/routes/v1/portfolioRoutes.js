import express from 'express';
import { portfolioController } from '../../controllers';
import validate from 'express-validation';
import validation from '../../validators';

const initPortfolioRoutes = () => {
  const portfolioRoutes = express.Router();

  portfolioRoutes.get('/returns', portfolioController.fetchReturns);
  portfolioRoutes.put('/:portfolioId', validate(validation.portfolio.put), portfolioController.update);
  portfolioRoutes.delete('/:portfolioId', validate(validation.portfolio.delete), portfolioController.remove);
  portfolioRoutes.get('/:portfolioId', validate(validation.portfolio.get), portfolioController.fetch);
  portfolioRoutes.get('/', portfolioController.fetchAll);

  return portfolioRoutes;
};

export default initPortfolioRoutes;
