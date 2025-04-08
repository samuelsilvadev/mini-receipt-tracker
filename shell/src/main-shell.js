import "./style.css";

console.log("main-shell.js running.");

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
});

window.addEventListener("message", (event) => {
  if (event.data.type === "NAVIGATE") {
    if (!event.data.payload.source) {
      console.error("Invalid source URL");
      return;
    }

    $targetMf.src = event.data.payload.source;
  }
});
