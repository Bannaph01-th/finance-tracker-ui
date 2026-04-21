import Axios from "./axios";
import { Injectable } from "@angular/core";
import type { AxiosResponse } from "axios";

import { TransactionType, TransactionTypeResponse } from "../../services/interfaces/transaction.interface";

@Injectable({
  providedIn: "root",
})
export class TransactionService {

async getType(): Promise<TransactionTypeResponse | null> {
    try{
        const res: AxiosResponse<TransactionTypeResponse> = 
        await Axios().get("/transaction_types")

        return res.data
    }catch( e: any){
        return e?.res?.data ?? null;
    }
}

}
