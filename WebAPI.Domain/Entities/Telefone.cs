using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace APICadastro.Domain.Entities
{
    public class Telefone
    {
        public string Identificacao { get; set; }
        public string DDD { get; set; }
        public string NumeroTelefone { get; set; }
    }
}
