export class Routes {
  static push(url) {
    window.history.pushState({}, "", url);
  }

  static replace(url) {
    window.history.replaceState({}, "", url);
  }
}
