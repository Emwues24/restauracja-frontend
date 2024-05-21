import { Component, OnInit } from '@angular/core';
import { ZamowienieService } from '../dashboard/zamowienie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  myData: any;
  filteredData: any[] = [];
  searchNumerZamowienia: string = '';

  constructor(private zs: ZamowienieService,private router: Router){}

  applyFilter() {
    this.filteredData = this.myData.filter((zamowienie: { numer_zamowienia: { toString: () => string | any[]; }; }) =>
      zamowienie.numer_zamowienia.toString().includes(this.searchNumerZamowienia)
    );
  }

  ngOnInit(): void{
    this.zs.getZamowioneProdukty().subscribe((data)=>{
      this.myData=data;
      this.filteredData=this.myData;
      console.log(this.myData);
    });
}
logout(){
  localStorage.removeItem("token")
  this.router.navigate([''])
  alert("Logged out Succesfully")
}

swap(){
  this.router.navigate(['/dashboard/orders'])
}

}
