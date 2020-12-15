import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

// Constante para identificação do registro no LocalStorage
const KEY = 'meusLembretes.usuarioLogado';

@Injectable({
    providedIn: 'root'
})
export class LoginService { // Serviço responsável por tudo relacionado ao login

    constructor(private httpClient: HttpClient, private router: Router) { }

    // Efetuar cadastro do Usuário
    cadastrarUsuario(email: string, senha: string): void {
        const usuario: Login = {
            id: null,
            email: email,
            senha: senha
        };
        this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/usuarios',
            usuario).subscribe((dados) => {
                console.log(dados.mensagem)
                // grava o usuário no LocalStorage
                window.localStorage.setItem(KEY, JSON.stringify({ id: dados.id, email: usuario.email }));
                // direciona para a tela de dashboard
                this.router.navigate(['dashboard']);
            });
    }

    // Efetuar o login
    efetuarLogin(email: string, senha: string): void {
        this.httpClient.post<any>('http://localhost:3000/api/login',
            { email, senha }).pipe(map((usuario) => {
                // o pipe serve para converter o tipo "usuario" retornado da api
                // para o tipo "usuario" definido no login.model.ts
                return { id: usuario._id, email }
            })).subscribe((usuario) => {
                // grava o usuário no LocalStorage
                window.localStorage.setItem(KEY, JSON.stringify(usuario));
                // direciona para o dashboard
                this.router.navigate(['dashboard']);
            }, (error) => {
                alert('Credenciais inválidas!');
                console.log(error);
            });
    }

    // Verfica se o usuário está logado
    usuarioEstaLogado() {
        return this.getUsuarioLogado() !== null;
    }

    // Recupera o usuário logado do LocalStorage
    getUsuarioLogado(): { id: string, email: string } {
        return JSON.parse(window.localStorage.getItem(KEY));
    }

    // Remove o usuário logado do LocalStorage
    removeUsuarioLogado() {
        window.localStorage.removeItem(KEY);
    }
}