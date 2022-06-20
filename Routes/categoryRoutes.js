import User from "../Models/Client.js";
import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import Category from "../Models/CategoryModel.js";
import Product from "../Models/ProductModel.js";



const categoryRouter = express.Router();

//add category
categoryRouter.post(
    "/",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, description } = req.body;

        const category = await Category.create({
            name,
            description
        });

        if (category) {
            res.status(201).json({
                _id: category._id,
                name: category.name,
                description: category.description,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            });
        } else {
            res.status(400);
            throw new Error("Category not created");
        }
    }
    )
);

//get all categories
categoryRouter.get(
    "/",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const categories = await Category.find();
        res.status(200).json(categories);
    }
    )
);





//delete category if category is not associated with any product
categoryRouter.delete(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if (category) {
           //check if category is associated with any product
            const products = await Product.find({ category: category._id });

            if (products.length === 0) {
                await category.remove();
                res.status(200).json({
                    message: "Category deleted successfully",
                });
            } else {
                res.status(400).json({
                    message: "Category is associated with products",
                });
            }
        } else {
            res.status(400).json({
                message: "Category not found",
            });
        }
    }
    )
);









export default categoryRouter;
