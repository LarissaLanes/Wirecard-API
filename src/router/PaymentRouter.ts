import express from "express";
import {PaymentController} from "../controller/PaymentController";


export const paymentRouter = express.Router();

const paymentController = new PaymentController()

paymentRouter.post("/method", paymentController.methodPayment)
