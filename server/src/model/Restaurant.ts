import mongoose, { Document, Model, Schema } from 'mongoose';


interface IRestaurant extends Document {
    name: string;
    address: string;
    type: string;
}

const RestaurantSchema: Schema<IRestaurant> = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true }
});



export const Restaurant: Model<IRestaurant> = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
