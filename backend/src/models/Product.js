// models/Product.js
const { default: mongoose, Schema } = require("mongoose");

const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    maxLength: 30,
  },
  description: String,
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  exercisePart: {
    type: String,
    required: true,
  },
  exerciseTime: {
    type: Number,
    required: true,
  },
  satisfaction: {
    type: Number,
    required: true,
  },
  memo: {
    type: String,
    default: "",
  },
  x: {
    type: Number,
    default: Math.random() * 100,
  },
  y: {
    type: Number,
    default: Math.random() * 100,
  },
  rotate: {
    type: Number,
    default: Math.random() * 360,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
