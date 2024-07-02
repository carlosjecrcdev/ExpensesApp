import { Component, Input, OnInit, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../../../services/budget.service';
import { Router } from '@angular/router';
import { Budget } from '../../../models/Budget';
import { HttpStatusCode } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule,MatIcon
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})

export class BudgetComponent implements OnInit {

  @Input('id') idBudget!:number;
  private budgetService = inject(BudgetService);
  public formBuild = inject(FormBuilder);

  public formBudget: FormGroup = this.formBuild.group({
    name:[''],
    amount:[0],
    startDate: [''],
    endDate: ['']
  })

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.idBudget != 0){
      this.budgetService.getById(this.idBudget).subscribe({
        next:(data) => {
          this.formBudget.patchValue({
            name: data.data?.name,
            amount: data.data?.amount
          })
        },
        error:(err) => {
          console.log(err.message);
        }
      })
    }  
  }

  save(){
    const objeto: Budget ={
      id: this.idBudget,
      name: this.formBudget.value.name,
      amount: this.formBudget.value.amount,
      startDate: this.formBudget.value.startDate,
      endDate: this.formBudget.value.endDate
    }

    if(this.idBudget == 0){
      this.budgetService.add(objeto).subscribe({
        next:(data) => {
          if(data.success){
            this.router.navigate(["/"]);
          }else{
            alert("Error al crear")
          }
        },
        error:(err) => {
          console.log(err.message);
        }
      })
    }else{
      this.budgetService.edit(objeto).subscribe({
        next:(data) => {
          if(data.success){
            this.router.navigate(["/"]);
          }else{
            alert("Error al editar")
          }
        },
        error:(err) => {
          console.log(err.message);
        }
      })
    }
  }

  back(){
    this.router.navigate(["/"]);
  }
}
