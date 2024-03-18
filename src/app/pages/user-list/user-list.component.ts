import { Component, NgModule, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interfaces';
import { RouterLink } from '@angular/router';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { Idatos } from '../../interfaces/idatos.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink,UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
 userService = inject(UsersService);
  arrUsuarios: IUser [] = []
    currentPage: number = 1;
    totalPage: number = 0;


  ngOnInit () {
    //Inicia funcion para cargar los usuarios por paginas, empezando en la 1
    this.getUsuarios()

     }
  
    getUsuarios():void{
      this.userService.getUsersByPage(this.currentPage)
         .subscribe((data: Idatos) => {
          this.arrUsuarios = data.results;
          this.totalPage = data.total_pages; // Actualiza el número total de páginas disponibles
          console.log(this.arrUsuarios);
        });
    }

    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getUsuarios();
      }
    }
  
    nextPage(): void { 
      if (this.currentPage < this.totalPage) {
        this.currentPage++;
        this.getUsuarios();
      } else if (this.currentPage === this.totalPage) {
        this.currentPage = 1; // Vuelve a la página 1 si estás en la última página
        this.getUsuarios();
      }
      // Aquí podrías incluir una lógica para verificar si hay más páginas disponibles antes de incrementar
    
    }

    cargarPagina(){
      this.userService.getUsersByPage(this.currentPage).subscribe(data =>this.arrUsuarios = data.results)
    }

    numberPage(numeroPagina: number){

      this.currentPage = numeroPagina
      this.cargarPagina()

    }
  
}
