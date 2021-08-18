export class Cadastro {
  id: string;
  nome: string;
  dataNascimeto?: Date;
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  cPF: string;
  rG: string;
  enderecos: Endereco[];
  telefones: Telefone[];
}

export class Endereco {
  identificacao: string;
  logradouro: string;
  cidade: string;
  uF: string;
}

export class Telefone {
  identificacao: string;
  dDD: string;
  numeroTelefone: string;
}

