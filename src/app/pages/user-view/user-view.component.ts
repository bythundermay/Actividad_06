import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interfaces';
import { BotoneraComponent } from '../../components/botonera/botonera.component';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [BotoneraComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  activatedRoute = inject(ActivatedRoute)
  usersService = inject(UsersService)
  unUser!: IUser;
  
  ngOnInit():void{

    this.activatedRoute.params.subscribe(async (params: any)=>{
      // console.log(params.idserie)
      //parametros de rutas necesito que sean Numbers, cuando nos llegan estan en String hay que pasarlos number
      const id = params.idusuario//idserie es lo que hemos puesto en rutas

      try{
        this.unUser = await this.usersService.getById(id)
      }catch(error){
        console.log(error)

      }
    
    })
  }
}
