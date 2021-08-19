export class Cadastro {
  id: string;
  nome: string;
  dataNascimeto?: Date;
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  cpf: string;
  rg: string;
  enderecos: Endereco[];
  telefones: Telefone[];
}

export class Endereco {
  identificacao: string;
  logradouro: string;
  cidade: string;
  uf: string;
}

export class Telefone {
  identificacao: string;
  dDD: string;
  numeroTelefone: string;
}

export class Estado {
  uf: string;
  nome: string;
}

