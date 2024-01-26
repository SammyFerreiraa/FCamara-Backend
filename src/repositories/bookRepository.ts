import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";

export const BookRepository = AppDataSource.getRepository(Book)