let products = []
let selectedProduct = {}
let type = ""

const API_URL = "http://localhost:8080";

const getHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    authorization: `Bearer ${token}`
  }
}

const authenticate = () => {
  var username = prompt('Digite o seu nome de usuário:');
  var password = prompt('Digite a sua senha:');
  $.ajax({
    url: `${API_URL}/users/authenticate`,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
      email: username,
      password: password
    }),
    success: function (response) {
      if (response.user.role !== "admin") {
        return alert("Você não é administrador")
      }
      localStorage.setItem("user", JSON.stringify(response.user))
      localStorage.setItem("token", response.sessionToken)
      $("body").css("display", "block")
    },
    error: function (e) {
      alert(e.responseJSON.message);
    }
  });
}

const getProducts = () => {
  $.ajax({
    url: `${API_URL}/products`,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      var table = $('table');
      table.find('tr').not(':first').remove();
      products = response
      for (var i = 0; i < response.length; i++) {
        const product = response[i]
        table.append(productTable(product));
      }
    },
  })
}

const onSubmit = () => {
  $("form").submit(function (e) {
    e.preventDefault();

    const name = $("#input-name").val();
    const value = $("#input-price").val();
    const picture = $("#input-picture").val();
    const description = $("#input-description").val();

    const product = {
      name,
      value,
      picture,
      description,
    };

    const method = type === "update" ? "PATCH" : "POST"
    const url = type === "update" ? `/products/${selectedProduct.id}` : "/products";
    $.ajax({
      url: `${API_URL}${url}`,
      method,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(product),
      headers: getHeaders(),
      success: function () {
        getProducts()
      }
    })
    $("#edit-modal").css("display", "none");
    $("form")[0].reset();
  });
}

const contactMsg = (contact) => `
<div class="message">
  <strong>De: </strong> ${contact.name}
  <br />
  <strong>E-mail: </strong> ${contact.email}
  <br />
  <strong>Mensagem: </strong> ${contact.message}
</div>`;

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
  if (selectedProduct) {
    $("#input-name").val(selectedProduct.name)
    $("#input-price").val(selectedProduct.value)
    $("#input-picture").val(selectedProduct.picture)
    $("#input-description").val(selectedProduct.description)
  }
};

$(document).ready(() => {
  authenticate()
  getProducts()
  onSubmit()

  $(document).on("click", ".edit-button", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const productId = $(this).closest("tr").data("product-id");
    selectedProduct = products.find(p => p.id === productId)
    console.log(selectedProduct)
    type = "update"
    openModal(productId);
  });
  $(document).on("click", ".close", function () {
    $("#edit-modal").css("display", "none");
  })
  $(document).on("click", "#add-product-btn", function (e) {
    e.preventDefault();
    e.stopPropagation();
    type = "create"
    selectedProduct = {}
    openModal();
  })
});
