import mongoose, { Document, Model, Schema } from 'mongoose';


interface IReservation extends Document {
    email: string;
    tableIdentifier: string;
    restaurantName: string;
    bookDate: string;
}

const ReservationSchema: Schema<IReservation> = new mongoose.Schema({
    email: { type: String, required: true },
    tableIdentifier: { type: String, required: true },
    restaurantName: { type: String, required: false },
    bookDate: { type: String, required: false }
});

// hook
ReservationSchema.pre<IReservation>('save', function(next) {
    const reservation = this;
    const date = new Date();
    reservation.bookDate = (date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()+" "+date.getHours()+":"+date.getMinutes());
    next();
});


export const Reservation: Model<IReservation> = mongoose.model<IReservation>('Reservation', ReservationSchema);
