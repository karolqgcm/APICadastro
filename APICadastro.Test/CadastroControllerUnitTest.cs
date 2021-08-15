using APICadastro.Domain.Entities;
using APICadastro.WebAPI.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using WebAPI.Infra.Repositories;
using Xunit;

namespace APICadastro.Test
{   
    public class CadastroControllerUnitTest
    {
        private readonly Mock<ICadastroRepository> repositoryStub = new();
        private readonly Mock<IMapper> mapperStub = new();

       [Fact]
       public void GetCadastroPorId_SemItemExistente_RetornaNotFound()
        {
            //Arrange
            repositoryStub.Setup(repo => repo.BuscarCadastroPorId(It.IsAny<Guid>().ToString()))
                .Returns((Cadastro)null);
                      
            var controller = new CadastroController(repositoryStub.Object, mapperStub.Object);

            //Act
            var resultado = controller.GetCadastroPorId(Guid.NewGuid().ToString());

            //Assert
            Assert.IsType<NotFoundResult>(resultado);
        }

        [Fact]
        public void GetCadastroPorId_ItemExistente_RetornaItem()
        {
            //Arrange
            var cadastro = CriarCadastro();
            repositoryStub.Setup(repo => repo.BuscarCadastroPorId(It.IsAny<Guid>().ToString()))
                .Returns(cadastro);

            var controller = new CadastroController(repositoryStub.Object, mapperStub.Object);

            //Act
            var resultado = controller.GetCadastroPorId(cadastro.Id);

            //Assert
            Assert.IsType<OkObjectResult>(resultado);
        }

        [Fact]
        public void GetCadastros_ItensExistentes_RetornaItens()
        {
            //Arrange
            var cadastros = new[]{CriarCadastro(),
                                  CriarCadastro()};

            repositoryStub.Setup(repo => repo.BuscarCadastros())
                .Returns(cadastros);

            var controller = new CadastroController(repositoryStub.Object, mapperStub.Object);

            //Act
            var resultado = controller.GetCadastros();

            //Assert
            Assert.IsType<OkObjectResult>(resultado);
        }

        [Fact]
        public void GetCadastroPorNome_ItemExistente_RetornaItem()
        {
            //Arrange
            var cadastros = new[]{CriarCadastro(),
                                  CriarCadastro()};

            repositoryStub.Setup(repo => repo.BuscarCadastroPorNome("Teste"))
                .Returns(cadastros);

            var controller = new CadastroController(repositoryStub.Object, mapperStub.Object);

            //Act
            var resultado = controller.GetCadastroPorNome("Teste");

            //Assert
            Assert.IsType<OkObjectResult>(resultado);
        }

        

        private Cadastro CriarCadastro()
        {
            var enderecos = new List<Endereco>();
            var endereco = new Endereco()
            {
                Identificacao = "Pessoal",
                Logradouro = "Rua das Batatinhas, 100, Centro",
                Cidade = "Ubatuba",
                UF = "SP"
            };
            enderecos.Add(endereco);

            var telefones = new List<Telefone>();
            var telefone = new Telefone()
            {
                Identificacao = "Pessoal",
                DDD = "11",
                NumeroTelefone = "954413406"
            };
            telefones.Add(telefone);

            return new()
            {
                Id = Guid.NewGuid().ToString(),
                Nome = "Teste",
                DataNascimeto = DateTime.Now,
                CPF = "378.366.854-97",
                RG = "49.760.317-2",
                Facebook = "teste",
                Instagram = "teste",
                Linkedin = "teste",
                Twitter = "teste",
                Enderecos = enderecos,
                Telefones = telefones
            };
        }
    }
}
