import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuchilloService } from '../../service/cuchillo.service';
import { Cuchillo } from '../../types/cuchillo';

@Component({
  selector: 'app-edit-cuchillo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-cuchillo.component.html',
  styleUrl: './edit-cuchillo.component.css'
})
export class EditCuchilloComponent implements OnInit {

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id=params.get("id");
      console.log(this.id)
      this.getCuchillo()
    })
  }

  route=inject(ActivatedRoute);
  router=inject(Router);
  servicio=inject(CuchilloService);
  id:String|null="";
  cuchillo : Cuchillo = {
    nombre:"", 
    tipo:"", 
    filo:"", 
    hoja:"", 
    mango:"", 
    longHoja:0,
    longTotal:0 
  }; 
  fb=inject(FormBuilder);

  tipos:string[] = ["chef", "santoku","pan" ,"deshuesador","mondador", "fileteador", "chino","caza"]; 
  filos:string[] = ["liso","dentado"]; 
  materialHoja:string[] = ["acero inoxidable","acero al carbono","ceramica"]; 
  materialMango:string[] = ["madera","metal","plastico", "hueso"]

  formulario = this.fb.nonNullable.group({
    nombre : ["", [Validators.required]],
    tipo : ["", [Validators.required]], 
    filo : ["", [Validators.required]], 
    hoja : ["", [Validators.required]], 
    mango : ["", [Validators.required]], 
    longHoja : [0, [Validators.min(1)]], 
    longTotal : [0, [Validators.min(1)]], 
  })

  getCuchillo() {
    this.servicio.getCuchillosById(this.id).subscribe({
      next : (cuchillo:Cuchillo) => {
        this.cuchillo=cuchillo; 
        this.setCuchillo(cuchillo); 
      }
    })
  }
  setCuchillo (cuchillo:Cuchillo){
    this.formulario.controls["nombre"].setValue(cuchillo.nombre); 
    this.formulario.controls["tipo"].setValue(cuchillo.tipo); 
    this.formulario.controls["filo"].setValue(cuchillo.filo); 
    this.formulario.controls["hoja"].setValue(cuchillo.hoja); 
    this.formulario.controls["mango"].setValue(cuchillo.mango); 
    this.formulario.controls["longHoja"].setValue(cuchillo.longHoja); 
    this.formulario.controls["longTotal"].setValue(cuchillo.longTotal); 
  }

  editaCuchillo (){
    if(this.formulario.invalid) return; 

    const cuchillo = this.formulario.getRawValue(); 

    this.servicio.editCuchillo( this.id,cuchillo).subscribe({
      next : ()=> {
        this.router.navigateByUrl("lista")
      }
    })
  }
}
