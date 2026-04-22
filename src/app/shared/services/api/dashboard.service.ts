import Axios from "./axios";
import { Injectable } from "@angular/core";
import type { AxiosResponse } from "axios";

@Injectable({
  providedIn: "root",
})
export class DashboardService {

    async loadDashboardFinanceSummary(year?: number): Promise<any | null> {
        try{
            const params = year !== undefined ? { year } : {};

            const res: AxiosResponse<any> = 
            await Axios().get("/dashboard/finance-summary", {params})

            return res.data
        }catch( e: any){
            return e?.res?.data ?? null;
        }
    }

    async loadDashboard(year?: number): Promise<any | null> {
        try{
            const params = year !== undefined ? { year } : {};

            const res: AxiosResponse<any> = 
            await Axios().get("/dashboard/admin-summary", { params })

            return res.data
        }catch( e: any){
            return e?.res?.data ?? null;
        }
    }

    
}
