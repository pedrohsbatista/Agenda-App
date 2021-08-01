import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda } from 'src/app/models/agenda';
import { AgendaService } from 'src/app/services/agenda.service';
import { NotificationService } from '../../../utilities/notification';
import * as moment from 'moment';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements OnInit {
  agendaForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private agendaService : AgendaService, 
    private notificationService : NotificationService, private router : Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createAgendaForm();
    if(this.activatedRoute.snapshot.params.id)    {
      this.agendaService.getById(this.activatedRoute.snapshot.params.id).subscribe((agenda: Agenda) => {
        this.agendaForm.controls['id'].setValue(agenda.id);
        this.agendaForm.controls['dataAgendamento'].setValue(moment(agenda.dataAgendamento).format("yyyy-MM-DD"));
        this.agendaForm.controls['descricao'].setValue(agenda.descricao);
      }, (response) => {
        this.notificationService.openSnackBarDanger(response.error);
      })
    } 
  }

  createAgendaForm(){
    this.agendaForm = this.formBuilder.group({
       id: undefined,
       dataAgendamento: [undefined, [Validators.required]],
       descricao: [undefined, [Validators.required, Validators.maxLength(100)]]
    })
  }

  save(){
    if(this.agendaForm.valid){
      var dados = this.agendaForm.value;
      dados.dataAgendamento = moment(dados.dataAgendamento).toDate();
      if(dados.id){
        this.agendaService.put(dados).subscribe((success) => {
            this.router.navigate(['/agenda']);
        }, (response) => {
          this.notificationService.openSnackBarDanger(response.error);
        });
      } else {
        this.agendaService.post(dados).subscribe((success) => {
          this.router.navigate(['/agenda']);
        }, (response) => {
          this.notificationService.openSnackBarDanger(response.error);
        })
      }
    }
  }
}