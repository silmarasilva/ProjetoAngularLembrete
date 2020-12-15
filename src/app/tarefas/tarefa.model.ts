export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  dataCadastro: Date;
  dataConclusao: Date;
  idUsuario: string;
}