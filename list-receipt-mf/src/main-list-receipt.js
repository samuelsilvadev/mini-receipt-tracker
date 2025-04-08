import "./style.css";

const LIST_TEMPLATE = `
  <ul
    id="receipt-list"
    class="flex flex-col gap-4"
  >
    {children}
  </ul>
`;

const LIST_ITEM_TEMPLATE = `
  <li class="flex-1 min-w-0 flex items-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors p-4">
    <div>
      <h3 class="text-sm font-medium text-gray-900 truncate">
        {name}
      </h3>
      <p class="text-sm text-gray-500">{date}</p>
    </div>
    <div class="flex items-center gap-4 ml-auto">
      <span class="text-sm font-medium text-gray-900"> {price} </span>
      <button
        class="text-gray-400 hover:text-red-500 transition-colors"
      >
        🚮
      </button>
    </div>
  </li>
`;

window.addEventListener("message", (event) => {
  if (event.data.type === "LOAD_ROUTE") {
    console.log("Route loaded:", event.data.payload);
    render(event.data.payload);
  }
});

const $empty = document.getElementById("empty");
const $listWrapper = document.getElementById("list-wrapper");
const $itemsAmount = document.getElementById("amount-items");

function render(data) {
  if (data.length === 0) {
    $empty.classList.remove("hidden");
    return;
  }

  const items = data
    .toReversed()
    .map((item) => {
      return LIST_ITEM_TEMPLATE.replace("{name}", item.name)
        .replace("{date}", item.date)
        .replace("{price}", item.price);
    })
    .join("");

  $empty.classList.add("hidden");
  $listWrapper.innerHTML = LIST_TEMPLATE.replace("{children}", items);
  $itemsAmount.textContent = `${data.length} items`;
}
