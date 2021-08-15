using APICadastro.Domain.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.Infra.Repositories
{
    public class CadastroRepository : ICadastroRepository
    {
        private readonly IMongoCollection<Cadastro> _cadastros;
        private readonly IConfiguration _configuration;

        public CadastroRepository(IConfiguration configuration)
        {
            _configuration = configuration;

            var databaseName = configuration.GetSection("DatabaseConfiguration:DatabaseName").Value;
            var connectionString = configuration.GetSection("DatabaseConfiguration:ConnectionString").Value;

            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);

            _cadastros = database.GetCollection<Cadastro>("cadastro");
        }

        public void AdicionarCadastro(Cadastro cadastro)
        {
             _cadastros.InsertOneAsync(cadastro);
        }

        public void AdicionarEndereco(string cadastroId, Endereco endereco)
        {
            var cadastroComEndereco = Builders<Cadastro>.Update.Push(cadastro => cadastro.Enderecos, endereco);
            _cadastros.UpdateOneAsync(cadastro => cadastro.Id == cadastroId, cadastroComEndereco);
        }

        public void AdicionarTelefone(string cadastroId, Telefone telefone)
        {
            var cadastroComTelefone = Builders<Cadastro>.Update.Push(cadastro => cadastro.Telefones, telefone);
             _cadastros.UpdateOneAsync(cadastro => cadastro.Id == cadastroId, cadastroComTelefone);
        }

        public void AtualizarCadastro(string id, Cadastro cadastroAtualizado)
        {
             _cadastros.ReplaceOneAsync(cadastro => cadastro.Id == id, cadastroAtualizado);
        }

        public IEnumerable<Cadastro> BuscarCadastros(int? queryPage)
        {
            var resultados =  _cadastros.Find(cadastro => true);

            int page = queryPage.GetValueOrDefault(1) == 0 ? 1 : queryPage.GetValueOrDefault(1);
            int perPage = 5;
            long total = resultados.CountDocuments();

            return resultados.Skip((page - 1) * perPage).Limit(perPage).ToList();
        }

        public IEnumerable<Endereco> BuscarEnderecos(string cadastroId)
        {
            return _cadastros.Find(cadastro => cadastro.Id == cadastroId).FirstOrDefault()
                                     .Enderecos;
        }

        public Cadastro BuscarCadastroPorId(string id)
        {
            return _cadastros.Find(cadastro => cadastro.Id == id).FirstOrDefault();
        }

        public IEnumerable<Cadastro> BuscarCadastroPorNome(string nome)
        {
            return _cadastros.Find(cadastro => cadastro.Nome.Contains(nome)).ToList();
        }

        public IEnumerable<Telefone> BuscarTelefones(string cadastroId)
        {
            return _cadastros.Find(cadastro => cadastro.Id == cadastroId).FirstOrDefault()
                                     .Telefones;
        }
    }
}
