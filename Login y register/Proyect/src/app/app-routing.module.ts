import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, pathMatch: 'full' },
  {path: 'login/actualizar/:id', component: LoginComponent},
  {path: 'login/agregar', component: LoginComponent},
  {path: 'register', component: RegisterComponent, pathMatch: 'full' },
  {path: 'register/actualizar/:id', component: RegisterComponent},
  {path: 'register/agregar', component: RegisterComponent},
  {path: '**', redirectTo: '/home',pathMatch:'full'},
  { path: '**', component: AppComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
