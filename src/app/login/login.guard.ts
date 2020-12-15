import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router) { }

    canActivate( // Verificar se a rota pode ser acessada ou não, é configurado no AppRoutingModule
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        // Verifica se o usuário esta logado
        if (!this.loginService.usuarioEstaLogado()) {
            this.router.navigate(['login']); // redireciona para o login
            return false;
        }
        return true; // Caso esteja logado, retorna true
    }
}