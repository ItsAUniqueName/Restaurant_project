"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TableSchema = new mongoose_1.default.Schema({
    restaurantName: { type: String, required: true },
    indoor: { type: Boolean, required: true },
    seets: { type: Number, required: true },
    date: { type: String, required: true },
    booked: { type: Boolean, required: true }
});
exports.Table = mongoose_1.default.model('Table', TableSchema);
