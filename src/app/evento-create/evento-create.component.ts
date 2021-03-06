import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from "@angular/forms";

import { Evento } from '../evento';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-evento-create',
  templateUrl: './evento-create.component.html',
  styleUrls: ['./evento-create.component.css']
})
export class EventoCreateComponent implements OnInit {
  public evento: Evento = new Evento();
  public form: FormGroup;

  public imgURL: string = './assets/images/eventGran.png';
  // public fileToUpload : File =null;
  @ViewChild('btnClose') btnClose : ElementRef ;
  public loading : Boolean;


  constructor(public apiService: ApiService , public acRoute : ActivatedRoute, private location: Location, public fb: FormBuilder, public router:Router) {
    // this.form = this.fb.group({
    //   id:[""],
    //   picture: [null],
    //   titulo: [''],
    //   fecha:[''],
    //   lugar: [''],
    //   hora: [''],
    //   descripcion: ['']
    // })
  }

  ngOnInit() {
    this.acRoute.params.subscribe((data : any) => {
      console.log(data.id);
      if(data && data.id){
          this.apiService.getEvento(data.id).subscribe((data: Evento)=>{
            // this.form.get("titulo").setValue(data.titulo);
            // this.form.get("id").setValue(data.id);
            // this.form.get("lugar").setValue(data.lugar);
            // this.form.get("hora").setValue(data.hora);
            // this.form.get("fecha").setValue(data.fecha);
            // this.form.get("descripcion").setValue(data.descripcion);
            // this.imgURL = `http://localhost:3000/calendarios/${data.id}/download`;

            console.log(data);
            this.evento = data;
          });
      }
      else {
          this.evento = new Evento();
      }
      })
  }

  // uploadImage(event)
  // {
  //   var reader = new FileReader();
  //   const file = (event.target as HTMLInputElement).files[0];

  //   this.form.patchValue({picture: file});
  //   this.form.get('picture').updateValueAndValidity()
  //   console.log(event);
    
  //   this.fileToUpload = file;
  //   reader.onload = (event:any)=>{ this.imgURL = event.target.result;}
  //   reader.readAsDataURL(this.fileToUpload);
  // }

  public onSubmit() {
    console.log("Adding a product: " + this.evento.titulo);

    if(this.evento.id) {
      this.apiService.updateEvento("calendarios/"+this.evento.id,this.evento).subscribe((r)=>{
          console.log(r);
          this.location.back();
          this.btnClose.nativeElement.click();
      })
    }
    else {
      this.apiService.createEvento("calendarios",this.evento).subscribe((r)=>{
        console.log(r);
        this.location.back();
        this.btnClose.nativeElement.click();
        });
    }
  }

  submitForm() {
    if (this.evento.titulo==null|| this.evento.titulo==undefined|| this.evento.titulo==''){
      alert('El nombre del evento es requerido');
      this.btnClose.nativeElement.click();
    }

    // if (this.form.get('titulo').value==null|| this.form.get('titulo').value==undefined|| this.form.get('titulo').value==''){
    //   alert('El nombre del evento es requerido');
    //   this.btnClose.nativeElement.click();
    // }
    // else if (this.form.get('lugar').value==null|| this.form.get('lugar').value==undefined|| this.form.get('lugar').value==''){
    //   alert('El lugar es requerido');
    //   this.btnClose.nativeElement.click();
    // }
    // else if (this.form.get('fecha').value==null|| this.form.get('fecha').value==undefined|| this.form.get('fecha').value==''){
    //   alert('La fecha es requerida');
    //   this.btnClose.nativeElement.click();
    // }
    // else if (this.form.get('hora').value==null|| this.form.get('hora').value==undefined|| this.form.get('hora').value==''){
    //   alert('El hora es requerida');
    //   this.btnClose.nativeElement.click();
    // }
    else {
      this.loading = true;
      console.log("Adding a event: " + this.evento.titulo);
      if(this.evento.id) {
        this.apiService.updateEvento("calendarios/"+this.evento.id,this.evento).subscribe((r)=>{
            console.log(r);
            this.location.back();
            this.btnClose.nativeElement.click();
        })
      }
      else {
        this.apiService.createEvento("calendarios",this.evento).subscribe((r)=>{
          console.log(r);
          this.location.back();
          this.btnClose.nativeElement.click();
          });
      }
    }

      // var formData: any = new FormData();
      // if (this.form.get('picture').value !=null) {
      //   formData.append("picture", this.form.get('picture').value);
      // }
      // formData.append("titulo", this.form.get('titulo').value);
      // formData.append("lugar", this.form.get('lugar').value);
      // formData.append("hora", this.form.get('hora').value);
      // formData.append("fecha", this.form.get('fecha').value);
      // formData.append("descripcion", this.form.get('descripcion').value);
      // console.log(this.form.value);
      // if (this.evento.id) {
      //   this.apiService.updateEvento("calendarios/"+this.evento.id, formData).subscribe((r)=>{
      //     console.log(r);
      //     this.location.back();
      //     this.btnClose.nativeElement.click();
      //   })
      // }
      // else {
      //   this.apiService.createEvento("calendarios", formData).subscribe(
      //     (r)=>{
      //       console.log(r);
      //       this.location.back();
      //       this.btnClose.nativeElement.click();
      //     });
      // }
  }

  goBack(): void {
    this.location.back();
  }
  getImgURL() {
    return this.imgURL;
  }
}

