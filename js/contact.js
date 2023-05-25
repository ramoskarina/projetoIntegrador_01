const API_URL = "http://localhost:8080";
const getHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    authorization: `Bearer ${token}`
  }
}

$(document).ready(function () {
  $('.formulario-orcamento').submit(function (e) {
    e.preventDefault();

    var name = $('.formulario-orcamento input[name="name"]').val();
    var email = $('.formulario-orcamento input[name="email"]').val();
    var description = $('.formulario-orcamento textarea[name="orcamento-personalizado"]').val();
    var additionalData = $('.formulario-orcamento textarea[name="orcamento-personalizado-imagens"]').val();


    var dadosFormulario = {
      name,
      email,
      description,
      additionalData,
      status: 'pending'
    };
    console.log(dadosFormulario)
    $.ajax({
      url: `${API_URL}/contacts`,
      type: 'POST',
      dataType: 'json',
      headers: getHeaders(),
      contentType: 'application/json',
      data: JSON.stringify(dadosFormulario),
      success: function () {
        alert("Formulário enviado")
        $("form")[0].reset();
        window.location.href("/")
      },
      error: function () {
        alert("Erro, tente novamente mais tarde")
      }
    });
  });
});
