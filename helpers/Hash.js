const { createHash } = require("crypto");

//Password Security
function hash(password) {
  return createHash("sha256").update(password).digest("hex");
}

exports.hash = hash;
