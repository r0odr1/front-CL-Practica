import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Socio } from '../../Models/Socio';
import { SocioService } from '../../Services/socio.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})

export class InicioComponent {
  private socioServicio = inject(SocioService);
  public listaSocios: Socio[] = [];
  public displayedColumns: string[] = ['CardCode', 'CardName', 'Cedula', 'FederalTaxID', 'accion'];
  public mostrarLista: boolean = false;

  obtenerSocios() {
    this.socioServicio.lista().subscribe({
      next: (data: any) => {      
        this.listaSocios = data.Data;

        this.mostrarLista = false;
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
  
  onBuscarSocio(event: any) {
    const termino = event.target.value;
    this.buscarSocio(termino);
  }

  buscarSocio(termino: string) {
    if (!termino.trim()) {
      this.obtenerSocios();
      return;
    }

    this.socioServicio.lista().subscribe({
      next: (data: any) => {
        this.listaSocios = data.Data.filter((soci:Socio) =>
          soci.CardCode.includes(termino) || soci.CardName.toLowerCase().includes(termino.toLowerCase())
        );
        this.mostrarLista = true;
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }
}