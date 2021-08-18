import { Component, OnInit } from '@angular/core';
import { Cadastro, Endereco, Telefone } from 'src/app/models/Cadastro';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public cadastroSelecionado : Cadastro;
  public cadastros: Cadastro[];
  public cadastroForm: FormGroup;
  public cadastroEnderecoForm: FormGroup;
  public cadastroTelefoneForm: FormGroup;
  public mostrandoEndereco: boolean = false;
  public mostrandoTelefone: boolean = false;
  private cadastroAtualizado: Cadastro;
  public nomeBusca: string;

  constructor( private fb: FormBuilder,
               private dashboardService: DashboardService) {
    this.criarForm();
    this.criarCadastroEnderecoForm();
    this.criarCadastroTelefoneForm();
  }

  ngOnInit() {
    this.carregarCadastros();

  }

  carregarCadastros(){
    this.dashboardService.getCadastros().subscribe(
      (cadastros: Cadastro[]) => {
        this.cadastros = cadastros;
      },
      (erro: any) => {
        console.log(erro);
      }
    )
  }

  cadastroSelect( cadastro: Cadastro){
    this.cadastroSelecionado = cadastro;
    this.cadastroForm.patchValue(cadastro);
  }

  voltar(){
    this.cadastroSelecionado = null;
    this.mostrandoEndereco = false;
    this.mostrandoTelefone = false;
  }

  criarForm(){
    this.cadastroForm = this.fb.group({
      nome:['', Validators.required],
      dataNascimeto:[''],
      facebook:[''],
      linkedin:[''],
      twitter:[''],
      instagram:[''],
      cPF:['', Validators.required],
      rG:['']
    });
  }

  criarCadastroEnderecoForm(){
    this.cadastroEnderecoForm = this.fb.group({
      identificacao:['', Validators.required],
      logradouro:[''],
      cidade:[''],
      uF:['']
    })
  }

  criarCadastroTelefoneForm(){
    this.cadastroTelefoneForm = this.fb.group({
      identificacao:['', Validators.required],
      dDD:[''],
      numeroTelefone:['']
    })
  }

  mostrarEnderecos(mostrar: boolean){
    this.mostrandoEndereco = !mostrar;
  }

  mostrarTelefones(mostrar: boolean){
    this.mostrandoTelefone = !mostrar;
  }

  cadastroSubmit(){
    console.log(this.cadastroForm.value);
    this.cadastroAtualizado = this.cadastroForm.value;
    this.cadastroAtualizado.enderecos = this.cadastroSelecionado.enderecos;
    this.cadastroAtualizado.telefones = this.cadastroSelecionado.telefones;
    this.cadastroAtualizado.id = this.cadastroSelecionado.id;
    this.atualizarCadastro(this.cadastroAtualizado);
  }

  cadastroEnderecoSubmit(){
    this.dashboardService.putEndereco(this.cadastroSelecionado.id, this.cadastroEnderecoForm.value).subscribe(
      (endereco: Endereco)=>{
        console.log(endereco);
      },
      (erro: any)=>{
        console.log(erro);
      }
    );
  }

  cadastroTelefoneSubmit(){
    this.dashboardService.putTelefone(this.cadastroSelecionado.id, this.cadastroTelefoneForm.value).subscribe(
      (telefone: Telefone)=>{
        console.log(telefone);
      },
      (erro: any)=>{
        console.log(erro);
      }
    );
  }

  atualizarCadastro(cadastroAtualizado: Cadastro){
    this.dashboardService.putCadastro(cadastroAtualizado.id, cadastroAtualizado).subscribe(
      (cadastro: Cadastro)=>{
        console.log(cadastro);
      },
      (erro: any)=>{
        console.log(erro);
      }
    );
  }

  buscarNome(nome: string){
    if(nome == null || nome == ''){
      this.carregarCadastros();
    }
    else{
      this.dashboardService.getCadastrosPorNome(nome).subscribe(
        (cadastros: Cadastro[]) => {
          this.cadastros = cadastros;
        },
        (erro: any)=>{
          console.log(erro);
        }
      );
    }
  }
}
