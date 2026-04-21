import Axios from "./axios";
import { Injectable } from "@angular/core";
import type { AxiosResponse } from "axios";

import {
  CategoryPayload,
  CategoryResponse,
} from "../../services/interfaces/category.interface";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private _refetch = new Subject<void>();
  refetch$ = this._refetch.asObservable();

  requestRefetch() {
    this._refetch.next();
  }

  async getAllCategory(): Promise<CategoryResponse | null> {
    try {
      const res: AxiosResponse<CategoryResponse> =
        await Axios().get("/categories");

      return res.data;
    } catch (e: any) {
      return e?.res?.data ?? null;
    }
  }

  async delete(categoryId: string): Promise<CategoryResponse | null> {
    try {
      const res: AxiosResponse<CategoryResponse> = await Axios().delete(
        `/categories/${categoryId}`,
      );
      return res.data;
    } catch (e: any) {
      return e?.res?.data ?? null;
    }
  }

  async create(payload: CategoryPayload) {
    try {
      const res = await Axios().post("/categories", payload);
      return res.data;
    } catch (e: any) {
      return e?.response?.data ?? null;
    }
  }
}
