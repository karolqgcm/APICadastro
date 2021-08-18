import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cadastro } from 'src/app/models/Cadastro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  baseUrl = `${environment.baseUrl}api/Cadastro/`
  constructor(private http: HttpClient) { }

  postCadastro(novoCadastro: Cadastro){
    return this.http.post(`${this.baseUrl}`, novoCadastro);
  }

}
