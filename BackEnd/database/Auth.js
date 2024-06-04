const jwt = require('jsonwebtoken');
const db = require('./config');
const bcrypt = require('bcryptjs');
const logger = require('../utiles/logger');

const signUp = async (req, res) => {
  const { userName, email, password, role, address,CIN } = req.body;
  try {
    // hash the password using bcrypt with a salt rounds value of 12
    const hashedPw = await bcrypt.hash(password, 12);
    // create a new user in the database with the hashed password and default role of user
    const newUser = await db.User.create({
      userName: userName,
      email: email,
      password: hashedPw,
      role: role,
      address:address,
      CIN: role === 'Seller' ? CIN : null,
    });
    // GEnerate Token
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      'your-jwt-secrets'
    );
    const obj = { data: newUser, token };
    res.status(201).json(obj);
    logger.info(`registered User: ${newUser.email}`);
  } catch (error) {
    logger.error(`error registering user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // find a user in the database with the provided userName and role
    const user = await db.User.findOne({ where: { email } });
    // if the user is not found we respond with a 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // now we compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // if the password is wrong we return 401 error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // create a JWT token with the user's id, userName, and role, and sign it with a secret key
    const token = jwt.sign(
      { id: user.id, role: user.role },
      'your-jwt-secrets',
      { expiresIn: '90d' }
    );
    const obj2 = { data: user, token }; 
    return res.status(200).json(obj2);
  } catch (error) {
    logger.error(`error logging in user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signUp, logIn };
