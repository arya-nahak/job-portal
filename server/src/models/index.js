const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = [];

db.mongoose = mongoose;

db.role = require("./role.model");
db.user = require("./users.model");

db.ROLES = ["applicant", "recruiter", "moderator"];

module.exports = db;
