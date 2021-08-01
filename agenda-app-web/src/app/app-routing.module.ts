import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaFormComponent } from './components/agenda/form/agenda-form.component';
import { AgendaComponent } from './components/agenda/lista/agenda.component';
import { ContatoFormComponent } from './components/contato/form/contato-form.component';
import { ContatoComponent } from './components/contato/lista/contato.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioFormComponent } from './components/usuario/form/usuario-form.component';

const routes: Routes = [
    { path: '', component: LoginComponent, children: [ { path: 'login', component: LoginComponent }] },
    { path: '', component: HomeComponent, children: [ { path: 'agenda', component: AgendaComponent  }] },
    { path: '', component: HomeComponent, children: [ { path: 'agendaForm', component: AgendaFormComponent }]},
    { path: '', component: HomeComponent, children: [ { path: 'agendaForm/:id', component: AgendaFormComponent }]},
    { path: '', component: HomeComponent, children: [ { path: 'contato', component: ContatoComponent }] },
    { path: '', component: HomeComponent, children: [ { path: 'contatoForm', component: ContatoFormComponent }] },
    { path: '', component: HomeComponent, children: [ { path: 'contatoForm/:id', component: ContatoFormComponent }] },
    { path: '', component: UsuarioFormComponent, children: [ { path: 'usuarioForm', component: UsuarioFormComponent } ] },
    { path: '', component: HomeComponent, children: [ { path: 'usuarioForm/:id', component: UsuarioFormComponent } ] }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {}