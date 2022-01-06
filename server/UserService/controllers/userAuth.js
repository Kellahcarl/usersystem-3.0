const db = require("../database");
const {
  validateRegisterUser,
  validateLoginUser,
  validateUserId,
  validateEmail,
  validateUpdate,
} = require("../helpers/validator");
const { hashPass, comparePass } = require("../helpers/hashPass");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const generateToken = require("../helpers/tokenGenerator");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { error } = validateRegisterUser(req.body);
      if (error)
        return res
          .status(400)
          .send({ success: false, message: error.details[0].message });

      const { recordset } = await db.exec("sp_getUserByEmail", {
        email: req.body.email,
      });

      const user = recordset[0];
      if (user)
        return res
          .status(404)
          .send({ message: "Account exists with the given email" });

      password = hashPass(req.body.password);

      const { firstname, email, lastname, isAdmin } = req.body;
      const id = uuidv4();

      const admin = isAdmin ? 1 : 0;

      await db.exec("sp_userRegister", {
        id,
        firstname,
        lastname,
        password,
        email,
        isAdmin: admin,
        isDeleted: 0,
      });
      await db.query(
        "INSERT INTO dbo.registrationQueue (user_id, active) VALUES ('" +
          id +
          "', 1)"
      );

      res.send({ message: "User registered successfully" });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .send({ error: error.message, message: "Internal Server Error" });
    }
  },
  loginUser: async (req, res) => {
    const { error } = validateLoginUser(req.body);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const { email, password } = req.body;

    const { recordset } = await db.exec("sp_getUserByEmail", { email });

    const user = recordset[0];

    if (!user)
      return res.status(404).send({ message: "Account does not exist" });

    const validPassword = comparePass(password, user.password);
    if (!validPassword)
      return res.status(404).send({ message: "Invalid email or password" });

    const token = generateToken(user.email, user._id, user.isAdmin);
    res.send({
      user: _.pick(user, ["_id", "first", "last", "email", "isAdmin"]),
      token,
    });
  },

  resetPassword: async (req, res) => {
    try {
      const { error } = validateUserId(req.body);

      if (error)
        return res
          .status(400)
          .send({ success: false, message: error.details[0] });

      const userResult = await db.exec("sp_getUser", {
        userId: req.body.userId,
      });

      if (!userResult.recordset[0])
        return res.status(400).send({ message: "invalid userId provided" });

      const password = hashPass(req.body.password);

      res.send({ message: "Password Updated Successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
      console.log(error);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { error } = validateEmail(req.body);

      if (error)
        return res
          .status(400)
          .send({ success: false, message: error.details[0].message });

      const { recordset } = await db.exec("sp_getUserByEmail", {
        email: req.body.email,
      });

      const user = recordset[0];
      if (!user)
        return res.status(400).send({ message: "Email does not exist" });

      await db.exec("sp_AddUserToReset", {
        userId: user._id,
      });

      res.send({ message: "Check your email for the reset password link" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { error } = validateUpdate(req.body);

      if (error)
        return res
          .status(400)
          .send({ success: false, message: error.details[0].message });
      const { firstname, lastname, email, id } = req.body;

      await db.exec("sp_updateUser", {
        firstname,
        lastname,
        email,
        id,
      });
      res.status(201).send({ message: "User Updated Successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ error: error.message, message: "Internal Sever Error" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { email } = req.body;
      const { recordset } = await db.exec("sp_getIsDeleted", { email });

      const user = recordset[0];

      if (!user) {
        return res.status(404).send({ message: "Account does not exist" });
      }
      if (user.isDeleted) {
        return res.status(404).send({ message: "Account already deleted" });
      }

      await db.exec("sp_deleteUser", {
        id: user._id,
      });
      res.status(201).send({ message: "User deleted Successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ error: error.message, message: "Internal Sever Error" });
    }
  },
};
