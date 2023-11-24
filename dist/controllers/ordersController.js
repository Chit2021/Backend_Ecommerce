var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import OrdersService from "../services/ordersService.js";
import { ApiError } from "../errors/ApiError.js";
export function getAllOffset(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageNumber = Number(req.query.pageNumber) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        const list = yield OrdersService.getPaginatedOrder(pageNumber, pageSize);
        res.json({ list });
    });
}
export function getAllUserOrdersOffset(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.id;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        const list = yield OrdersService.getPaginatedUserOrder(userId, pageNumber, pageSize);
        res.json({ list });
    });
}
export function findAllOrder(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield OrdersService.findAll();
        res.json({ orders });
    });
}
export function findOneOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderId = req.params.orderId;
        const order = yield OrdersService.findone(orderId);
        if (!order) {
            next(ApiError.resourceNotFound("Order not found."));
            return;
        }
        res.json({ order });
    });
}
export function createOneOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newOrder = req.body;
        const order = yield OrdersService.createOne(newOrder);
        res.status(201).json({ order });
    });
}
export function findOneAndUpdate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newOrder = req.body;
        const orderId = req.params.orderId;
        const updatedOrder = yield OrdersService.findOneAndUpdate(orderId, newOrder);
        if (!updatedOrder) {
            next(ApiError.resourceNotFound("Order not found."));
            return;
        }
        res.status(201).json({ updatedOrder });
    });
}
export function findOneAndDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderId = req.params.orderId;
        const deletedOrder = yield OrdersService.findOneAndDelete(orderId);
        if (!deletedOrder) {
            next(ApiError.resourceNotFound("Order not found."));
            return;
        }
        res.status(201).json({ deletedOrder });
    });
}
export default {
    findOneOrder,
    findAllOrder,
    createOneOrder,
    findOneAndUpdate,
    findOneAndDelete,
};
