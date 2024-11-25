import { Routes } from '@angular/router';
import { FormCuchilloComponent } from './components/form-cuchillo/form-cuchillo.component';
import { AppComponent } from './app.component';
import { ListCuchilloComponent } from './components/list-cuchillo/list-cuchillo.component';
import { EditCuchilloComponent } from './components/edit-cuchillo/edit-cuchillo.component';

export const routes: Routes = [

    {path:"agregar", component:FormCuchilloComponent},
    {path:"lista", component:ListCuchilloComponent},
    {path:"", component:AppComponent},
    {path:"detalle/:id", component:EditCuchilloComponent}
];
