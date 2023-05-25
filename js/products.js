const API_URL = "http://localhost:8080"

$(document).ready(() => {
  $.ajax({
    url: `${API_URL}/products`,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      // Processa a resposta do servidor e adiciona os cards à section
      var section = $('.produtos');
      // Limpa a section antes de adicionar os cards
      section.empty();

      // Itera sobre os dados recebidos e cria os cards
      for (var i = 0; i < response.length; i++) {
        const product = response[i]
        // <img src="./css/img/produtos/produto-01.png" alt="Bolsa" style="width:100%">
        // <h1>Bolsa ovelhinha</h1>
        // <p class="price">R$ 49,90</p>
        // <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean iaculis sollicitudin arcu, at convallis velit fringilla nec. Suspendisse id augue massa. Donec pharetra molestie urna ut iaculis. Vestibulum commodo orci.</p>
        // <p><button onclick="location.href='./product-page.html'">adicionar ao carrinho</button></p>

        var card = $(`
        <div class="card">
          <img src=${product.picture} alt="Bolsa" style="width: 100%" />
          <h1>${product.name}</h1>
          <p class="price">R$ ${product.value}</p>
          <p>${product.description}</p>
        </div>`
        );

        // Adiciona o card à section
        section.append(card);
      }
    },
  })
})