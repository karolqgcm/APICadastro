import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cadastro, Endereco, Telefone } from 'src/app/models/Cadastro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = `${environment.baseUrl}api/Cadastro/`
  constructor(private http: HttpClient) { }

  getCadastros():Observable<Cadastro[]>{
    return this.http.get<Cadastro[]>(`${this.baseUrl}`);
  }

  getCadastrosPorNome(nome:string):Observable<Cadastro[]>{
    return this.http.get<Cadastro[]>(`${this.baseUrl}nome/${nome}`);
  }

  getTelefones(idCadastro: string):Observable<Telefone[]>{
    return this.http.get<Telefone[]>(`${this.baseUrl}telefone/${idCadastro}`);
  }

  getEnderecos(idCadastro: string):Observable<Endereco[]>{
    return this.http.get<Endereco[]>(`${this.baseUrl}endereco/${idCadastro}`);
  }

  putCadastro(idCadastro: string, cadastroAtualizado: Cadastro){
    return this.http.put(`${this.baseUrl}${idCadastro}`, cadastroAtualizado);
  }

  putEndereco(idCadastro: string, novoEndereco: Endereco){
    return this.http.put(`${this.baseUrl}endereco/${idCadastro}`, novoEndereco);
  }

  putTelefone(idCadastro: string, novoTelefone: Telefone){
    return this.http.put(`${this.baseUrl}telefone/${idCadastro}`, novoTelefone);
  }
}
