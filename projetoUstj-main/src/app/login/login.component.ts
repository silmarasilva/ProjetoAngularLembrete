import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Texto do primeiro botão
  textoBotao1: string;
  // Texto do segundo botão
  textoBotao2: string;
  // Booleano que idenfica se o formulário irá cadastrar um usuário ou efetuar o login
  cadastrarUsuario: boolean = true;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // inicia os valores do textos dos botões
    this.atualizarFormulario();
  }

  onSubmit(form: NgForm): void{
    // Caso o formulário esteja inválido não processa nada
    if (form.invalid) return;

    if (this.cadastrarUsuario) { // Caso seja um cadastro de usuário, valida a confirmação de senha
      if (form.value.senha !== form.value.confirmarSenha) {
        // Limpa o campo confirmarSenha
        form.controls["confirmarSenha"].setValue('');

        alert('Confirmação de senha inválida.');
        return;
      }
      // Executa o cadastro do usuário
      this.loginService.cadastrarUsuario(form.value.email, form.value.senha);
    } else { // Caso não seja um cadastro de usuário, é um login
      // Efetua o login
      this.loginService.efetuarLogin(form.value.email, form.value.senha);
    }
  }

  // Inverte a função do formulário entre Login e Cadastro de Usuário
  atualizarFormulario() {
    // Inverte o booleano que identifica o tipo do formulário
    this.cadastrarUsuario = !this.cadastrarUsuario;
    if (!this.cadastrarUsuario) { // Formulário de Login
      this.textoBotao1 = "Entrar";
      this.textoBotao2 = "Novo usuário";
    } else { // Formulário de cadastro de usuário
      this.textoBotao1 = "Cadastrar";
      this.textoBotao2 = "Voltar para o login";
    }
  }
}
