const { Card } = require('../models/relations');

const CardController = {
    // route : GET /lists/:id/cards
    getCardsByList: async (request, response) => {
        try {
            const listId = request.params.id;

            // solution 1 : récupérer la liste concernée, mais ne garder que les cartes

            // solution 2 : récupérer les cartes en filtrant sur list_id (on va garder celle-ci)
            let cards = await Card.findAll({
                where: {
                    list_id: listId
                },
                include: ['tags']
            });

            if (cards) {
                response.json(cards);
            } else {
                response.status(404).json(`No cards with this list id ${listId}`);
            }
        } catch (error) {
            response.status(500).json(error);
        }
    },
    // route : GET /cards/:id
    getCard: async (request, response) => {
        try {
            const cardId = request.params.id;

            let card = await Card.findByPk(cardId, {
                include: ['tags']
            });

            if (card) {
                response.json(card);
            } else {
                response.status(404).json(`Cant find a card with the id ${cardId}`);
            }
        } catch (error) {
            response.status(500).json(error);
        }
    },
    // route : POST /cards
    createCard: async (request, response) => {
        try {
            // extraction des données "utiles" du corps de la requête
            // let et pas const parce que je vais éventuellement retoucher le format de color (et si elle est const, je pourrai pas)
            let {title, color, position, listId} = request.body;

            // NTUI
            const bodyErrors = [];
            if (!title) {
                bodyErrors.push(`the title parameter is missing`);
            }
            if (!position) {
                bodyErrors.push(`the position parameter is missing`);
            }
            if (!listId) {
                bodyErrors.push(`the listId parameter is missing`);
            }

            console.log(`avant vérif : ${color}`)

            // si l'utilisateur n'envoie pas directement un nombre
            if (color && isNaN(parseInt(color))) {
                // on va partir du principe que c'est une couleur CSS (# + 6 hex)
                color = parseInt(color.substr(1), 16);
            }

            console.log(`après vérif : ${color}`);

            if (bodyErrors.length) {
                response.status(400).json(bodyErrors);
            } else {
                // solution alternative : Card.create({props});

                // tout va bien, on peut continuer
                const newCard = new Card();
                newCard.title = title;
                newCard.color = color;
                newCard.position = position;
                newCard.list_id = listId;

                await newCard.save();
                response.json(newCard);
            }

        } catch (error) {
            response.status(500).json(error);
        }
    },
    // route PATCH /cards/:id
    editCard: async (request, response) => {
        try {
            const cardId = request.params.id;
            const {title, color, list_id} = request.body;
      
            // on inclue les tags pour pouvoir les renvoyer à la fin de l'update
            let card = await Card.findByPk(cardId,{
                include: ['tags']
            });
            if (!card) {
                response.status(404).json(`Cant find card with id ${cardId}`);
            } else {
                // on ne change que les paramètres envoyés
                if (title) {
                    card.title = title;
                }
                if (list_id) {
                    card.list_id = list_id;
                }
                if (color) {
                    card.color = color;
                }
                await card.save();
                response.json(card);
            }
      
        } catch (error) {
            response.status(500).json(error);
        }
    },
    // route DELETE /cards/:id
    deleteCard: async (request, response) => {
        try {
            const cardId = request.params.id;
            let card = await Card.findByPk(cardId);
            if (!card) {
                response.status(404).json(`Cant find card with id ${cardId}`);
            } else {
                await card.destroy();
                response.json('ok');
            }
      
        } catch (error) {
            response.status(500).json(error);
        }
    }
}

module.exports = CardController;