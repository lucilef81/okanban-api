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

            response.json(cards);
        } catch (error) {
            response.status(500).json(error);
        }
    }
}

module.exports = CardController;