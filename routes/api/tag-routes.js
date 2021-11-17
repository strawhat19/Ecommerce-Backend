const router = require(`express`).Router();
const {Tag,Product,ProductTag} = require(`../../models`);

router.get(`/`, async (req, res) => {
	await Tag.findAll({
			attributes: [`id`, `tag_name`],
			include: [{
				model: Product,
				attributes: [`id`, `product_name`, `price`, `stock`, `category_id`],
				through: `ProductTag`,
			}, ],
		})
		.then((parsedTagData) => {
			res.json(parsedTagData);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.get(`/:id`, (req, res) => {
	Tag.findByPk(req.params.id, {
			include: [{
				model: Product,
				attributes: [`id`, `product_name`, `price`, `stock`, `category_id`],
				through: `ProductTag`,
			}],
		})
		.then((retrievedTag) => {
			res.json(retrievedTag);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.post(`/`, (req, res) => {
	Tag.create({
			tag_name: req.body.tag_name,
		})
		.then((tag) => {
			res.json(tag);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.put(`/:id`, (req, res) => {
	Tag.update({
			tag_name: req.body.tag_name,
		},{
			where: {
				id: req.params.id,
			},
		})
		.then((tag) => {
			res.json(tag);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.delete(`/:id`, (req, res) => {
	Tag.destroy({
			where: {
				id: req.params.id,
			},
		})
		.then((qtyRemoved) => {
			res.json(`${qtyRemoved} tag were removed from the database`);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;