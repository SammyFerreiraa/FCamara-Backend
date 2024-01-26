import { AppDataSource } from "../data-source";
import { Copy } from "../entities/Copy";

export const CopyRepository = AppDataSource.getRepository(Copy)