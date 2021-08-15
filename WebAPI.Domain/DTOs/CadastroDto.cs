using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APICadastro.Application.Dtos
{
    public class CadastroDto
    {
        public string Id { get; set; }
        public string Nome { get; set; }
        public DateTime? DataNascimeto { get; set; }
        public string Facebook { get; set; }
        public string Linkedin { get; set; }
        public string Twitter { get; set; }
        public string Instagram { get; set; }
        public string CPF { get; set; }
        public string RG { get; set; }
        public List<TelefoneDto> Telefones { get; set; }
        public List<EnderecoDto> Enderecos { get; set; }
    }
}
