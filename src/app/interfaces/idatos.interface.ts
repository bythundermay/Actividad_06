import { IUser } from "./iuser.interfaces";

export interface Idatos {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    results:      IUser[];
}
