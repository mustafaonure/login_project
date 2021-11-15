const db = require('../db');

//User constructor

function User({
    name,
    surname,
    tc,
    password
}) {
    this.name = name;
    this.surname = surname;
    this.tc = tc ;
    this.password = password;
};

// add a createUser method to the prototype
User.prototype.createUser = async function() {
    try {
        const { rows } = await db.query(
            `INSERT INTO users(name, surname, tc, password) 
            VALUES ($1, $2, $3, $4)`,
            [this.name, this.surname, this.tc, this.password]
        );
        return rows; 
    } catch (error) {
        throw error;
    }
};
User.prototype.loginUser = (request, response) => {
    const userReq = request.body
    let user
  
    findUser(userReq)
      .then(foundUser => {
        user = foundUser
        return checkPassword(userReq.password, foundUser)
      })
      .then((res) => createToken())
      .then(token => updateUserToken(token, user))
      .then(() => {
        delete user.password_digest
        response.status(200).json(user)
      })
      .catch((err) => console.error(err))
  }
module.exports = User;
