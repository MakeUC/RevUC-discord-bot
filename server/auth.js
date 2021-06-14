const express = require('express')
const SERVER_KEY = process.env.SERVER_KEY

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (token !== SERVER_KEY) {
      throw 401;
    }
    next()
  } catch (err) {
    res.sendStatus(401);
  }
}

module.exports = auth
