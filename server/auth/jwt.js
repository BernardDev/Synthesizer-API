const jwt = require('jsonwebtoken');

const {Admin} = require('../models');

const verifyToken = async function (req, res, next) {
  try {
    const authFull = req.headers.authorization;
    if (!authFull) {
      return res.status(401).json({message: 'Please send a token'});
    }
    const authSplit = authFull.split(' ');
    console.log(`authSplit`, authSplit);
    if (authSplit[0] !== 'Bearer') {
      return res.status(401).json({message: 'Please send a Bearer token'});
    }
    if (!authSplit[1]) {
      return res.status(401).json({message: 'Please send a token part 2'});
    }
    const data = jwt.verify(authSplit[1], process.env.PRIVATE_KEY);
    const admin = await Admin.findOne({
      where: {id: data.adminId, isAdmin: true},
    });
    if (!admin) {
      return res.status(403).json({message: 'You have no admin rights yet'});
    }
    next();
  } catch (error) {
    if (error.message === 'jwt malformed') {
      return res.status(401).json({message: 'Token invalid'});
    }
    res.status(500).json({message: 'Something went wrong'});
    console.log(`error`, error);
  }
};

module.exports = {verifyToken};
