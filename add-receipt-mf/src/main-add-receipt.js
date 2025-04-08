const $form = document.getElementById('add-receipt-form');
const $submit = document.getElementById('add-receipt-form-submit');

$form.addEventListener("submit", (event) => {
  $submit.setAttribute("disabled", true)
  event.preventDefault()

  const formData = new FormData($form);

  const name = formData.get("name");
  const price = formData.get("price");
  const date = formData.get("date");

  if (!name || !price || !date) {
    return;
  }

  window.parent.postMessage({type: "REGISTER_RECEIPT", payload: {name, price, date}}, "*")
  $form.reset()
  $submit.removeAttribute("disabled")
})
