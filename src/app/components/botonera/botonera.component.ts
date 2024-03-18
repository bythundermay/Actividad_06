import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-botonera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {
  @Input() idUsuario: string | undefined ="";
  @Input() parent: string = "";
  userService = inject(UsersService)

  async borrarUsuario(id: string | undefined) {
    if (id !== undefined) {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede revertir.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borrarlo"
      });
      
      if (confirmacion.isConfirmed) {
        try {
          const response = await this.userService.delete(id);
          if (response._id) {
            await Swal.fire({
              title: "¡Borrado!",
              text: (`el usuario ${response.username} se a borrado correctamente`),
              icon: "success"
            });
          } else {
            await Swal.fire({
              title: "Error",
              text: "Ocurrió un error al borrar el usuario.",
              icon: "error"
            });
          }
        } catch (error) {
          console.error(error);
          await Swal.fire({
            title: "Error",
            text: "Ocurrió un error al borrar el usuario. Por favor, inténtalo de nuevo más tarde.",
            icon: "error"
          });
        }
      }
    }
  }




}
