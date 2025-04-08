export class ReceiptsStore {
  #allowedTypes = ["REGISTER_RECEIPT"];
  data = [];
  events = new Map();

  register(event, callback) {
    if (!this.#allowedTypes.includes(event)) {
      throw new Error(`ReceiptsStore: Event ${event} is not allowed`);
    }

    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    this.events.get(event).push(callback);
  }

  activate() {
    window.addEventListener("message", (event) => {
      if (event.data.type === "REGISTER_RECEIPT") {
        this.data.push(event.data.payload);

        console.log("Receipt added:", event.data.payload);

        const listeners = this.events.get("REGISTER_RECEIPT");

        listeners?.forEach((listener) => listener(event.data.payload));
      }
    });
  }

  get receipts() {
    return this.data;
  }
}
