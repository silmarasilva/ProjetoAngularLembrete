import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from "@angular/material/datepicker";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from './login/login.guard';
import { TarefaInserirComponent } from './tarefas/tarefa-inserir/tarefa-inserir.component';
import { TarefaListarComponent } from './tarefas/tarefa-listar/tarefa-listar.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [LoginGuard]
    }
];

@NgModule({
    declarations: [
        TarefaInserirComponent,
        TarefaListarComponent,
        LoginComponent,
        DashboardComponent,
        MenuComponent
    ],
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }