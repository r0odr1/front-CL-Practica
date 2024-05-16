import { Component, inject, Input, OnInit } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SocioService } from '../../Services/socio.service';
import { Router } from '@angular/router';
import { Socio } from '../../Models/Socio';

@Component({
  selector: 'app-socio',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './socio.component.html',
  styleUrl: './socio.component.css'
})
export class SocioComponent implements OnInit {

  @Input('CardCode')CardCode!: string;
  private socioServicio = inject(SocioService);
  public formBuild = inject(FormBuilder);

  public formSocio: FormGroup = this.formBuild.group({
    CardCode:[''],
    CardName:[''],
    Cedula:[''],
    FederalTaxID:['']
  })

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.socioServicio.obtener(this.CardCode).subscribe({
      next:(data: any) => {
        this.formSocio.patchValue({
          CardCode: data.Data.CardCode,
          CardName:data.Data.CardName,
          Cedula: data.Data.Cedula,
          FederalTaxID: data.Data.FederalTaxID
        })
      },
      error:(err) => {
        console.log(err.message);
      }
    })      
  }

  guardar() {
    const objeto: Socio = {
      CardCode: this.formSocio.value.CardCode,
      CardName: this.formSocio.value.CardName,
      Cedula: this.formSocio.value.Cedula,
      FederalTaxID: this.formSocio.value.FederalTaxID
    }

    this.socioServicio.editar(objeto).subscribe({
      next:(data) => {
          this.router.navigate(["/"])
      },
      error:(err) => {
        console.log(err.message);       
      }
    })
  }

  volver() {
    this.router.navigate(["/"]);
  }
}