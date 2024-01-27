import { AppDataSource } from "../data-source";
import { Rental } from "../entities/Rental";

export const RentalRepository = AppDataSource.getRepository(Rental)