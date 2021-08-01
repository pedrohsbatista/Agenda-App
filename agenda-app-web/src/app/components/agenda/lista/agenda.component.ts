import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Agenda } from '../../../models/agenda';
import { AgendaService } from '../../../services/agenda.service';
import { NotificationService } from '../../../utilities/notification';
import * as moment from 'moment';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  displayedColumns: string[] = ['descricao', 'commands'];
  dataSource: MatTableDataSource<Agenda>;
  filter: string = moment().format("yyyy-MM-DD");

  constructor(private agendaService : AgendaService, private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.get();
  }

  get(){
    var filter = this.filter ? moment(this.filter).toISOString() : this.filter;
    this.agendaService.get(filter).subscribe((agendas : Agenda[]) => {
      this.dataSource.data = agendas;
    }, (response) => {
      this.notificationService.openSnackBarDanger(response.error);
    });
  }
  
  delete(id: string){
    this.agendaService.delete(id).subscribe((success) => {
      this.get();
    }, (response) => {
      this.notificationService.openSnackBarDanger(response.error);
    })    
  }

  applyFilter(event : any) {
    this.filter = event.target.value;
    this.get();
  }
}
