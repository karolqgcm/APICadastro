using APICadastro.Domain.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.Infra.Repositories
{
    public interface ICadastroRepository
    {
        void AdicionarCadastro(Cadastro cadastro);
        void AtualizarCadastro(string id, Cadastro cadastroAtualizado);
        IEnumerable<Cadastro> BuscarCadastros(int? queryPage);
        Cadastro BuscarCadastroPorId(string id);
        IEnumerable<Cadastro> BuscarCadastroPorNome(string nome);

        void AdicionarTelefone(string cadastroId, Telefone telefone);
        IEnumerable<Telefone> BuscarTelefones(string cadastroId);

        void AdicionarEndereco(string cadastroId, Endereco endereco);
        IEnumerable<Endereco> BuscarEnderecos(string cadastroId);
    }
}
