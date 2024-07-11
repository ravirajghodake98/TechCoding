const mongoose = require("mongoose");
const validator = require("validator");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, "A course must have a name."],
    unique: true,
    trim: true,
    maxlength: [40, "A course must have less than or equal to 40 characters."],
    minlength: [5, "A course must have more than or equal to 5 characters."],
  },
  duration: {
    type: Number,
    required: [true, "A course must have a duration."],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A course must have a price."],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: "Discount price should be less than real price.",
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A course must have a summary."],
  },
  description: {
    type: String,
    trim: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
