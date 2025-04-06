import "./style.css";

const EVENT_TYPES = {
  INIT: "INIT_NAVIGATION",
};

window.addEventListener("message", (event) => {
  if (event?.data?.type === EVENT_TYPES.INIT) {
    render(event.data.payload);
  }
});

const $wrapper = document.getElementById("navigation-mf");

function render(data = []) {
  // TODO: sanitize data

  const $list = document.createElement("ul");
  $list.classList.add("navigation-mf-list");

  data.forEach((item) => {
    const $li = document.createElement("li");
    const $a = document.createElement("a");

    $a.href = item.url;
    $a.textContent = item.title;

    $li.appendChild($a);
    $list.appendChild($li);
  });

  $wrapper.appendChild($list);
}
