using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace APICadastro.Domain.Entities
{
    public class Endereco
    {
        public string Identificacao { get; set; }
        public string Logradouro { get; set; }
        public string Cidade { get; set; }
        public string UF { get; set; }

    }
}
