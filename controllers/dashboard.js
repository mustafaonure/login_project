const User = require("../models/User");
const { hash } = require("../helpers/Hash");

exports.postDashboard = async (req, res, next) => {
  //getting user data from request body
  const { name, surname, tc, password } = req.body;
  try {
    const user = new User({ name, surname, tc, password });
    const result = await user.createUser();
    // res.send(user);
    res.redirect("/users/login");
  } catch (error) {
    const errorToThrow = new Error();
    // switch (error.code) {
    //   case "23505":
    //     errorToThrow.message = "User already exists";
    //     errorToThrow.statusCode = 403;
    //     break;
    //   default:
    //     errorToThrow.statusCode = 500;
    // }
    // //pass error to next()
    next(errorToThrow);
  }
};
