import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'signup', loadComponent: () => import('./login/register/register.component').then((c) => c.RegisterComponent) },
    { path: 'home', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
    { path: 'login', loadComponent: () => import('./login/login/login.component').then((c) => c.LoginComponent) },
    { path: 'admin', loadComponent: () => import('./admin/admin.component').then((c) => c.AdminComponent) },
    { path: 'user', loadComponent: () => import('./user/user.component').then((c) => c.UserComponent) },
    { path: 'book', loadComponent: () => import('./user/user-book/user-book.component').then((c) => c.UserBookComponent) },
    { path: 'createRestaurant', loadComponent: () => import('./admin/admin-create/admin-create.component').then((c) => c.AdminCreateComponent) },
    { path: 'createTable', loadComponent: () => import('./admin/admin-create-table/admin-create-table.component').then((c) => c.AdminCreateTableComponent) },
    { path: '**', redirectTo: 'home' },
];
