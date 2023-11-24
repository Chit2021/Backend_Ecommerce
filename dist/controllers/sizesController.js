var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// services
import SizeService from "../services/sizeService.js";
// error builder
import { ApiError } from "../errors/ApiError.js";
export function findAllSize(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sizes = yield SizeService.findAll();
            res.json(sizes);
        }
        catch (error) {
            next(ApiError.internal("Internal server error"));
        }
    });
}
export function createOneSize(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newSize = req.body;
            const size = yield SizeService.createOne(newSize);
            res.status(201).json(size);
        }
        catch (error) {
            next(ApiError.internal("Internal server error"));
        }
    });
}
