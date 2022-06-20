import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";

const orderRouter = express.Router();

// CREATE ORDER
orderRouter.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
          console.log(req.body);
    const order = await Order.create(req.body);
    res.status(201).json({
        success: true,
        data: order,
        message: "Order created successfully",
    }
    ).  catch (err => {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
    );
    }
    )
);

// ADMIN GET ALL ORDERS
orderRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({})
      .sort({ _id: -1 })
      .populate("user", "id name email").populate("seller", "id name email");
    res.json(orders);
  })
);
// USER LOGIN ORDERS
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(order);
  })
);

// GET ORDER BY ID
orderRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// ORDER IS PAID
orderRouter.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// ORDER IS Delivered
orderRouter.put(
  "/:id/delivered",
  protect,
  asyncHandler(async (req, res) => {
      console.log(req.body);
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);


//order is shipped
orderRouter.put(
    "/:id/ship",
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isShipped = true;
            order.shippedAt = Date.now();
            const updatedOrder = await order.save();
            res.json(updatedOrder);

        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
}
)
);


//delete order
orderRouter.delete(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {
            console.log(req.params.id);
        const order = await Order.findById(req.params.id);

        if (order) {
            await order.remove();
            res.json({
                success: true,
                message: "Order deleted successfully",
            });
}
    else {
        res.status(404);
        throw new Error("Order Not Found");
        }
    }
    )
);




export default orderRouter;

