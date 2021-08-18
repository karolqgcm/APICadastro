using APICadastro.Application.Dtos;
using APICadastro.Domain.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Infra.Repositories;

namespace APICadastro.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CadastroController : ControllerBase
    {
        private ICadastroRepository _cadastroRepository;
        private readonly IMapper Mapper;
        public CadastroController(ICadastroRepository cadastroRepository,
                                  IMapper mapper)
        {
            _cadastroRepository = cadastroRepository;
            Mapper = mapper;
        }

        // GET: api/<CadastroController>
        [HttpGet]
        public ActionResult GetCadastros([FromQuery(Name ="page")] int? page)
        {
            if (page == null)
                page = 1;

            var cadastros = _cadastroRepository.BuscarCadastros(page);
            var cadastrosDto = Mapper.Map<IEnumerable<CadastroDto>>(cadastros);
            return  Ok(cadastrosDto);
        }

        // GET api/<CadastroController>/{id}
        [HttpGet("{id}")]
        public  ActionResult GetCadastroPorId(string id)
        {
            var cadastro = _cadastroRepository.BuscarCadastroPorId(id);
            if (cadastro == null)
                return NotFound();
            var cadastroDto = Mapper.Map<CadastroDto>(cadastro);
            return Ok(cadastroDto);
        }

        // GET api/<CadastroController>/{id}
        [HttpGet("nome/{nome}")]
        public ActionResult GetCadastroPorNome(string nome)
        {
            var cadastros = _cadastroRepository.BuscarCadastroPorNome(nome);
            if (cadastros == null || cadastros.Count() == 0)
                return NotFound();
            var cadastrosDto = Mapper.Map<IEnumerable<CadastroDto>>(cadastros);
            return Ok(cadastrosDto);
        }

        // GET api/<CadastroController>/{id}
        [HttpGet("endereco/{id}")]
        public ActionResult GetEnderecos(string id)
        {
            var cadastro = _cadastroRepository.BuscarCadastroPorId(id);
            if (cadastro == null)
                return NotFound();
            var cadastroDto = Mapper.Map<CadastroDto>(cadastro);
            return Ok(cadastroDto.Enderecos);
        }

        // GET api/<CadastroController>/{id}
        [HttpGet("telefone/{id}")]
        public ActionResult GetTelefones(string id)
        {
            var cadastro = _cadastroRepository.BuscarCadastroPorId(id);
            if (cadastro == null)
                return NotFound();
            var cadastroDto = Mapper.Map<CadastroDto>(cadastro);
            return Ok(cadastroDto.Telefones);
        }


        // POST api/<CadastroController>
        [HttpPost]
        public ActionResult PostCadastro([FromBody] CadastroDto cadastroDto)
        {
            var cadastro = Mapper.Map<Cadastro>(cadastroDto);
            _cadastroRepository.AdicionarCadastro(cadastro);
            return Ok();
        }

        // PUT api/<CadastroController>
        [HttpPut("{id}")]
        public void PutCadastro(string id, [FromBody] CadastroDto cadastroDto)
        {
            var cadastro = Mapper.Map<Cadastro>(cadastroDto);
             _cadastroRepository.AtualizarCadastro(id, cadastro);
        }   

        // PUT api/<CadastroController>
        [HttpPut("endereco/{id}")]
        public void PutEndereco(string id,[FromBody] EnderecoDto enderecoDto)
        {
            var endereco = Mapper.Map<Endereco>(enderecoDto);
            _cadastroRepository.AdicionarEndereco(id, endereco);
        }

        // PUT api/<CadastroController>
        [HttpPut("telefone/{id}")]
        public void PutTelefone(string id, [FromBody] TelefoneDto telefoneDto)
        {
            var telefone = Mapper.Map<Telefone>(telefoneDto);
            _cadastroRepository.AdicionarTelefone(id, telefone);
        }
        
    }
}
