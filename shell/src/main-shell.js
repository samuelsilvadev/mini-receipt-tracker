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

document.addEventListener("DOMContentLoaded", () => {
  console.log("main-shell.js loaded.");

  $navigationMf.addEventListener("load", function () {
    this.contentWindow.postMessage(
      { type: "INIT_NAVIGATION", payload: NAVIGATION },
      "*",
    );
  });
});
