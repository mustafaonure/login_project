const User = require("../models/User");
const { hash } = require("../helpers/Hash");

exports.postSignup = async (req, res, next) => {
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
exports.postLogin = async (req, res, next) => {
  //getting user data from request body
  const { tc, password } = req.body;
  try {
    const user = new User({ tc, password });
    const result = await user.loginUser();
    if (result.length > 0) {
      if (result[0].password_hash == hash(user.password)) {
        res.redirect("/dashboard");
      } else {
        res.send("Şifreniz yanlış!");
      }
    } else {
      res.send("Böyle bir kullanıcı bulunmamaktadır!");
    }
  } catch (error) {
    const errorToThrow = new Error();
    // switch (error?.code) {
    //   case "23505":
    //     errorToThrow.message = "User already exists";
    //     errorToThrow.statusCode = 403;
    //     break;
    //   default:
    //     errorToThrow.statusCode = 500;
    // }
    //pass error to next()
    next(errorToThrow);
  }
};
