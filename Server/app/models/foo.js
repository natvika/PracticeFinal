var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;

var FooSchema = new Schema({
  foo: { type: String },
  woo: { type: String, enum: ['boo', 'zoo', 'moo'] }
});

module.exports = Mongoose.model("Foo", FooSchema);