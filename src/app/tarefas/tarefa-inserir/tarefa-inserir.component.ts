import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { Tarefa } from '../tarefa.model';
import { TarefaService } from '../tarefa.service';

@Component({
  selector: 'app-tarefa-inserir',
  templateUrl: './tarefa-inserir.component.html',
  styleUrls: ['./tarefa-inserir.component.css'],
})
export class TarefaInserirComponent implements OnDestroy {

  // Inscrição do evento de inicio de edição de uma tarefa
  // é necessário guardar esta inscrição para ser removida no OnDestroy
  // e evitar problemas de memória
  private iniciaEdicaoSubscription: Subscription;
  // Tarefa que esta sendo editada
  public tarefaEditando: Tarefa;
  // Variável auxiliar para expansão do ExpansionPanel
  public expandir: boolean = false;

  constructor(private tarefaService: TarefaService, private loginService: LoginService) {
    // Inicia a inscrição do evento de incio de edição de tarefa, para quando houver uma nova notificação deste evento
    // o componente ExpansionPanel seja expandido e a tela foca no componente de edição
    this.iniciaEdicaoSubscription = tarefaService.getIniciaEdicaoObservable().subscribe(tarefa => {
      this.expandir = true;
      this.tarefaEditando = tarefa;
      window.scrollTo(0, 0);
    });
  }

  // Adicionar ou editar uma tarefa
  onSalvarTarefa(form: NgForm) {
    // Caso o formulário esteja inválido, retorna sem processar nada
    if (form.invalid) return;

    if (this.tarefaEditando) { // Caso exista uma tarefa em edição
      this.tarefaService.atualizarTarefa(
        this.tarefaEditando.id,
        form.value.titulo,
        form.value.descricao,
        this.tarefaEditando.dataCadastro,
        form.value.dataConclusao,
        this.loginService.getUsuarioLogado().id
      );
    } else { // Se não, adiciona uma tarefa
      this.tarefaService.adicionarTarefa(
        form.value.titulo,
        form.value.descricao,
        form.value.dataConclusao,
        this.loginService.getUsuarioLogado().id
      );
    }

    // Limpa o formulário
    form.resetForm();
    // Limpa a tarefa de edição
    this.tarefaEditando = null;
  }

  ngOnDestroy(): void { // limpa a inscrição para liberar a memória
    this.iniciaEdicaoSubscription.unsubscribe();
  }
}
