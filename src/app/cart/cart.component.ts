import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ZamowienieService } from '../dashboard/zamowienie.service';
import { Router } from '@angular/router';

interface Product {
  id: number;
  quantity: number;
  name?: string;
  price?: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Product[] = [];
  cenaCalkowita: number= 0;
  oplacone: number=0;
  stolik: number=0;
  czyPrzyciskNieaktywny: boolean = false;
  tekst:string="Opłać";

  constructor(private zs: ZamowienieService,private router: Router){}

  zmienIlosc(item: Product) {
    item.quantity -=1;


    let storedValue = localStorage.getItem('mojaZmienna');

    if (storedValue !== null) {
        let aktualnaWartosc = parseInt(storedValue);
        localStorage.setItem('mojaZmienna', (aktualnaWartosc - 1).toString());
    } else {
        localStorage.setItem('mojaZmienna', '0'); 
    }



    if (item.quantity < 0) {
      item.quantity = 0;
    }

    if (item.quantity === 0) {
      this.usunProdukt(item);
    }

    switch (item.id) {
      case 1:
        item.price = 32*item.quantity;
        this.cenaCalkowita-=32;
        break;
      case 2:
        item.price = 22*item.quantity;
        this.cenaCalkowita-=22;
        break;
      case 3:
        item.price = 7*item.quantity;
        this.cenaCalkowita-=7;
        break;
      case 4:
        item.price = 12*item.quantity;
        this.cenaCalkowita-=12;
        break;
      default:
        item.price=0;
    }

    
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  usunProdukt(item: Product) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

order(){
   const selectElement = document.getElementById('stolik') as HTMLSelectElement;
   this.stolik = Number(selectElement.value);

   const zamowienieJSON= {
    stolik: this.stolik,
    oplacone: this.oplacone
};
const zamstr=JSON.stringify(zamowienieJSON)
const crt=localStorage.getItem('cartItems');
if (crt&&crt!="[]") {
  localStorage.setItem('mojaZmienna','0')
this.zs.newZamowienie(zamstr).subscribe();
this.zs.newProdukty(JSON.parse(crt)).subscribe();
localStorage.removeItem('cartItems')
this.router.navigate([''])
    alert("Zamowienie zlozone pomyslnie!")
  }
  else alert("Najpierw dodaj produkty do koszyka")
}

ukryjPrzycisk() {
  this.tekst="Opłacono"
  this.oplacone=1;
  this.czyPrzyciskNieaktywny = true;
}

  ngOnInit() {
    const cartItemsString = localStorage.getItem('cartItems');

    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
      this.cartItems.forEach(item => {
        switch (item.id) {
          case 1:
            item.name = 'Pizza';
            item.price = 32*item.quantity;
            this.cenaCalkowita+=item.price;
            break;
          case 2:
            item.name = 'Spaghetti';
            item.price = 22*item.quantity;
            this.cenaCalkowita+=item.price;
            break;
          case 3:
            item.name = 'Zupa';
            item.price = 7*item.quantity;
            this.cenaCalkowita+=item.price;
            break;
          case 4:
            item.name = 'Pierogi';
            item.price = 12*item.quantity;
            this.cenaCalkowita+=item.price;
            break;
          default:
            item.name = 'Nieznany produkt';
            item.price=0;
        }
      });
    }
  }
}
