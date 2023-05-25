const API_URL = "http://localhost:8080"

function queryObj() {
  const result = {}, keyValuePairs = location.search.slice(1).split("&");
  keyValuePairs.forEach(function (keyValuePair) {
    keyValuePair = keyValuePair.split('=');
    result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
  });
  return result;
}

$(document).ready(() => {
  const queryString = queryObj()

  const precoElement = $('.preco');
  const nomeElement = $('.titulo-produto')
  const descriptionElement = $('#descricao-produto')
  $.ajax({
    url: `${API_URL}/products/${queryString.id}`,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      precoElement.text(response.value)
      nomeElement.text(response.name)
      descriptionElement.text(response.description)
    },
  })
})