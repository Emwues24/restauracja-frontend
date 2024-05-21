import { Component, OnInit } from '@angular/core';
import { ZamowienieService } from './zamowienie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

myData: any;
searchNumerZamowienia: string = '';
  searchNumerStolika: string = '';
  searchOplacone: string = '';
filteredData: any[] = [];

  constructor(private zs: ZamowienieService,private router: Router){}

  swap(){
    this.router.navigate(['/dashboard/details'])
  }

  applyFilter() {
    this.filteredData = this.myData.filter((zamowienie: { numerZamowienia: { toString: () => string | any[]; }; numerStolika: { toString: () => string | any[]; }; oplacone: { toString: () => string | any[]; }; }) =>
      zamowienie.numerZamowienia.toString().includes(this.searchNumerZamowienia) &&
      zamowienie.numerStolika.toString().includes(this.searchNumerStolika) &&
      zamowienie.oplacone.toString().includes(this.searchOplacone)
    );
  }
  updateOplacone(numerZamowienia: number){
    this.zs.mergeOplacone(numerZamowienia).subscribe();
    const foundZamowienie = this.myData.find((zamowienie: { numerZamowienia: number; })  => zamowienie.numerZamowienia === numerZamowienia);
  if (foundZamowienie) {
    console.log(foundZamowienie.oplacone)
    if(foundZamowienie.oplacone==1)foundZamowienie.oplacone = 0;
    else foundZamowienie.oplacone=1;
    this.applyFilter();
  }
  }

  deleteZamowienie(numerZamowienia: number){
    this.zs.removeZamowienie(numerZamowienia).subscribe();
    const index = this.myData.findIndex((zamowienie: { numerZamowienia: number; }) => zamowienie.numerZamowienia === numerZamowienia);
    if (index !== -1) {
      this.myData.splice(index, 1);
      this.applyFilter();
    }
  }
  ngOnInit(): void{
      this.zs.getZamowienie().subscribe((data)=>{
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
}
