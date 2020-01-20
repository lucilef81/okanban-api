const { List } = require('../models/relations');

const ListController = {
    getAllLists: async (request, response) => {
        try {
            let lists = await List.findAll();
            response.json(lists);
        } catch (error) {
            console.error(error);
            response.status(500).json(error);
        }
    },
};

module.exports = ListController;