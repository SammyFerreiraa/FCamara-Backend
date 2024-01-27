import { AppDataSource } from "../data-source";
import { Books } from "../entities/Books";

export const BooksRepository = AppDataSource.getRepository(Books);