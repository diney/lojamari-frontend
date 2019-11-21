import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/domain/cart.service';
import { CartItem } from '../../models/cart-item';
import { ClienteService } from '../../services/domain/cliente.service';
import { STORAGE_KEYS } from '../../config/storage_keys.config';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;
  items: CartItem[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public formBuilder: FormBuilder,
    public cartService:CartService,) {


    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    });

  }

  ionViewDidLoad() { 

    let cart = this.cartService.getCart();
    this.items = cart.items;


    let cliente = localStorage.getItem(STORAGE_KEYS.cliente);
    this.clienteService.findById(cliente).
    subscribe(response=>{   
     let cart = this.cartService.getCart();  
     this.pedido = {
       cliente: {id: response['id']},
       pagamento:null,
       itens:cart.items.map(x => {return {quantidade:x.quantidade,produto:{id:x.produto.id}}})
     }
    
    
    },
    error => {})
  }

  nextPage() {
   this.pedido.pagamento = this.formGroup.value;
   
    this.navCtrl.setRoot('OrderConfirmationPage', {pedido: this.pedido});
    
  }
}