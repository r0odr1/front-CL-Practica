import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DireccionComponent } from './Pages/direccion/direccion.component';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { SocioComponent } from './Pages/socio/socio.component';

export const routes: Routes = [
  { path:'',component: InicioComponent},
  { path:'inicio',component: InicioComponent},
  { path:'socio/:CardCode',component: SocioComponent},
  { path:'socio/:CardCode/direcciones', component: SocioComponent},
  { path: 'Address/:cardCode/:id', component: DireccionComponent }
];

NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}