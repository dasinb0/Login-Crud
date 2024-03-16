import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaPersonasComponent } from './lista-personas/lista-personas.component';
import { AuthGuard } from './auth.guard';
import { EditarPersonaComponent } from './editar-persona/editar-persona.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'lista-personas',
    component: ListaPersonasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editar-persona/:id',
    component: EditarPersonaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
