import express from 'express';
import { Request, Response } from 'express';
import { Connect } from './dbConnection';
import { books } from './schema';
import { book_data_check } from './validation';

const book = express()
book.use(express.json())



book.get("/", (req: Request, res: Response) => {
    res.send("welcome to the book store")
})
book.get("/books", async (req: Request, res: Response) => {
    let book_get = await books.find()
    res.send(book_get)
})
book.get("/books/book/:id", async (req: Request, res: Response) => {
    let { id } = req.params
    let book_find = await books.findById(id)
    if (!book_find) {
        res.status(404).send({ message: "book not found" })
    }
    res.status(200).send(book_find)
})

book.delete("/books/delete/:id", async (req: Request, res: Response) => {
    let { id } = req.params
    let book_delete = await books.findByIdAndDelete(id)
    res.status(200).send(book_delete)
})
book.post("/books/addbooks", book_data_check, async (req: Request, res: Response) => {
    let book_post = await books.create(req.body)
    res.send(book_post)
})
book.patch("/books/update/:id", async (req: Request, res: Response) => {
    let { id } = req.params
    let book_update = await books.findByIdAndUpdate(id, req.body)
    res.send(book_update)
})
book.get("/books/filter", async (req: Request, res: Response) => {
    const { author, category, title, price } = req.query;
    const filter_data: any = {}

    if (author) {
        filter_data.author = author;
    }
    if (title) {
        filter_data.title = title;
    }
    if (category) {
        filter_data.category = category;
    }

    const sort: any = {}

    if (price == "lth") {
        sort.price = 1
    }
    else if (price == "htl") {
        sort.price = -1
    }

    let data = await books.find(filter_data).sort(sort)
    res.send(data)
})

book.listen(8090, () => {
    console.log("Server Is Running On Port http://loalhost:8090");
    Connect()
})