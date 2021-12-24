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
    name: { type: String, required: true},
    adress: { type: String, required: true},
    gouvernerat: { type: String, required: true},
    codePostal: { type: Number, required: true},
    date :{type: Date, required: true},
    phone: { type: Number, required: true },
    email: { type: String, required: true},
    status: {
      type: String,
      enum: ["new", "no response", "waiting payment","passed" ,"received"],
      default: "new",
    },
});

module.exports = Order = model("order", orderSchema);