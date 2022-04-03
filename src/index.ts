import { paymentRouter } from './router/PaymentRouter';
import { productRouter } from './router/ProductRouter';
import app from "./app";
import { userRouter } from "./router/UserRouter";


app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/payment", paymentRouter)