import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  usersForm: FormGroup;
  userService = inject(UsersService);
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)



  constructor(){
    this.usersForm = new FormGroup({
      // _id: new FormControl('',[]),
      // id: new FormControl('',[]),
      nombre: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      apellido: new FormControl('',[
        Validators.required,
        Validators.minLength(3)

      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      imagen: new FormControl('',[
        Validators.required,
        Validators.pattern(/^(https?|ftp):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/)

      ]),
      

    }, [])
  }
  
  

   async getDataForm(){
   if(this.usersForm.value._id){
     const response = await this.userService.update(this.usersForm.value);

     if(response.id){
       alert(`el usuario ${response.username} se a actualizado correctamente`)
       this.router.navigate(['/usuarios'])
       //no se por que me devuelve undefined, en el array no llega el frist name, solo email, id y foto
       //si le pongo el responde.ID si lo coge. 
     }else{
       alert(Error)
     }

   }else{
     const response = await this.userService.insert(this.usersForm.value)
    
     if(response.id){
       alert(`El usuario ${response.username} se ha añadido correctamente`)
       this.router.navigate(['/usuarios'])
     }else{
       alert(Error)
     }
   }
 }

ngOnInit(){
  this.activatedRoute.params.subscribe(async(params: any)=>{
    if(params.id){
      const response = await this.userService.getById(params.id)

      this.usersForm = new FormGroup({
        // _id: new FormControl('',[]),
        // id: new FormControl('',[]),
        nombre: new FormControl(response.first_name,[
        
        ]),
        apellido: new FormControl(response.last_name,[]),
        email: new FormControl(response.email,[]),
        imagen: new FormControl(response.image,[]),
        
  
      }, [])


    }
  })
}


checkControl(formControlName: string, validador: string): boolean | undefined {
  return this.usersForm.get(formControlName)?.hasError(validador) && this.usersForm.get(formControlName)?.touched
}

}
