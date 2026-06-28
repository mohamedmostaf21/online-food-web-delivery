const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { authMiddleware } = require('../middleware/auth');

// Create order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, deliveryAddress, specialInstructions, paymentDetails } = req.body;

    if (!items?.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = new Order({
      userId: req.userId,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'online' ? 'completed' : 'pending',
      deliveryAddress: deliveryAddress || 'Address not provided',
      specialInstructions,
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60000), // 30 minutes from now
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get user orders
router.get('/user/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get order by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    
    // Check if user owns this order or is admin
    if (order.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Update order status (Admin only)
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
});

// Cancel order
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (order.orderStatus !== 'placed' && order.orderStatus !== 'preparing') {
      return res.status(400).json({ message: 'Cannot cancel this order' });
    }

    order.orderStatus = 'cancelled';
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order' });
  }
});

module.exports = router;
