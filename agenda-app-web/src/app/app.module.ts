import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AgendaComponent } from './components/agenda/lista/agenda.component';
import { ContatoComponent } from './components/contato/lista/contato.component';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AgendaFormComponent } from './components/agenda/form/agenda-form.component';
import { ContatoFormComponent } from './components/contato/form/contato-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ValidatorFormComponent } from './utilities/validator-form/validator-form.component';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioFormComponent } from './components/usuario/form/usuario-form.component';
import { MatMenuModule } from '@angular/material/menu';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgendaComponent,
    ContatoComponent,
    HomeComponent,
    AgendaFormComponent,
    ContatoFormComponent,
    ValidatorFormComponent,
    UsuarioFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
    MatIconModule,
    MatMenuModule
  ],
  providers: [  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
