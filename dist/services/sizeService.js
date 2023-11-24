var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// model
import { Size } from "../models/Size.js";
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Size.find().lean().exec();
    });
}
function createOne(size) {
    return __awaiter(this, void 0, void 0, function* () {
        const newSize = new Size(size);
        return yield newSize.save();
    });
}
export default {
    findAll,
    createOne,
};
