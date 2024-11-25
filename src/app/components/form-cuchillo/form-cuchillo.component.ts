import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CuchilloService } from '../../service/cuchillo.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-cuchillo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-cuchillo.component.html',
  styleUrl: './form-cuchillo.component.css'
})
export class FormCuchilloComponent {

  tipos:string[] = ["chef", "santoku","pan" ,"deshuesador","mondador", "fileteador", "chino","caza"]; 
  filos:string[] = ["liso","dentado"]; 
  materialHoja:string[] = ["acero inoxidable","acero al carbono","ceramica"]; 
  materialMango:string[] = ["madera","metal","plastico", "hueso"]

  route=inject(Router);
  servicio=inject(CuchilloService);
  fb=inject(FormBuilder);

  formulario= this.fb.nonNullable.group({
    nombre : ["", [Validators.required]],
    tipo:["",[Validators.required]],
    filo:["",[Validators.required]],
    hoja:["",[Validators.required]],
    mango:["",[Validators.required]],
    longHoja:[0,[Validators.min(1)]],
    longTotal:[0,[Validators.min(1)]]
  })

  addCuchillo(){
    if(this.formulario.invalid) return;

    const cuchillo=this.formulario.getRawValue();

    this.servicio.postCuchillos(cuchillo).subscribe({
      next:()=>{
        this.route.navigateByUrl("lista");
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    })
  }

}
