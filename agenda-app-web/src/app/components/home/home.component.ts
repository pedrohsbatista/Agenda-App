import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: Object;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.usuario = {
      id : window.localStorage.getItem("usuarioId"),
      nome: window.localStorage.getItem("usuarioNome")
    }
  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
