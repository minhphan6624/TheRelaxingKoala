const express = require('express');
const router = express.Router();

//Mock orders
let orders = [
    {
        id: 1,
        item: "Apple",
        price: 0.99,
        quantity: 5,
        notes: "No sugar",
        status: "Pending"
    },
    {
        id: 2,
        item: "Banana",
        price: 0.5,
        quantity: 3,
        notes: "Ripe",
        status: "Pending"
    },
    {
        id: 3,
        item: "Orange",
        price: 0.75,
        quantity: 2,
        notes: "Seedless",
        status: "Pending"
    },
    {
        id: 4,
        item: "Grapes",
        price: 1.5,
        quantity: 1,
        notes: "Green",
        status: "Pending"
    },
    {
        id: 5,
        item: "Watermelon",
        price: 3.99,
        quantity: 1,
        notes: "Large",
        status: "Pending"
    }
];

//GET all orders
router.get('/', (req, res) => {
    res.status(200).json(orders);
});

//GET order by ID
router.get("/:id" ,(req, res) => {
    const {id} = req.params;

    const order = orders.find(order => order.id === parseInt(id));

    res.status(200).json(order);
});

//POST to make an order
router.post("/", (req, res) => {
    const order = {
        id: orders.length + 1,
        item: req.body.item,
        price: req.body.price,
        quantity: req.body.quantity,
        notes: req.body.notes,
        status: "Pending"
    };

    orders.push(order);

    res.status(201).json(order);
});

//PUT to update an order
router.put("/:id", (req, res) => {
    const {id} = req.params;
    const index = orders.findIndex(order => order.id === parseInt(id));

    if (index !== -1){
        orders[index] = {id: parseInt(id), ...req.body};
        res.status(200).json(orders[index]);
    }
    else{
        res.status(404).json({message: `Order with ID ${id} not found`});
    }
});

//DELETE to cancel an order
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const index = orders.findIndex(order => order.id === parseInt(id));

    if (index !== -1){
        const deletedOrder = orders.splice(index, 1);
        res.json(deletedOrder); //Return the deleted order
    }
    else{
        res.status(404).json({message: `Order with ID ${id} not found`});
    }
});

module.exports = router;