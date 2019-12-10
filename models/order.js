const mongoose = require('mongoose');

let OrderSchema = new mongoose.Schema({
    products: [{
        _id: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    bill: {
        type: Number
    },
    createdAt: {
        type: String
    },
    deliveryAddress: {
        type: String,
        required: true,
        trim: true
    },
    orderFrom: {
        userName: {
            type: String,
            required: true,
            trim: true
        },
        userAdress: {
            type: String,
            require: true,
            trim: true
        },
        userPhone: {
            type: String,
            required: true,
            trim: true,
            minlength: 11,
            maxlength: 11
        },
        userEmail: {
            type: String,
            trim: true,
            required: true
        }
    },
    deliveryStatus: {
        type: String,
        trim: true,
        enum: ['pending', 'dispatched'],
        default: 'pending'
    },
    orderStatus: {
        type: String,
        trim: true,
        enum: ['checked', 'unchecked'],
        default: 'unchecked'
    }
});

OrderSchema.statics.findUnchecked = function (user) {
    return Order.find({
        'orderStatus': 'unchecked',
        'orderFrom.userName': user.username,
        'orderFrom.userAdress': user.userAddress,
        'orderFrom.userEmail': user.email,
        'orderFrom.userPhone': user.userPhone
    });
}

OrderSchema.statics.findMyOrders = function (user) {
    let Order = this;
    return Order.find({
        'orderStatus': 'checked',
        'orderFrom.userName': user.username,
        'orderFrom.userAdress': user.userAddress,
        'orderFrom.userEmail': user.email,
        'orderFrom.userPhone': user.userPhone
    });
}


const Order = mongoose.model('Order', OrderSchema);

module.exports = {Order};