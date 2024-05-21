import { Routes } from '@angular/router';
import { AdminLoginComponent } from './modules/admin-login/admin-login.component';
import { HomeComponent } from './modules/home/home.component';
import { MenuComponent } from './modules/menu/menu.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { authGuard } from './shared/auth.guard';
import { authGuardLog } from './shared/auth.guardlog';
import { CartComponent } from './modules/cart/cart.component';
import { DetailsComponent } from './modules/details/details.component';

export const routes: Routes = [
    {path:'', component:HomeComponent , title: "Restauracja :)"},
    {path:'login', component:AdminLoginComponent, canActivate: [authGuardLog], title: "Logowanie"},
    {path:'menu', component:MenuComponent, title: "Menu"},
    {path:'cart', component:CartComponent, title: "Koszyk"},
    {path:'dashboard/orders', component:DashboardComponent, canActivate: [authGuard], title: "Dashboard"},
    {path:'dashboard/details', component:DetailsComponent, canActivate: [authGuard], title: "Dashboard"},
    {path:'dashboard', redirectTo:'dashboard/orders'}
];
