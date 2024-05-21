import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ZamowienieService{

    constructor(private http: HttpClient){}

    //: Observable<IZamowienie[]>
    getZamowienie(){
        console.log(this.http.get("http://localhost:8080/zamowienia"));
        return this.http.get("http://localhost:8080/zamowienia");
    }
    removeZamowienie(numerZamowienia: number){
        console.log(`http://localhost:8080/zamowienia/delete/${numerZamowienia}`)
        return this.http.delete(`http://localhost:8080/zamowienia/delete/${numerZamowienia}`)
    }
    mergeOplacone(numerZamowienia: number){
        return this.http.delete(`http://localhost:8080/zamowienia/update/${numerZamowienia}`)
    }
    newZamowienie(jsn: string){
        return this.http.post(`http://localhost:8080/zamowienia/create`,jsn)
    }
    newProdukty(jsn: string){
        return this.http.post(`http://localhost:8080/zamow/nowe`,jsn)
    }
    getZamowioneProdukty(){
        console.log(this.http.get("http://localhost:8080/zamow"));
        return this.http.get("http://localhost:8080/zamow");
    }
}