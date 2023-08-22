export default class LoadAPI {
  constructor(container) {
    this.container = container;

    this.init = this.init.bind(this);

    document.addEventListener("DOMContentLoaded", this.init);
  }

  init() {
    this.createLoadElement();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js", {
          scope: "./",
        })
        .then((req) => {
          console.log("registration succeeded. Scope is " + req.scope);
        })
        .catch((error) => {
          console.log("registration failed with " + error);
        });
    }
  }

  createLoadElement() {
    const element = document.createElement("div");
    element.classList.add("load-wrapper");
    element.innerHTML = `<div class="load-header">
    <div class="load-title-wrap"><h2 class="load-title">Новости мира кино</h2></div>
    <div class="load-update-wrape"><a href="#" class="update-btn">Обновить</a></div>
</div>
<div class="loader-main">
    <div class="loader-plug-wrap">
        <div class="fake-load-item">
            <div class="fake-item-load-header">
                <span class="fake-load-title"></span>
            </div>
            <div class="fake-item-load-main">
                <div class="fake-item-image-wrap">
                    <span class="fake-item-image"></span>
                </div>
                <div class="fake-item-content-wrap">
                    <span class="fake-content-row"></span>
                    <span class="fake-content-row"></span>
                </div>
            </div>
        </div>
        <div class="fake-load-item">
            <div class="fake-item-load-header">
                <span class="fake-load-title"></span>
            </div>
            <div class="fake-item-load-main">
                <div class="fake-item-image-wrap">
                    <span class="fake-item-image"></span>
                </div>
                <div class="fake-item-content-wrap">
                    <span class="fake-content-row"></span>
                    <span class="fake-content-row"></span>
                </div>
            </div>
        </div>
        <div class="fake-load-item">
            <div class="fake-item-load-header">
                <span class="fake-load-title"></span>
            </div>
            <div class="fake-item-load-main">
                <div class="fake-item-image-wrap">
                    <span class="fake-item-image"></span>
                </div>
                <div class="fake-item-content-wrap">
                    <span class="fake-content-row"></span>
                    <span class="fake-content-row"></span>
                </div>
            </div>
        </div>
    </div>
</div>`;

    this.element = element;
    this.container.append(element);
  }
}
