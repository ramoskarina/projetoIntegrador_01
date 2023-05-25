const API_URL = "http://localhost:8080"

$(document).ready(() => {
  $.ajax({
    url: `${API_URL}/products?limit=6`,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      var section = $('.produtos');
      section.empty();

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