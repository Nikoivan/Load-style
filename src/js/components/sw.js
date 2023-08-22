const staticCacheName = "load-cache-v1";

const assetUrls = ["index.html", "style.css", "index.js", "/images/user.png"];

self.addEventListener("install", async (e) => {
  console.log("installed");
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetUrls);
});

self.addEventListener("activate", async (e) => {
  console.log("activated");

  /*const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames
      .filter((name) => name !== staticCacheName)
      .map((name) => caches.delete(name))
  );*/
});

self.addEventListener("fetch", async (e) => {
  console.log("fetch");

  const url = new URL(e.request.url);

  if (staticCacheName.includes(url.pathname)) {
    console.log("2");
    e.respondWith(networkFirst(e.request));

    return;
  }

  e.respondWith(cacheFirst(e.request));
});

async function cacheFirst(request) {
  console.log(request);
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
  console.log(request);
  let response;

  try {
    response = await fetch(request);
  } catch (err) {
    const cacheResponse = await caches.match(request);

    if (cacheResponse) {
      return cacheResponse;
    }
  }
  return;
}
