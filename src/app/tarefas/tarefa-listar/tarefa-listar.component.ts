import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tarefa } from '../tarefa.model';
import { TarefaService } from '../tarefa.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-tarefa-listar',
  templateUrl: './tarefa-listar.component.html',
  styleUrls: ['./tarefa-listar.component.css'],
})
export class TarefaListarComponent implements OnInit, OnDestroy {

  // Lista de tarefas a serem exibidas
  tarefas: Tarefa[] = [];
  // Inscrição do evento de lista de tarefas atualizadas
  // é necessário guardar esta inscrição para ser removida no OnDestroy
  // e evitar problemas de memória
  private tarefasSubscription: Subscription;

  constructor(private tarefaService: TarefaService, private loginService: LoginService) {

  }

  ngOnInit(): void {
    // Carrega a lista de tarefas logo ao criar o componente
    this.tarefaService.getTarefasDoUsuario(this.loginService.getUsuarioLogado().id);
    // Inicia a inscrição do evento de tarefas atualizada, para quando houver uma nova notificação deste evento
    // seja atualizada a lista de tarefas do componente 
    this.tarefasSubscription = this.tarefaService.getListaDeTarefasAtualizadaObservable().subscribe((tarefas: Tarefa[]) => {
      this.tarefas = tarefas;
    });
  }

  ngOnDestroy(): void { // limpa a inscrição para liberar a memória
    this.tarefasSubscription.unsubscribe();
  }

  // Executar a exclusão da tarefa
  onDelete(id: string): void { 
    this.tarefaService.excluirTarefa(id);
  }

  // Notifica o evento de inicio de edição de uma tarefa
  onEdit(tarefa: Tarefa): void {
    this.tarefaService.iniciarEdicaoTarefa(tarefa);
  }

  // Retorna a class CSS que representa a cor do lembrete baseado na data de conclusão
  trocaCor(dataConclusao: Date) {
    // Subtrai a data de conclusão pela data atual
    let diferenca = new Date(dataConclusao).getTime() - Date.now();
    // Converte a diferença para horas
    let difHoras = Math.round(diferenca / (1000 * 3600));
    let retorno = "";
    if (difHoras >= 98) { // Caso a diferença seja maior que 4 dias (98 horas)
      retorno = "verde";
    } else if (difHoras >= 0) { // Caso a diferença seja maior ou igual a 0 horas
      retorno = "amarelo";
    } else { // Se não, está atrasado!
      retorno = "vermelho";
    }

    return retorno;
  }
}
