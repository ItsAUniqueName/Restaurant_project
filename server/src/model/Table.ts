import mongoose, { Document, Model, Schema } from 'mongoose';


interface ITable extends Document {
    restaurantName: string;
    indoor: boolean;
    seets: number;
    date: string;
    booked: boolean
}

const TableSchema: Schema<ITable> = new mongoose.Schema({
    restaurantName: { type: String, required: true },
    indoor: { type: Boolean, required: true },
    seets: { type: Number, required: true },
    date: { type: String, required: true },
    booked: { type: Boolean, required: true }
});



export const Table: Model<ITable> = mongoose.model<ITable>('Table', TableSchema);
