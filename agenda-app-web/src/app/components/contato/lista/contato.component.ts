import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../../../utilities/notification';
import { Contato } from '../../../models/contato';
import { ContatoService } from '../../../services/contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'commands'];
  dataSource: MatTableDataSource<Contato>;
  filter: string;

  constructor(private contatoService : ContatoService, private notificationService : NotificationService) {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.get();
  }

  get(){
    this.contatoService.get(this.filter).subscribe((contatos : Contato[]) => {
      this.dataSource.data = contatos;
    }, (response) => {
      this.notificationService.openSnackBarDanger(response.error);
    })
  }

  delete(id : string) {
    this.contatoService.delete(id).subscribe((success) => {
      this.filter = undefined;
      this.get();     
    }, (response) => {
      this.notificationService.openSnackBarDanger(response.error);
    })
  }

  applyFilter(event : any){
    this.filter = event.target.value;
    this.get();
  }
}
