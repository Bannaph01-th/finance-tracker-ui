import Axios from "./axios";
import { Injectable } from "@angular/core";
import type { AxiosResponse } from "axios";

import { Category, CategoryResponse } from "../../services/interfaces/category.interface";

@Injectable({
  providedIn: "root",
})
export class CategoryService {

async getAllCategory(): Promise<CategoryResponse | null> {
    try{
        const res: AxiosResponse<CategoryResponse> = 
        await Axios().get("/categories")

        return res.data
    }catch( e: any){
        return e?.res?.data ?? null;
    }
}

}
