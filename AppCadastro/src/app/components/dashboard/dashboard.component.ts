import { Component, OnInit } from '@angular/core';
import { Cadastro, Endereco, Estado, Telefone } from 'src/app/models/Cadastro';
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
  public estados: Estado[] = [
    {'uf':'AC','nome': 'Acre'},
    {'uf':'AL','nome': 'Alagoas'},
    {'uf':'AP','nome': 'Amapá'},
    {'uf':'AM','nome': 'Amazonas'},
    {'uf':'BA','nome': 'Bahia'},
    {'uf':'CE','nome': 'Ceará'},
    {'uf':'DF','nome': 'Distrito Federal'},
    {'uf':'ES','nome': 'Espírito Santo'},
    {'uf':'GO','nome': 'Goiás'},
    {'uf':'MA','nome': 'Maranhão'},
    {'uf':'MT','nome': 'Mato Grosso'},
    {'uf':'MS','nome': 'Mato Grosso do Sul'},
    {'uf':'MG','nome': 'Minas Gerais'},
    {'uf':'PA','nome': 'Pará'},
    {'uf':'PB','nome': 'Paraíba'},
    {'uf':'PR','nome': 'Paraná'},
    {'uf':'PE','nome': 'Pernambuco'},
    {'uf':'PI','nome': 'Piauí'},
    {'uf':'RJ','nome': 'Rio de Janeiro'},
    {'uf':'RN','nome': 'Rio Grande do Norte'},
    {'uf':'RS','nome': 'Rio Grande do Sul'},
    {'uf':'RO','nome': 'Rondônia'},
    {'uf':'RR','nome': 'Roraima'},
    {'uf':'SC','nome': 'Santa Catarina'},
    {'uf':'SP','nome': 'São Paulo'},
    {'uf':'SE','nome': 'Sergipe'},
    {'uf':'TO','nome': 'Tocantins'}
  ]

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
    console.log(this.cadastroSelecionado);
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
      cpf:['', Validators.required],
      rg:['']
    });
  }

  criarCadastroEnderecoForm(){
    this.cadastroEnderecoForm = this.fb.group({
      identificacao:['', Validators.required],
      logradouro:[''],
      cidade:[''],
      uf:['']
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
    console.log(this.cadastroSelecionado.enderecos);
    this.mostrandoEndereco = !mostrar;
  }

  mostrarTelefones(mostrar: boolean){
    this.mostrandoTelefone = !mostrar;
  }

  cadastroSubmit(){
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
        this.atualizarEndereco();
      },
      (erro: any)=>{
        console.log(erro);
      }
    );
  }

  atualizarEndereco(){
    this.dashboardService.getEnderecos(this.cadastroSelecionado.id).subscribe(
      (enderecos: Endereco[])=>{
        console.log(enderecos);
        this.cadastroSelecionado.enderecos = enderecos;
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
        this.atualizarTelefone();
      },
      (erro: any)=>{
        console.log(erro);
      }
    );
  }

  atualizarTelefone(){
    this.dashboardService.getTelefones(this.cadastroSelecionado.id).subscribe(
      (telefones: Telefone[])=>{
        console.log(telefones);
        this.cadastroSelecionado.telefones = telefones;
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
