import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
      seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ClientModel",
    },
    orderItems: [
      {
        name: { type: String, required: true },
          category:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "CategoryModel",
          },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String,  },
      city: { type: String, },
      postalCode: { type: String, },
      country: { type: String, },
    },
      phone: { type: String, },
    paymentMethod: {
      type: String,
      required: true,
      default: "Paypal",
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: Date },
      email_address: { type: String },
    },
      reduction: { type: Number, default: 0 },

    taxPrice: {
      type: Number,
      required: true,

    },
    shippingPrice: {
      type: Number,
      required: true,

    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
      isShipped: {
        type: Boolean,
            required: true,
        default: false,
      },
        shippedAt: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        isCancelled: {
            type: Boolean,
            default: false,
        }


  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
