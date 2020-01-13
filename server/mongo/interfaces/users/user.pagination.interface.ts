import { IUser } from "./user.interface";
import { IQueryPageination } from "../utils/query.interfaces";

export interface IUserPagination {
    users: IUser[],
    pagination: IQueryPageination
}