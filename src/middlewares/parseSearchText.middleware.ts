import { NextFunction, Request, Response } from "express";


export function parseSearchText(
    req: Request, res: Response, next: NextFunction
) {
    try {
        let searchText = ''
        let arr = req.params.data.split(" ")
        for(let i = 0; i < arr.length - 1; i++) {
            searchText += arr[i] + ' | ';
        }
        searchText += arr.pop()
        res.locals.searchText = searchText
        next()
    } catch (error) {
        next(error)
    }
}