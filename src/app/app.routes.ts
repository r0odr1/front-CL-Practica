import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { SocioComponent } from './Pages/socio/socio.component';

export const routes: Routes = [
  { path:'',component: InicioComponent},
  { path:'inicio',component: InicioComponent},
  { path:'socio/:CardCode',component: SocioComponent}
];