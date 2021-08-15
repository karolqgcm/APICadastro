using System;
using WebAPI.Domain.Helpers;
using Xunit;

namespace APICadastro.Test
{
    public class ValidarCPFUnitTest
    {
        [Fact]
        public void TestValidarCPF()
        {
            Validacao validacao = new Validacao();

            bool resultadoCPFValido = validacao.ValidarCPF("378.366.854-97");
            Assert.True(resultadoCPFValido);

            bool resultadoCPFNaoValido = validacao.ValidarCPF("378.366.854-98");
            Assert.False(resultadoCPFNaoValido);
        }
    }
}
