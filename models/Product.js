const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const productSchema = new Schema({

  productName: { type: String},
  categorie: { type: String },
  price: { type: String },
  description:{type: String},
  link:{type: String},
  images:{type: Array},

});

module.exports = Product = model("product", productSchema);