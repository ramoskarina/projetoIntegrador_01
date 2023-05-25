let products = []
selectedProduct = {}
const type = ""

const contactMsg = (contact) => `
<div class="message">
  <strong>De: </strong> ${contact.name}
  <br />
  <strong>E-mail: </strong> ${contact.email}
  <br />
  <strong>Mensagem: </strong> ${contact.message}
</div>`;


alert("oi")
const productTable = (product) => `
<tr data-product-id=${product.id}>
  <td>${product.name}</td>
  <td>R$ ${product.value}</td>
  <td><img src="${product.picture}" width="30px"></td>
  <td>
    <button class="edit-button">Editar</button> 
    <button>Excluir</button>
  </td>
</tr>`;


const openModal = () => {
  $("#edit-modal").css("display", "block");
  $("#input-name").val(selectedProduct.name)
  $("#input-price").val(selectedProduct.value)
  $("#input-picture").val(selectedProduct.picture)
  $("#input-description").val(selectedProduct.description)
};

$(document).ready(function () {
  $(document).on("click", ".edit-button", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const productId = $(this).closest("tr").data("product-id");
    selectedProduct = products.find(p => p.id === productId)
    openModal(productId);
  });
  $(document).on("click", ".close", function () {
    $("#edit-modal").css("display", "none");
  })
});


const API_URL = "http://localhost:8080";
$(document).ready(() => {
  $.ajax({
    url: `${API_URL}/products`,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      var table = $('table');
      products = response
      for (var i = 0; i < response.length; i++) {
        const product = response[i]
        table.append(productTable(product));
      }
    },
  })
});


$(document).ready(function () {
  $("form").submit(function (e) {
    e.preventDefault();

    const name = $("#input-name").val();
    const price = $("#input-price").val();
    const picture = $("#input-picture").val();
    const description = $("#input-description").val();

    const product = {
      name: name,
      price: price,
      picture: picture,
      description: description
    };

    const method = type === "update" ? "PUT" : "POST"
    const url = type === "update" ? `/products/${selectedProduct.id}` : "/products";
    $.ajax({
      url: `${API_URL}${url}`,
      method,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(product)
    })
    $("#edit-modal").css("display", "none");
    $("form")[0].reset();
  });
})