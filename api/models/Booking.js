const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema ({
    place: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Place'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    numberOfGuests: {
        type:  Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;