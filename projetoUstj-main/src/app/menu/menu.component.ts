import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // Variável para recuperar e exibir o e-mail do usuário na tela
  emailUsuario: string;
  // Injetamos o serviço de login no contrutor para recuperar o e-mail do usuário
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // Recupera o e-mail do usuário através do serviço de login, logo ao criar o componente
    this.emailUsuario = this.loginService.getUsuarioLogado().email;
  }

  onSair(): void {
    // Remove o usuário logado do localStorage para encerrar a sessão
    this.loginService.removeUsuarioLogado();
    // Atualiza a página para o usuário ser direcionado para a tela de login
    window.location.reload();
  }
}
