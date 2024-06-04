const bcrypt = require('bcryptjs');
const db = require('./database/config');

(async () => {
  try {
    const pw = 'admin';
    const hashPw = await bcrypt.hash(pw, 10);
    const admin = await db.User.create({
      userName: 'admin',
      email: 'henijey@gmail.com',
      password: hashPw,
      role: 'admin',
    });
    console.log('admin created:', admin);
  } catch (error) {
    console.error('error:', error);
  }
})();
