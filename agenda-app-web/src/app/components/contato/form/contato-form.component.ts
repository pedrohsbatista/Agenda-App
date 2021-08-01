import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';
import { NotificationService } from 'src/app/utilities/notification';

@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html',
  styleUrls: ['./contato-form.component.css']
})
export class ContatoFormComponent implements OnInit {
  contatoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private contatoService: ContatoService,
    private notificationService : NotificationService, private router : Router, private activatedRoute : ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.createContatoForm();
    if(this.activatedRoute.snapshot.params.id) {
      this.contatoService.getById(this.activatedRoute.snapshot.params.id).subscribe((contato : Contato) => {
        this.contatoForm.controls['id'].setValue(contato.id);
        this.contatoForm.controls['nome'].setValue(contato.nome);
        this.contatoForm.controls['email'].setValue(contato.email);
        this.contatoForm.controls['telefone'].setValue(contato.telefone);
        this.contatoForm.controls['celular'].setValue(contato.celular);
      }, (response) => {
        this.notificationService.openSnackBarDanger(response.error);
      })
    }
  }

  createContatoForm(){
    this.contatoForm = this.formBuilder.group({
      id: undefined,
      nome: [undefined, [Validators.required, Validators.maxLength(100)]],
      email: [undefined, [Validators.maxLength(100)]],
      telefone: [undefined, [Validators.maxLength(10)]],
      celular: [undefined, [Validators.maxLength(11)]]
    })
  }

  save(){
    if (this.contatoForm.valid) {
      var dados = this.contatoForm.value;
      if(dados.id) {
        this.contatoService.put(dados).subscribe((success) => {
          this.router.navigate(['/contato']);
        }, (response) => {
          this.notificationService.openSnackBarDanger(response.error);
        })
      } else {
        this.contatoService.post(dados).subscribe((success) => {
          this.router.navigate(['/contato']);
        }, (response) => {
          this.notificationService.openSnackBarDanger(response.error);
        })
      }
    }
  }
}
