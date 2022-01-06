const db = require("../database");
const { sendMail } = require("../helpers/email");

module.exports = async () => {
  const items = await (
    await db.query("SELECT * from dbo.taskAssignQueue where active = 1")
  ).recordset;

  for (let item of items) {
    const user = await (
      await db.query(
        "SELECT * from dbo.users where _id = '" + item.user_id + "'"
      )
    ).recordset[0];
    const task = await (
      await db.query(
        "SELECT * from dbo.tasks where _id = '" + item.task_id + "'"
      )
    ).recordset[0];
    const ejs = require("ejs");
    ejs.renderFile(
      "templates/taskEmail.ejs",
      {
        name: user.first,
        email: user.email,
        tid: task._id,
      },
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
          await sendMail(message);
          await db.query(
            "UPDATE dbo.registrationQueue set active = 0 where id = '" +
              item.id +
              "'"
          );
          console.log("Email sent");
        } catch (error) {
          console.log(error.message);
        }
      }
    );
  }
};
