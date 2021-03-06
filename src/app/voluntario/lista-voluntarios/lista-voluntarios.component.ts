import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-lista-voluntarios',
  templateUrl: './lista-voluntarios.component.html',
  styleUrls: ['./lista-voluntarios.component.css']
})
export class ListaVoluntariosComponent implements OnInit {

  voluntarios: Object[];
  constructor(public tokenService: AngularTokenService, public apiService: ApiService, private router:Router) { }

  ngOnInit() {
    //this.apiService.getVoluntarios("voluntarios").subscribe((data : Object[])=>{
    this.apiService.get("voluntarios").subscribe((data : Object[])=>{
      console.log(data);
      this.voluntarios=data;
    });
  }

  delete(id:any){
    var path = 'voluntarios/' + id;
    this.apiService.deleteVoluntario(path).subscribe(
      (r)=>{
        console.log(r);
        this.router.navigateByUrl('/voluntarios');
        this.ngOnInit();
      }
    );
  }



}
