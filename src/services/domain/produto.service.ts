
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findById(produto_id : number) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
  }

  findByCategoria(categoria_id : string, page : number = 0, linesPerPage : number = 24) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }

  insert(obj: ProdutoDTO) {
    return this.http.post(
        `${API_CONFIG.baseUrl}/produtos`,
        obj,
        {
            observe: 'response',
            responseType: 'text'
        }
    );
}
  cuontProd() {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/count`);

  }


  
}