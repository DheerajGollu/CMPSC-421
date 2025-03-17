const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - userName
 *         - password
 *         - address
 *         - addressType
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         userName:
 *           type: string
 *         password:
 *           type: string
 *         address:
 *           type: string
 *         addressType:
 *           type: string
 *       example:
 *         id: "123456"
 *         firstName: "John"
 *         lastName: "Doe"
 *         userName: "johndoe"
 *         password: "securepassword"
 *         address: "123 Main St"
 *         addressType: "Home"
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of customers
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Successfully created customer
 *       400:
 *         description: Invalid data
 */

/**
 * @swagger
 * /customers/{id}:
 *   patch:
 *     summary: Update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Successfully updated customer
 *       400:
 *         description: Invalid data
 */

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The customer ID
 *     responses:
 *       200:
 *         description: Successfully deleted customer
 *       400:
 *         description: Invalid data
 */


// Create a new customer
router.post('/', async (req, res) => {
  try {

    const username = req.body.userName;

    const customer = await Customer.findOne({userName: username});

    if (customer)
        return res.status(400).json({ error: `Username '${username}' already exists.` });

    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a customer
router.patch('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an customer
router.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;