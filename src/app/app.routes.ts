import { Routes } from '@angular/router';
import { HomeComponent } from './pages/budgets/home/home.component';
import { BudgetComponent } from './pages/budgets/budget/budget.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"Inicio",component:HomeComponent},
    {path:"budget/:id",component:BudgetComponent}
];
