var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import OrderDetailRepo from "../models/OrderDetail.js";
function getPaginatedOrderDetail(pageNumber, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const skip = (pageNumber - 1) * pageSize;
        const orders = yield OrderDetailRepo.find().skip(skip).limit(pageSize).exec();
        return orders;
    });
}
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const orderDetails = yield OrderDetailRepo.find().exec();
        return orderDetails;
    });
}
function findone(orderDetailId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose.Types.ObjectId(orderDetailId);
        const orderDetail = yield OrderDetailRepo.findById(id);
        return orderDetail;
    });
}
function createOne(orderDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const newOrderDetail = new OrderDetailRepo(orderDetail);
        return yield newOrderDetail.save();
    });
}
function findOneAndUpdate(orderDetailId, orderDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose.Types.ObjectId(orderDetailId);
        return yield OrderDetailRepo.findByIdAndUpdate(id, orderDetail);
    });
}
function findOneAndDelete(orderDetailId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose.Types.ObjectId(orderDetailId);
        return yield OrderDetailRepo.findByIdAndDelete(id);
    });
}
export default {
    findone,
    findAll,
    createOne,
    findOneAndUpdate,
    findOneAndDelete,
    getPaginatedOrderDetail
};
