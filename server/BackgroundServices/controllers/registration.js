const ejs = require("ejs");

const db = require("../database");
const { sendMail } = require("../helpers/email");

module.exports = {
  run: async () => {
    const items = await db.query(
      "SELECT * from dbo.registrationQueue where active = 1"
    );

    for (let item of items.recordset) {
      let user = await db.query(
        "SELECT * from dbo.users where _id = '" + item.user_id + "'"
      );
      user = user.recordset[0];
      ejs.renderFile(
        "templates/registerEmail.ejs",
        { name: user.first, email: user.email, password: "password" },
        async (err, data) => {
          if (err) return console.log(err);
          const message = {
            from: {
              name: "User System",
              address: process.env.FROM_EMAIL,
            },
            to: user.email,
            subject: "Registration Success",
            html: data,
          };
          try {
            if (item.active) {
              await sendMail(message);
              await db.query(
                "UPDATE dbo.registrationQueue set active = 0 where id = '" +
                  item.id +
                  "'"
              );
              console.log(`Registration Email sent to ${user.email}`);
            }
          } catch (error) {
            console.log(error.message);
            console.log(`Couldn't send email to ${user.email}`);
          }
        }
      );
    }
  },
};
