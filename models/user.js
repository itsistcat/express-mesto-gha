const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'Имя должно быть длиной от 2 до 30 символов',
      },
      required: true,
    },

    about: {
      type: String,
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'Информация должна быть длиной от 2 до 30 символов',
      },
      required: true,
    },

    avatar: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
