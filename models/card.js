const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new Schema(
  {
    name: {
      type: String,
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'Имя должно быть длиной от 2 до 30 символов',
      },
      required: true,
    },

    link: {
      type: String,
      required: true,
    },

    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },

    likes: [{
      type: ObjectId,
      ref: 'user',
      default: [],
    }],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
