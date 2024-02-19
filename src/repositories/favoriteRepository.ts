import { AppDataSource } from "../data-source";
import { Favorites } from "../entities/Favorites";

export const FavoriteRepository = AppDataSource.getRepository(Favorites)