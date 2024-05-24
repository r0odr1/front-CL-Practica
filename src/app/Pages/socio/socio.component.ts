import { Component, Inject, inject, Input, OnDestroy, OnInit } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SocioService } from '../../Services/socio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Socio } from '../../Models/Socio';
import { Direccion } from '../../Models/Direccion';

import { ICLTableButton, ICLTableState, MapDisplayColumns, MappedColumns, TableModule } from '@clavisco/table';
import { CL_CHANNEL, CL_DISPLAY, ICLCallbacksInterface, ICLEvent, LinkerService, Register, Run, StepDown } from '@clavisco/linker';
import { Subscription } from 'rxjs';
import { CLPrint, Structures } from '@clavisco/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-socio',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    TableModule
  ],
  providers: [
    {
      provide: "linkerervice",
      useClass: LinkerService
    }
  ],
  templateUrl: './socio.component.html',
  styleUrl: './socio.component.css'
})

export class SocioComponent implements OnInit, OnDestroy {
  subscription$: Subscription;
  tableId: string = 'TableId';
  tableMappedColumns: MappedColumns;
  records: Direccion[] = [];
  buttons: ICLTableButton[] = [];

  callbacks: ICLCallbacksInterface<CL_CHANNEL> = {
    Callbacks: {},
    Tracks: []
  };

  @Input('CardCode')CardCode!: string;
  private socioServicio = inject(SocioService);
  public formBuild = inject(FormBuilder);

  public formSocio: FormGroup = this.formBuild.group({
    CardCode:[''],
    CardName:[''],
    Cedula:[''],
    FederalTaxID:['']
  });

  public direcciones: Direccion[] = [];
  
  constructor(private router:Router, @Inject('LinkerService') private linkerervice: LinkerService, private dialog: MatDialog) {
    this.subscription$ = new Subscription();
    this.tableMappedColumns = MapDisplayColumns({
      dataSource: this.records,
      renameColumns: { Id: "ID" },
      iconColumns: ['ActiveIcon']
      });
      this.buttons = [
        {
          Title: 'Editar',
          Action: Structures.Enums.CL_ACTIONS.UPDATE,
          Icon: `edit`,
          Color: `primary`,
          Data: ''
        }
      ]
  }

  ButtonsEvent = (_event: ICLEvent): void => {
    if (_event.Data) {
      const BUTTON_EVENT = JSON.parse(_event.Data);
      const ELEMENT = JSON.parse(BUTTON_EVENT.Data);

      console.log(ELEMENT);

      if(BUTTON_EVENT.Action === Structures.Enums.CL_ACTIONS.UPDATE) {
        this.router.navigate([`/Address/${ELEMENT.CardCode}/${ELEMENT.Id}`])
      }

      // switch (BUTTON_EVENT.Action) {
      //   case Structures.Enums.CL_ACTIONS.UPDATE:
      //     this.router.navigate(['/direccion', ELEMENT.Id]);
          
      //       console.log(ELEMENT);
      //       break;               
      // }
    }
  }

  ngOnInit(): void {
    Register<CL_CHANNEL>(this.tableId, CL_CHANNEL.OUTPUT, this.ButtonsEvent, this.callbacks);
    this.subscription$.add(
      this.linkerervice.Flow()?.pipe(
        StepDown<CL_CHANNEL>(this.callbacks)
      ).subscribe({
        next: (callback: ICLEvent) => {
          Run(this.tableId, callback, this.callbacks.Callbacks);
        },
        error: (err) => {
          CLPrint(err, CL_DISPLAY.ERROR)
        }
      })
    );

    this.socioServicio.obtener(this.CardCode).subscribe({
      next:(data: any) => {
 
        this.formSocio.patchValue({
          CardCode: data.Data.CardCode,
          CardName:data.Data.CardName,
          Cedula: data.Data.Cedula,
          FederalTaxID: data.Data.FederalTaxID
        });
      },
      error:(err) => {
        console.log(err.message);
      }
    })
    this.obtenerDirecciones();
  }

  InflateTable(): void {
    const NEW_TABLE_STATE = {
      Records: this.records,
      RecordsCount: this.records.length
    } as ICLTableState<Direccion>      
    
    this.linkerervice.Publish({
      Target: this.tableId,
      Data: JSON.stringify(NEW_TABLE_STATE),
      CallBack: CL_CHANNEL.INFLATE
    });
  }

  obtenerDirecciones(): void {
    this.socioServicio.obtenerDirecciones(this.CardCode).subscribe({
      next: (data: any) => {
        this.direcciones = data?.Data;
        this.records = data?.Data;
        this.InflateTable();    
        },
        error: (err) => {
          console.log(err.message);
        }
      });
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
    });
  }

  volver() {
    this.router.navigate(["/"]);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}