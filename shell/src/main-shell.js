import "./style.css";

console.log("main-shell.js running.");

class Routes {
  static push(url) {
    window.history.pushState({}, "", url);
  }

  static replace(url) {
    window.history.replaceState({}, "", url);
  }
}

const NAVIGATION = [
  {
    url: "/",
    source: "http://localhost:3002/",
    title: "Receipts",
  },
  {
    url: "/add",
    source: "http://localhost:3003/",
    title: "Track Receipt",
  },
];

const $navigationMf = document.querySelector("#mf-navigation");
const $targetMf = document.querySelector("#mf-target");

document.addEventListener("DOMContentLoaded", () => {
  console.log("main-shell.js loaded.");

  $navigationMf.addEventListener("load", function () {
    this.contentWindow.postMessage(
      { type: "INIT_NAVIGATION", payload: NAVIGATION },
      "*",
    );
  });

  loadMFEByPathname();
});

window.addEventListener("message", (event) => {
  if (event.data.type === "NAVIGATE") {
    if (!event.data.payload.source) {
      console.error("Invalid source URL");
      return;
    }

    const { source, url } = event.data.payload;

    $targetMf.src = source;
    Routes.push(url);
  }
});

window.addEventListener("popstate", () => {
  loadMFEByPathname()
});

function getCurrentRoute() {
  const currentPathname = window.location.pathname;

  return NAVIGATION.find(({ url }) => url === currentPathname);
}

function loadMFEByPathname() {
  const currentRoute = getCurrentRoute();

  if (currentRoute) {
    $targetMf.src = currentRoute.source;
  }
}
