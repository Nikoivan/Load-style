const staticCacheName = "load-cache-v1";

const assetUrls = ["/", "/index.html", "/index.js", "/style.css", "/error.jpg"];

self.addEventListener("install", async (e) => {
  console.log("install");
  const cache = await caches.open(staticCacheName);
  await cache.addAll([
    "./",
    "./index.html",
    "./index.js",
    "./style.css",
    "./error.jpg",
  ]);
});

self.addEventListener("activate", async (e) => {
  console.log("activated");

  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames
      .filter((name) => name !== staticCacheName)
      .map((name) => caches.delete(name)),
  );
});

self.addEventListener("fetch", async (e) => {
  if (e.type === "error") {
    console.log("error");
    return;
  }

  const url = new URL(e.request.url);

  if (assetUrls.includes(url.pathname)) {
    e.respondWith(networkFirst(e.request));
    return;
  }

  if (url.pathname.endsWith(".jpg")) {
    e.respondWith(imageFetchFirst(e.request));
    return;
  }

  e.respondWith(cacheFirst(e.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) {
    return cached;
  }

  let response;

  try {
    response = await fetch(request);
  } catch (err) {
    console.log(err);
  }

  const cache = await caches.open(staticCacheName);
  cache.put(request, response.clone());

  return response;
}

async function networkFirst(request) {
  let response;

  try {
    response = await fetch(request);
  } catch (err) {
    const cacheResponse = await caches.match(request);

    if (cacheResponse) {
      return cacheResponse;
    }
  }
  const cache = await caches.open(staticCacheName);
  cache.put(request, response.clone());

  return response;
}

async function imageFetchFirst(request) {
  let response;

  try {
    response = await fetch(request);
  } catch (err) {
    return await caches.match("./error.jpg");
  }
  const cache = await caches.open(staticCacheName);
  cache.put(request, response.clone());

  return response;
}
