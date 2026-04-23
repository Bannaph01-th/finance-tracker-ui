import Axios from "./axios";
import { Injectable } from "@angular/core";
import type { AxiosResponse } from "axios";
import { AgentMessageState } from "./common/agent-history-stage-service";

export interface AgentMessage {
  message: string;
}

export interface AgentResponse {
  status: number;
  message?: string;
  resultData?: AgentMessage;
}

@Injectable({
  providedIn: "root",
})
export class AgentMessageService {
  constructor(private readonly agentState: AgentMessageState) {}

  async getMessage(): Promise<AgentResponse | null> {
    try {
      const res: AxiosResponse<AgentResponse> = await Axios().post("/agent");

      const result = res.data;

      const message = result?.resultData;

      if(message){
          this.agentState.setMessage(message)
      }

      return result ;

    } catch (e: any) {
      return e?.res.data ?? null;
    }
  }

  async getLogs(): Promise<any | null> {
    try {
      const res: AxiosResponse<any> = await Axios().get("/agent-logs");

      const result = res.data;

      return result ;

    } catch (e: any) {
      return e?.res.data ?? null;
    }
  }
}
