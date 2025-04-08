const EVENT_TYPES = {
  INIT: "INIT_NAVIGATION",
  NAVIGATE: "NAVIGATE",
};

window.addEventListener("message", (event) => {
  if (event?.data?.type === EVENT_TYPES.INIT) {
    render(event.data.payload);
  }
});

const $wrapper = document.getElementById("navigation-mf");

function render(data = []) {
  // TODO: sanitize data

  const $list = document.getElementById("navigation-list-mf");

  data.forEach((item) => {
    const $li = document.createElement("li");
    const $a = document.createElement("a");

    $a.href = item.url;

    $a.classList.add("flex");
    $a.classList.add("items-center");
    $a.classList.add("text-gray-600");
    $a.classList.add("hover:text-indigo-600");
    $a.classList.add("transition-colors");

    $a.textContent = item.title;

    $a.addEventListener("click", (event) => {
      event.preventDefault();
      sendNavigation(item);
    });

    $li.appendChild($a);
    $list.appendChild($li);
  });

}

function sendNavigation(data) {
  window.parent.postMessage({ type: EVENT_TYPES.NAVIGATE, payload: data }, "*");
}
