import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Direccion } from '../../Models/Direccion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SocioService } from '../../Services/socio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-direccion',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './direccion.component.html',
  styleUrl: './direccion.component.css'
})
export class DireccionComponent implements OnInit{
  @Input('CardCode')CardCode!: string;
  private socioServicio = inject(SocioService);
  // public formBuild = inject(FormBuilder);
  direccionForm: FormGroup;
  direccionId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private socioService: SocioService
    ) {
      this.direccionForm = this.fb.group({
        Id: [''],
        CardCode: [''],
        Name: [''],
        Country: [''],
        Province: [''],
        Canton: [''],
        District: [''],
        Address: [''],
        AddressType: [''],
        IsDefault: ['']
      });

      this.direccionId = +this.route.snapshot.params['id'];
    }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      
      this.CardCode = params.get('cardCode') || "";
      console.log(this.CardCode);
      
      this.direccionId = params.get('id') || null;

      this.socioService.obtenerDireccion(this.CardCode, +this.direccionId).subscribe({
        next: (data: Direccion) => {
          console.log(data);
          
          this.direccionForm.patchValue(
            data
            //{
            // Name: data.Name,
            // Country: data.Country,
            // Province: data.Province,
            // Canton: data.Canton,
            // District: data.District,
            // Address: data.Address,
            // AddressType: data.AddressType,
            // IsDefault: data.IsDefault,
          //}
          );
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    })
    
  }

  guardar() {
    const direccion: Direccion = this.direccionForm.value;

    this.socioService.editarDireccion(direccion).subscribe({
      next: (data) => {
        this.router.navigate(["/"])
      },
      error: (err) => {
        console.log(err.message);          
      }
    });
  }

  volver() {
    this.router.navigate(["/"])
  }
}