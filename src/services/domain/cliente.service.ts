
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<ClienteDTO[]>  {
        return this.http.get<ClienteDTO[]>(`${API_CONFIG.baseUrl}/clientes`);
    }

    insert(obj:ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe:`response`,
                responseType:`text`
            }
        );
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }
}