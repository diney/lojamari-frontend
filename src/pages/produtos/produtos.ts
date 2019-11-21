import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = [];
  page : number= 0;
  produto: ProdutoDTO;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public produtoService: ProdutoService ,
     public loadingCtrl: LoadingController ) {
  }

  ionViewDidLoad() {    
   
  
  }

  loadData(){
   /* let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    
    this.produtoService.findByCategoria(categoria_id,this.page, 10 )
    .subscribe(response => {
      this.items = this.items.concat(response['content']);
      loader.dismiss();
    },
    error => {
      loader.dismiss();
    });*/
  }

  showDetail(produto_id :string){
    this.navCtrl.push('ProdutoDetailPage',{produto_id:produto_id});
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."      
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher){
    this.loadData();
    setTimeout(()=>{
      refresher.complete()
    },1000);

  }

  doInfinite(infiniteScroll){
    this.page++;
    this.loadData();
    setTimeout(()=>{
      infiniteScroll.complete()
    },1000);


  }
  updateList(codProduto:number) {  
    if(codProduto==0){
      this.produto = null
      return
    }  
   
    this.produtoService.findById(codProduto)
    .subscribe(response => {
      this.produto = response;
        },
    error => {
    });
  
  }


}
