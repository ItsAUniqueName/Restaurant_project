"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ReservationSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    tableIdentifier: { type: String, required: true },
    restaurantName: { type: String, required: false },
    bookDate: { type: String, required: false }
});
// hook
ReservationSchema.pre('save', function (next) {
    const reservation = this;
    const date = new Date();
    reservation.bookDate = (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes());
    next();
});
exports.Reservation = mongoose_1.default.model('Reservation', ReservationSchema);
