import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { StorageService } from "../../services/storage.service";
import _ from 'lodash';
import { CartService } from '../../services/domain/cart.service';
import { STORAGE_KEYS } from '../../config/storage_keys.config';


@IonicPage()
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {

  items:ClienteDTO[];
  allClientes:any;
  queryText: "";

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage : StorageService,
     public clienteService: ClienteService,
     public cartService:CartService) {

     
  }

  ionViewDidLoad() {
    this.loadData();
   
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    
    if (localUser && localUser.nome) {
      
      this.clienteService.findAll()
        .subscribe(response => {
          this.items = response ;
          this.allClientes = response;
        //  this.getImageIfExists();
        },
        error => {
          console.log(error.status)
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }    
  }

  filterCliente(cli:any){  
    let val = cli.target.value;
    if(val && val.trim() != ''){
      this.items = _.values(this.items);
      this.items = this.items.filter((cliente)=>{
        return (cliente.nome.toLowerCase().indexOf(val.toLowerCase()) >-1 );
      })
    }else{
      this.items = this.allClientes;
    }
  }

  showCategorias(cliente_id : string){
    this
    this.navCtrl.push('CategoriasPage', {cliente_id : cliente_id});
    localStorage.setItem(STORAGE_KEYS.cliente,JSON.stringify(cliente_id));
   
    this.limpaCarinho();
  }

  limpaCarinho(){
    this.cartService.createOrClearCart()
  }



  novo() {
   // this.navCtrl.push('NovoClientePage');
    this.navCtrl.setRoot('NovoClientePage');
  }


  }


