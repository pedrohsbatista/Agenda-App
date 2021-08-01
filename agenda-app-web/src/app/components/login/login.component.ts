import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../utilities/notification';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router : Router,
    private loginService : LoginService, private notification : NotificationService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: [undefined, [Validators.required]],
      senha: [undefined, [Validators.required]]
    })
  }

  login(){
    if(this.loginForm.valid){
      var dados = this.loginForm.value;
      this.loginService.login(dados).subscribe((success) => {
        this.router.navigate(['/agenda']);
        window.localStorage.setItem('token', success.token);
        window.localStorage.setItem('usuarioId', success.usuario.id);
        window.localStorage.setItem('usuarioNome', success.usuario.nome);        
      }, (response) => {
        this.notification.openSnackBarDanger(response.error);
      })
    }
  }

}
