import mongoose from 'mongoose';

export const book_schem = new mongoose.Schema
({
    title: String,
    author: String,
    category: String,
    publicationYear: Number,
    price: Number,
    quantity: Number,
    description: String,
    imageUrl: String,
}, { timestamps: true });

export const books = mongoose.model("Book_Store", book_schem)