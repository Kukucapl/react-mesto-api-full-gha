const Card = require('../models/card');
const BadRequest = require('../data/badrequest');
const NotFound = require('../data/notfound');
const Forbidden = require('../data/forbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка не найдена'));
      } else if (card.owner.toString() !== req.user._id) {
        next(new Forbidden('Ошибка доступа'));
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then((findedcard) => {
            res.status(200).send({ data: findedcard });
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Ошибка в id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFound('Передан несуществующий _id карточки'));
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Ошибка в id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFound('Передан несуществующий _id карточки'));
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Ошибка в id карточки'));
      } else {
        next(err);
      }
    });
};
