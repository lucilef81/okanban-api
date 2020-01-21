const { Card, Tag } = require('../models/relations');

const TagController = {
    // route : GET /tags
    getAllTags: async (req, res) => {
        try {
            const tags = await Tag.findAll();
            res.json(tags);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // route : POST /tags
    createTag: async (req, res) => {
        try {
            const {title, color} = req.body;
            let bodyErrors = [];
            if (!title) {
                bodyErrors.push('title can not be empty');
            }
            if(!color) {
                bodyErrors.push('color can not be empty');
            }

            if(bodyErrors.length) {
                res.status(400).json(bodyErrors);
            } else {
                let newTag = new Tag();
                newTag.title = title;
                newTag.color = color;
                await newTag.save();
                res.json(newTag);
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }, 
    // route : PATCH /tags/:id
    editTag: async (req, res) => {
        try {
            const tagId = req.params.id;
            const {title, color} = req.body;

            let tag = await Tag.findByPk(tagId);
            if (!tag) {
                res.status(404).json('Can not find tag with id '+tagId);
            } else {
                if (title) {
                    tag.title = title;
                }
                if (color) {
                    tag.color = color;
                }
                await tag.save();
                res.json(tag);
            }

        } catch (error) {
            res.status(500).json(error);
        }
    },
    // route : DELETE /tags/:id
    deleteTag: async (req, res) => {
        try {
            const tagId = req.params.id;
            let tag = await Tag.findByPk(tagId);
            if (!tag) {
                res.status(404).json('Can not find tag with id '+tagId);
            } else {
                await tag.destroy();
                res.json('OK');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // route : POST /cards/:id/tags
    associateTagToCard: async (request, response) => {
        try {
            // les 2 infos utiles ne se trouvent pas au même endroit
            const cardId = request.params.id;
            const tagId = request.body.tagId;

            // NTUI
            const bodyErrors = [];
            if (!tagId) {
                bodyErrors.push(`the tagId parameter is missing`);
            }

            if (bodyErrors.length) {
                // si la requête ne contient pas toutes les infos demandées
                response.status(400).json(bodyErrors);
            } else {

                // on va chercher la carte
                let card = await Card.findByPk(cardId, {
                    // on inclut les tags car si tout se passe bien, on retournera la carte en guise de réponse (et on verra donc le nouveau tag ajouté)
                    include: ['tags']
                });

                if (!card) {
                    response.status(404).json(`Cant find a card with the id ${cardId}`);
                } else {
                    // ici, tout va bien, j'ai ma carte, on peut continuer
                    const tag = await Tag.findByPk(tagId);

                    if (!tag) {
                        response.status(404).json(`Cant find a tag with the id ${tagId}`);
                    } else {

                        // la card existe, le tag existe, yapluka
                        await card.addTag(tag);

                        // en attendant que Sequelize corrige ce "manque", on peut lier manuellement l'objet tag à notre objet card
                        card.tags.push(tag);

                        // comme ça, on retourne une card à jour
                        response.json(card);
                    }
                }

            }
        } catch (error) {
            response.status(500).json(error);
        }
    },
    // route : DELETE /cards/:card_id/tag/:tag_id
    deleteTagFromCard: async (request, response) => {
        try {
            const cardId = request.params.card_id;
            const tagId = request.params.tag_id;

            const card = await Card.findByPk(cardId);

            if (!card) {
                response.status(404).json(`Cant find a card with the id ${cardId}`);
            } else {
                // ici, tout va bien, j'ai ma carte, on peut continuer
                const tag = await Tag.findByPk(tagId);

                if (!tag) {
                    response.status(404).json(`Cant find a tag with the id ${tagId}`);
                } else {
                    await card.removeTag(tag);

                    response.json('OK');
                }
            }
        } catch (error) {
            response.status(500).json(error);
        }
    }
};

module.exports = TagController;