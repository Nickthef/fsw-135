const express = require('express');
const inventoryRouter = express.Router();
const uuid = require("uuid");
const id = uuid.v4();
const Inventory = require("../models/issue");

inventoryRouter.get("/", (req, res, next) => {
    Inventory.find((err, items) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(items);
    })
});

inventoryRouter.get("/:itemId", (req, res, next) => {
    const itemId = req.params.itemId;
    Inventory.findOne(
        {_id: itemId},
        (err, foundItem) => {
        if (err) {
            const error = new Error(`The item with id ${itemId} was not found.`)
                return next(error)
        }
        return res.status(200).send(foundItem);
    })
});


inventoryRouter.post('/', (req, res, next) => {
    const newInventoryItem = new Inventory(req.body)
    newInventoryItem.save((err, savedInventory) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedInventory)
    })
})


inventoryRouter.put('/:inventoryItemId', (req, res, next) => {
    Inventory.findOneAndUpdate(
        { _id: req.params.inventoryItemId },
        req.body,
        { new: true },
        (err, updatedInventoryItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedInventoryItem)
        }
    )
})


inventoryRouter.delete('/:inventoryItemId', (req, res, next) => {
    Inventory.findOneAndDelete({ _id: req.params.inventoryItemId }, (err, deletedItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.item_name} from the database.`)
    })
})

module.exports = inventoryRouter;

