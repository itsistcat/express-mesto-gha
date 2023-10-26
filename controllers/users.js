const User = require('../models/user');

const {
  ERROR_DATA,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../errors/errors');

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => (
      err.name === 'ValidationError'
        ? res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' })
        : res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере ошибка' })
    ));
}

function getUsersInfo(req, res) {
  User
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере ошибка' }));
}

function getUserInfo(req, res) {
  const { id } = req.params;
  User
    .findById(id)
    .then((user) => {
      if (user) return res.send({ data: user });
      return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => (
      err.name === 'CastError'
        ? res.status(ERROR_DATA).send({ message: 'некорректный id' })
        : res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере ошибка' })
    ));
}

function setUserInfo(req, res) {
  const { name, about } = req.body;
  const { _id: userId } = req.user;
  User
    .findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (user) return res.send({ data: user });
      return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере ошибка' });
    });
}

function setUserAvatar(req, res) {
  const { avatar } = req.body;
  const { _id: userId } = req.user;
  User
    .findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (user) return res.send({ data: user });
      return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере ошибка' });
    });
}

module.exports = {
  createUser,
  getUsersInfo,
  getUserInfo,
  setUserInfo,
  setUserAvatar,
};
