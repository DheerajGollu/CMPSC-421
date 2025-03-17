const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Item = require('../models/item');


/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customer_id
 *         - items
 *       properties:
 *         id:
 *           type: string
 *         customer_id:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *             properties:
 *               item_id:
 *                 type: string
 *               name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *         totalPrice:
 *           type: number
 *       example:
 *         id: "987654321"
 *         customer_id: "123456"
 *         items: [{ "item_id": "324253", "name": "Laptop", "quantity": 2 }]
 *         totalPrice: 2400
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create an order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Successfully created order
 *       400:
 *         description: Invalid data
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Successfully deleted order
 *       400:
 *         description: Invalid data
 */

/**
 * @swagger
 * /orders{id}/process:
 *   put:
 *     summary: Process an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Successfully processed order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /orders{id}/cancel:
 *   put:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Successfully cancelled order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Inernal server error
 */


// Create a new order
router.post('/', async (req, res) => {
  try {

    const items = req.body.items;
    const customer_id = req.body.customer_id;

    let total_price = 0;
    let processed_items = [];

    for (let item of items) {

        const product = await Item.findOne({name: item.name});

        if (!product)
            return res.status(400).json({ error: `Item '${item.name}' not found.` });

        total_price += product.price * item.quantity;

        processed_items.push({itemId: product.id, name: item.name, quantity: item.quantity});
    }

    const newOrder = new Order({
        customer_id: customer_id,
        items: processed_items,
        totalPrice: total_price
    });
  
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Process order
router.put("/:id/process", async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ error: "Order not found" });
  
      setTimeout(async () => {
        order.status = "Completed";
        await order.save();
        res.json({ message: "Order processed", order });
      }, 5000); // Simulated delay
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


// Cancel order
router.put("/:id/cancel", async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ error: "Order not found" });
  
      setTimeout(async () => {
        order.status = "Cancelled";
        await order.save();
        res.json({ message: `Order '${order.id}' cancelled`, order });
      }, 5000); // Simulated delay
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;