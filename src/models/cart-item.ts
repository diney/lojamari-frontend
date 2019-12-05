import {ProdutoDTO} from "./produto.dto";

export interface CartItem{
    quantidade: number, 
    desconto:number,   
    produto: ProdutoDTO
}