import express from "express";

import OrderDetailController from "../controllers/orderDetailsController.js";
import { validateOrderDetail } from "../middlewares/orderDetailValidate.js";

const router = express.Router();

router.get("/", OrderDetailController.findAllOrderDetail);
router.get("/:orderDetailId", OrderDetailController.findOneOrderDetail);
router.get("/offset", OrderDetailController.findOrderDetailOffset);
router.post(
  "/",
  validateOrderDetail,
  OrderDetailController.createOneOrderDetail
);
router.put(
  "/:orderDetailId",
  validateOrderDetail,
  OrderDetailController.findOneAndUpdate
);
router.delete("/:orderDetailId", OrderDetailController.findOneAndDelete);
router.use((req, res, next) => {
  console.log("got here");
  res.on("finish", () => {
    console.log("Record created:", {
      /*log data */
    });
  });
  next();
});
export default router;
