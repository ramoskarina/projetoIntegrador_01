const API_URL = "http://localhost:8080"

$(document).ready(() => {
  $.ajax({
    url: `${API_URL}/products?limit=6`,
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
        var card = $(`
        <div class="card">
          <img src=${product.picture} alt="Bolsa" style="width: 100%" />
          <a href="./product-page.html?id=${product.id}">
            <h1>${product.name}</h1>
            <p class="price">R$ ${product.value}</p>
            <p>${product.description}</p>
          </a>
        </div>`
        );

        // Adiciona o card à section
        section.append(card);
      }
    },
  })
})