// REGISTER
import User from "../Models/Client.js";
import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import Order from "../Models/OrderModel.js";


const clientRouter = express.Router();


//avoid cors error
clientRouter.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
        );
        next();
    }
);



clientRouter.post(
    "/",
    asyncHandler(async (req, res) => {
        const { name, email, password,address,city,postalCode,country,phone } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const user = await User.create({
            name,
            email,
            password,
            address,
            city,
            postalCode,
            country,
            phone
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                city: user.city,
                postalCode: user.postalCode,
                country: user.country,

            });
        } else {
            res.status(400);
            throw new Error("Invalid User Data");
        }
    })
);

//get all clients and return ordred by the newest first
clientRouter.get(
    "/",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const clients = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(clients);
    }
    )
);



//get client by email
clientRouter.get(
    "/:email",
protect,
admin,

    asyncHandler(async (req, res) => {
        const client = await User.findOne({ email: req.params.email });
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404);
        }
    }
    )
);


//get client by id
clientRouter.get(
    "/getById/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const client = await User.findById(req.params.id);
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404);
        }
    }
    )
);


//edit client
clientRouter.put(
    "/editById/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, email, password,address,city,postalCode,country,phone } = req.body;
        const client = await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password,
            address,
            city,
            postalCode,
            country,
            phone
        });
        if (client) {
            res.status(200).json(client);
        }
        else {
            res.status(404);
        }
    }
    )
);

//delete client if he has no orders
clientRouter.delete(
    "/deleteById/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
            console.log(req.params.id);
        const client = await User.findById(req.params.id);
            console.log(client);
        if (client) {
            const orders = await Order.find({ user: client._id });
            // console.log(orders);
            if (orders.length === 0) {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: "Client deleted successfully" });
            }
            else {
                res.status(400).json({ message: "Client Has Orders  You Can't Delete It" });
            }
}
        else {
            res.status(404);
        }
    }
    )
);







export default clientRouter;
