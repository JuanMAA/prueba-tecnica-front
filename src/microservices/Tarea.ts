import { RequestResponse } from "../api/dto/request-response";
import { Request } from "../api/dto/request";
import { TareaDTO } from "../api/dto/tarea.dto";

export class Tareas {

  static async getTareas(): Promise<RequestResponse> {
    return new Request("http://localhost:8080/tareas").get(`/tareas`);
  }

  static async getTareaById(id: any): Promise<RequestResponse> {
    return new Request("http://localhost:8080/tareas").get(`/tarea/${id}`);
  }

  static async createTarea(tarea: TareaDTO): Promise<RequestResponse> {
    return new Request("http://localhost:8080/tareas").post(`/tarea`, tarea);
  }

  static async updateTarea(id: number, tarea: TareaDTO): Promise<RequestResponse> {
    return new Request("http://localhost:8080/tareas").put(`/tarea/${id}`, tarea);
  }
}
