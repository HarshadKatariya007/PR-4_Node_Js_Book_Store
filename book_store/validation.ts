import { NextFunction, Request, Response } from "express";

export const book_data_check = (req:Request,res:Response,next:NextFunction) =>
{
    let {title,author,category,publicationYear,price,quantity,description,imageUrl} = req.body

    if(!title || !author || !category || !publicationYear || !price || !quantity || !description || !imageUrl)
    {
        res.status(400).send({message: 'All fields are required'})
    }
    else
    {
        next()
    }
    
}
