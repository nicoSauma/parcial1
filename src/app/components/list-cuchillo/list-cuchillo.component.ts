import { Component, inject, OnInit } from '@angular/core';
import { CardCuchilloComponent } from '../card-cuchillo/card-cuchillo.component';
import { CuchilloService } from '../../service/cuchillo.service';
import { Cuchillo } from '../../types/cuchillo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cuchillo',
  standalone: true,
  imports: [CardCuchilloComponent],
  templateUrl: './list-cuchillo.component.html',
  styleUrl: './list-cuchillo.component.css'
})
export class ListCuchilloComponent implements OnInit {
ngOnInit(): void {
  this.getLista();
}

servicio=inject(CuchilloService);
listaCuchillos : Cuchillo[] = []; 
route=inject(Router);

getLista(){
  this.servicio.getCuchillos().subscribe({
    next:(lista)=>{
      this.listaCuchillos=lista
    },
    error:(e:Error)=>{
      console.log(e.message);
    }
  })
}

detailEvent(id:String){
  this.route.navigateByUrl(`detalle/:${id}`)
}

deleteEvent(id:String){
  this.servicio.deleteCuchillo(id).subscribe({
    next:(cuchillo:Cuchillo)=>{
      console.log("cuchillo eliminado: ",cuchillo);
      this.listaCuchillos.splice(this.listaCuchillos.findIndex(c=>c.id===id),1);
    }
  })
}

}
