const bcrypt = require("bcrypt");

module.exports = {
  hashPass: async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    return hashpassword;
  },
  comparePass: async (inputPass, dbPass) => {
    const validPass = await bcrypt.compare(inputPass, dbPass);
    return validPass;
  },
};
