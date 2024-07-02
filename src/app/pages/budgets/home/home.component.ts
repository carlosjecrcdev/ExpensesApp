import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { BudgetService } from '../../../services/budget.service';
import { Budget } from '../../../models/Budget';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private budgetServices = inject(BudgetService);
  public listBudget:Budget[] = [];
  public displayedColumns: string[] = ['nombre','monto','fechainicio','accion'];

  public getBudgets(){
    this.budgetServices.get().subscribe({
      next:(data)=>{
        if(data.success){
          this.listBudget = data.data || [];
        }
      },
      error:(err)=>{
        console.log(err.message);              
      }
    })
  }

  add(){
    this.router.navigate(["/budget",0])
  }

  edit(objeto:Budget){
    this.router.navigate(['/budget',objeto.id])
  }

  delete(objeto:Budget){
    if(confirm("Desea eliminar el budget" + objeto.name)){
      this.budgetServices.delete(objeto.id).subscribe({
        next:(data)=>{
          if(data){
            this.getBudgets();
          }else{
            alert("No se pudo eliminar")
          }
        },
        error:(err)=>{
          console.log(err.message);              
        }
      })
    }
  }
  constructor(private router:Router){
    this.getBudgets();
  }
}
