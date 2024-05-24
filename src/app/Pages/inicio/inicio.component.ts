import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { Socio } from '../../Models/Socio';
import { SocioService } from '../../Services/socio.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatOptionModule,
    MatAutocompleteModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})

export class InicioComponent {
  private socioServicio = inject(SocioService);
  public listaSocios: Socio[] = [];
  public displayedColumns: string[] = ['CardCode', 'CardName', 'Cedula', 'FederalTaxID', 'accion'];
  public mostrarLista: boolean = false;
  public socioControl = new FormControl();
  public listaSociosFiltrados: Observable<Socio[]>;

  constructor(private router: Router) {
    this.obtenerSocios();
    this.listaSociosFiltrados = this.socioControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.CardCode),
      map(code => code ? this.filtrarSocios(code) : this.listaSocios.slice())
    );
  }

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
  
  editar(objeto:Socio) {
    this.router.navigate(['/socio', objeto.CardCode])
  }

  displaySocio(socio: Socio): string {
    return socio && socio.CardCode ? socio.CardCode : '';
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
      },
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  filtrarSocios(nombre: string): Socio[] {
    const filtro = nombre.toLowerCase();
    return this.listaSocios.filter(socio => socio.CardName.toLowerCase().indexOf(filtro) === 0);
  }
}