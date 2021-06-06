const express = require('express');
const SERVER_KEY = process.env.SERVER_KEY

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next
 */
const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if(token !== SERVER_KEY) {
    res.sendStatus(401);
  }
  next();
}

module.exports = auth;