import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
    {path:"", pathMatch:"full", redirectTo:"usuarios"},
    {path: "usuarios", component: UserListComponent},
    {path: "usuario/:idusuario", component: UserViewComponent},
    {path: "newuser", component: FormComponent},
    {path: "updateuser/:id", component: FormComponent}
];
