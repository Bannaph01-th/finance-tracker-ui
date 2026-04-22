import Axios from "./axios";
import { Injectable } from "@angular/core";
import type { AxiosResponse } from "axios";

import { 
    TransactionTypeResponse,
    TransactionResponse
} from "../../services/interfaces/transaction.interface";

@Injectable({
  providedIn: "root",
})
export class TransactionService {

    async loadTransactions(params?: {

    }): Promise<TransactionResponse | null> {
        try{
            const res: AxiosResponse<TransactionResponse> = 
            await Axios().get("/transactions", {params})

            return res.data
        }catch( e: any){
            return e?.res?.data ?? null;
        }
    }

    async getType(): Promise<TransactionTypeResponse | null> {
        try{
            const res: AxiosResponse<TransactionTypeResponse> = 
            await Axios().get("/transaction_types")

            return res.data
        }catch( e: any){
            return e?.res?.data ?? null;
        }
    }

    async createTransaction(payload: {
        transactions_id: string;
        user_id: string;
        category_id: string;
        amount: number;
        note: string;
        transaction_date: string;
    }): Promise<TransactionResponse | null> {
        try{
            const res: AxiosResponse<TransactionResponse> = 
            await Axios().post(`/transactions`, payload)

            return res.data
        }catch( e: any){
            return e?.res?.data ?? null;
        }
    }

    async deleteTransaction(transaction_id: string): Promise<TransactionResponse | null> {
        try{
            const res: AxiosResponse<TransactionResponse> = 
            await Axios().delete(`/transactions/${transaction_id}`)

            return res.data
        }catch( e: any){
            return e?.res?.data ?? null;
        }
    }

}
