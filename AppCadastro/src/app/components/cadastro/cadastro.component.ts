import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cadastro } from 'src/app/models/Cadastro';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public novoCadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService
  ) {
    this.criarNovoCadastroForm();
   }

  ngOnInit() {
  }

  criarNovoCadastroForm(){
    this.novoCadastroForm = this.fb.group({
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

  novoCadastroSubmit(){
    this.cadastroService.postCadastro(this.novoCadastroForm.value).subscribe(
      (novoCadastro: Cadastro)=>{
        console.log(novoCadastro);
      },
      (erro: any)=>{
        console.log(erro);
      }
    );
  }
}
