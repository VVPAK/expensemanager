import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/index';
import { LoginComponent } from './_components/login/index';
import { RegisterComponent } from './_components/register/index';
import { AuthGuard, AdminGuard } from './_guards/index';
import { UsersComponent } from './_modules/users/components/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
