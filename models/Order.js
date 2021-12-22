const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const orderSchema = new Schema({
  id_product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
    orderNumber:{type: Number, default : function() {
      return Math.floor(Math.random()*9000000) + 1000000
    }},
    name: { type: String},
    adress: { type: String},
    gouvernerat: { type: String},
    codePostal: { type: Number},
    date :{type: Date},
    phone: { type: Number },
    email: { type: String},
    status: {
      type: String,
      enum: ["new", "no response ", "waiting payment","passed" ,"received"],
      default: "new",
    },
});

module.exports = Order = model("order", orderSchema);