import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Socio } from '../../Models/Socio';
import { SocioService } from '../../Services/socio.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})


export class InicioComponent {
  private socioServicio = inject(SocioService);
  public listaSocios: Socio[] = [];
  public displayedColumns: string[] = ['CardCode', 'CardName', 'Cedula', 'FederalTaxID', 'accion'];

  obtenerSocios() {
    this.socioServicio.lista().subscribe({
      next: (data: any) => {
        
        this.listaSocios = data.Data;      
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  constructor(private router: Router) {
    this.obtenerSocios();
  }

  editar(objeto:Socio) {
    this.router.navigate(['/socio', objeto.CardCode])
  }
}