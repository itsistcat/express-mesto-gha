const Card = require('../models/card');

const {
  ERROR_DATA,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER,
} = require('../errors/errors');

function getCards(req, res) {
  Card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'На сервере ошибка' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  const { _id: userId } = req.user;
  Card
    .create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((err) => (
      err.name === 'ValidationError'
        ? res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' })
        : res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере ошибка' })
    ));
}

function likeCard(req, res) {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  Card
    .findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    )
    .then((card) => {
      if (card) return res.send({ data: card });
      return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере ошибка' });
    });
}

function dislikeCard(req, res) {
  const { cardId } = req.params;
  const { _id: userId } = req.user;
  Card
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    )
    .then((card) => {
      if (card) return res.send({ data: card });
      return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(ERROR_DATA).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере ошибка' });
    });
}

function deleteCard(req, res) {
  const { id } = req.params;
  Card
    .findByIdAndRemove(id)
    .then((card) => {
      if (card) return res.send({ data: card });
      return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => (
      err.name === 'CastError'
        ? res.status(ERROR_DATA).send({ message: 'Передан некорректный id' })
        : res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере ошибка' })
    ));
}
module.exports = {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
