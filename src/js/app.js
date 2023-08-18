if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./components/service-worker.js", {
      scope: "../../",
    })
    .then((req) => {
      console.log("registration succeeded. Scope is " + req.scope);
    })
    .catch((error) => {
      console.log("registration failed with " + error);
    });
}
