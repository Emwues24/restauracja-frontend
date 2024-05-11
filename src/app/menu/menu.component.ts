import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  Koszyk: string="Koszyk: 0";

  ngOnInit(){
    this.Koszyk="Koszyk: "+localStorage.getItem('mojaZmienna')
  }

  dodajDoKoszyka(id:number){
    var cartItemsString = localStorage.getItem('cartItems');
    var cartItems = [];
   
    let storedValue = localStorage.getItem('mojaZmienna');

    if (storedValue !== null) {
        let aktualnaWartosc = parseInt(storedValue);
        localStorage.setItem('mojaZmienna', (aktualnaWartosc + 1).toString());

    } else {
        localStorage.setItem('mojaZmienna', '1'); 
    }
    this.Koszyk="Koszyk: "+localStorage.getItem('mojaZmienna')

    if (cartItemsString) {
        cartItems = JSON.parse(cartItemsString);

        var existingProduct = cartItems.find((item: { id: number; }) => item.id === id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cartItems.push({ id: id, quantity: 1 });
        }
    } else {
        cartItems.push({ id: id, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    console.log('Dodano do koszyka:', id);
  }
}
