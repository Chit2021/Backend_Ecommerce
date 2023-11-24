var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import orderDetailsService from "../services/orderDetailService.js";
import { ApiError } from "../errors/ApiError.js";
import orderDetailService from "../services/orderDetailService.js";
function findOrderDetailOffset(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageNumber = Number(req.query.pageNumber) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        const list = yield orderDetailService.getPaginatedOrderDetail(pageNumber, pageSize);
        res.json({ list });
    });
}
function findAllOrderDetail(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderDetails = yield orderDetailsService.findAll();
        res.json({ orderDetails });
    });
}
function findOneOrderDetail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderDetailId = req.params.orderDetailId;
        const orderDetail = yield orderDetailsService.findone(orderDetailId);
        if (!orderDetail) {
            next(ApiError.resourceNotFound("OrderDetail not found."));
            return;
        }
        res.json({ orderDetail });
    });
}
function createOneOrderDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newOrderDetail = req.body;
        const orderDetail = yield orderDetailsService.createOne(newOrderDetail);
        res.status(201).json({ orderDetail });
    });
}
function findOneAndUpdate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newOrderDetail = req.body;
        const orderDetailId = req.params.orderDetailId;
        const updatedOrderDetail = yield orderDetailsService.findOneAndUpdate(orderDetailId, newOrderDetail);
        if (!updatedOrderDetail) {
            next(ApiError.resourceNotFound("OrderDetail not found."));
            return;
        }
        res.status(201).json({ updatedOrderDetail });
    });
}
function findOneAndDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderDetailId = req.params.orderDetailId;
        const deletedOrderDetail = yield orderDetailsService.findOneAndDelete(orderDetailId);
        if (!deletedOrderDetail) {
            next(ApiError.resourceNotFound("OderDetail not found."));
            return;
        }
        res.status(201).json({ deletedOrderDetail });
    });
}
export default {
    findOneOrderDetail,
    findAllOrderDetail,
    createOneOrderDetail,
    findOneAndUpdate,
    findOneAndDelete,
    findOrderDetailOffset,
};
