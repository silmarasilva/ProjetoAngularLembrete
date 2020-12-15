import { Injectable } from '@angular/core';
import { Tarefa } from './tarefa.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TarefaService { // Serviço responsável por tudo relacionado gerenciamento de tarefas

  constructor(private httpClient: HttpClient) { }
  // Evento responsável por notificar a atualização da lista de tarefas
  private listaTarefasAtualizada = new Subject<Tarefa[]>();
  // Evento responsável por indicar o início da edição de uma tarefa
  private iniciaEdicao = new Subject<Tarefa>();

  // Lista de tarefas do usuário
  private tarefas: Tarefa[] = [];

  // Consultar as tarefas de um usuário
  getTarefasDoUsuario(idUsuario: string): void {
    this.httpClient.get<{ mensagem: string, tarefas: any }>(`http://localhost:3000/api/tarefas/${idUsuario}`)
      .pipe(map((dados) => {
        // o pipe serve para converter o tipo "tarefa" retornado da api
        // para o tipo "tarefa" definido no tarefa.model.ts
        return dados.tarefas.map(tarefa => {
          return { id: tarefa._id, ...tarefa };
        });
      })).subscribe(
        (dados) => {
          // Atualiza a lista de tarefas com as tarefas retornadas pela api
          this.tarefas = dados;
          // Notifica através do evento a nova lista de tarefas
          this.listaTarefasAtualizada.next([...this.tarefas]);
        }
      );
  }

  // Adicionar nova tarefa no banco de dados
  adicionarTarefa(titulo: string, descricao: string, dataConclusao: Date, idUsuario: string): void {
    const tarefa: Tarefa = {
      id: null,
      titulo: titulo,
      descricao: descricao,
      dataConclusao: dataConclusao,
      dataCadastro: new Date(),
      idUsuario: idUsuario
    };

    this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/tarefas',
      tarefa).subscribe((dados) => {
        console.log(dados.mensagem);
        // Atualiza a propriedade 'id' na tarefa - antes ela estava nula
        tarefa.id = dados.id;
        // Adiciona a nova tarefa na lista de tarefas
        this.tarefas.push(tarefa);
        // Notifica através do evento que existe uma nova lista de tarefas
        this.listaTarefasAtualizada.next([...this.tarefas]);
      });
  }

  // Atualizar uma tarefa no banco de dados
  atualizarTarefa(id: string, titulo: string, descricao: string, dataCadastro: Date, dataConclusao: Date, idUsuario: string) {
    const tarefa: Tarefa = { 
      id,
      titulo,
      descricao,
      dataCadastro,
      dataConclusao,
      idUsuario
    };

    this.httpClient.put(`http://localhost:3000/api/tarefas/${id}`, tarefa).subscribe(() => {
      // Cria uma cópia da lista de tarefas
      const copia = [...this.tarefas];
      // Recupera a tarefa a ser atualizada da lista de copia
      const indice = copia.findIndex(tar => tar.id === tarefa.id);
      // Atualiza a tarefa baseada no indice
      copia[indice] = tarefa;
      // Atualiza a lista de tarefas pela lista de copia com a tarefa atualizada
      this.tarefas = copia;
      // Notifica através do evento que existe uma nova lista de tarefas
      this.listaTarefasAtualizada.next([...this.tarefas]);
    });
  }

  // Método para recuperar o evento de atualização de lista de tarefas (apenas em modo observador)
  getListaDeTarefasAtualizadaObservable() {
    return this.listaTarefasAtualizada.asObservable();
  }

  // Método para recuperar o evento que indica o início de edição de uma tarefa (apenas em modo observador)
  getIniciaEdicaoObservable() {
    return this.iniciaEdicao.asObservable();
  }

  // Notifica através o início de edição de uma tarefa
  iniciarEdicaoTarefa(tarefa: Tarefa) {
    this.iniciaEdicao.next({ ...tarefa });
  }

  // Excluir uma tarefa do banco de dados
  excluirTarefa(id: string): void {
    this.httpClient.delete(`http://localhost:3000/api/tarefas/${id}`).subscribe(() => {
      // Atualiza a lista de tarefas com uma copia da lista sem a tarefa excluida
      this.tarefas = this.tarefas.filter((tarefa) => {
        return tarefa.id != id
      });
      // Notifica através do evento que existe uma nova lista de tarefas
      this.listaTarefasAtualizada.next([...this.tarefas]);
    })
  }

}
