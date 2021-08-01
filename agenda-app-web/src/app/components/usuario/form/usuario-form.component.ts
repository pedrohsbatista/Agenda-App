import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/utilities/notification';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService : UsuarioService, private loginService : LoginService,
    private notificationService: NotificationService, private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.createUsuarioForm();
    if(this.activatedRoute.snapshot.params.id){
      this.usuarioService.getById(this.activatedRoute.snapshot.params.id).subscribe((usuario: Usuario) => {
       this.usuarioForm.controls['id'].setValue(usuario.id);
       this.usuarioForm.controls['nome'].setValue(usuario.nome);
       this.usuarioForm.controls['email'].setValue(usuario.email);
       this.applyValidation();
      }, (response) => {
        this.notificationService.openSnackBarDanger(response.error);
      })
    }
  }

  createUsuarioForm(){
    this.usuarioForm = this.formBuilder.group({
      id: undefined,
      nome: [undefined, [Validators.required, Validators.maxLength(100)]],
      email: [undefined, [Validators.required, Validators.maxLength(100)]],
      senha: [undefined, [Validators.required, Validators.maxLength(50), Validators.minLength(6)]]
    })
  }

  applyValidation() {
    if (this.usuarioForm.controls['id'].value && !this.usuarioForm.controls['senha'].value) {
      this.usuarioForm.controls['senha'].clearValidators();
      this.usuarioForm.controls['senha'].updateValueAndValidity();
    } else {
      this.usuarioForm.controls['senha'].setValidators([Validators.required, Validators.maxLength(50), Validators.minLength(6)]);
      this.usuarioForm.controls['senha'].updateValueAndValidity();
    }
  }

  save(){
    if (this.usuarioForm.valid) {
      var dados = this.usuarioForm.value;
      if(dados.id){
        if(!dados.senha) {
          delete dados.senha;
        }
        this.usuarioService.put(dados).subscribe((success) => {
          this.router.navigate(['/agenda']);
          window.localStorage.setItem('usuarioNome', dados.nome);
        }, (response) => {
          this.notificationService.openSnackBarDanger(response.error);
        })
      } else {
        this.usuarioService.post(dados).subscribe((success) => {
           this.loginService.login(dados).subscribe((success) => {
             window.localStorage.setItem('token', success.token);
             window.localStorage.setItem('usuarioId', success.usuario.id);
             window.localStorage.setItem('usuarioNome', success.usuario.nome);
             this.router.navigate(['/agenda']);        
           })
        }, (response) => {
          this.notificationService.openSnackBarDanger(response.error);
        })
      }
    }    
  }

  delete(){
    this.usuarioService.delete(window.localStorage.getItem("usuarioId")).subscribe((success) => {
      window.localStorage.clear();
      this.router.navigate(['/login']);
    }, (response) => {
      this.notificationService.openSnackBarDanger(response.error);
    })
  }
}
