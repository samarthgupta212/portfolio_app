# portfolio_app

# Using PostgresDB with Nodejs

# Stock Routes
  POST /api/stock => Expected body = {name, ticker} => Creates Stock
  GET /api/stock => Returns all stocks

# Trade Routes
  POST /api/trade => Expected body = {price, qty, stockId, type}  where type = "BUY" or "SELL" => Creates trade

# Portfolio Routes
  PUT /api/portfolio/:portfolioId =>  Expected params = (portfolioId = int), Expected body =  { price, qty, type } where type = "BUY" or "SELL" => Updates Portfolio by creating trade
  GET /api/portfolio => Gets all stocks with avgBuyPrice in portfolio
  GET /api/portfolio/:portfolioId => Expected params = (portfolioId = int) => Returns all trades for given portfolio
  GET /api/portfolio/returns => Returns for given portfolio
  DELETE /api/portfolio/:portfolioId => Expected params = (portfolioId = int),  Expected Body = {price} => Sells all the stocks
    for given portfolio
