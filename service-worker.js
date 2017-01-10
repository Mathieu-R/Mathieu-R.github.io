const version = 'v1';

const cacheFiles = [
	"js/S11.js",
	"S11.html",
	"js/barcode39.js",
	"css/S11.css"
];


self.oninstall = event => {
	event.waitUntil(
		caches.open(version)
			.then(cache => {
				console.log("[Service Worker] Mise en cache des fichiers");
				return cache.addAll(cacheFiles);
			})
	)
}

self.onactivate = event => {
	event.waitUntil(
		caches.keys()
			.then(cacheNames => {
				Promise.all(
					cacheNames.map(cacheName => {
						if (cacheName !== version) {
							console.log(`Suppression d'un ancien cache ${cacheName}`);
							return cache.delete(cacheName);
						}
					})
				)
			})
	)	
}

self.onfetch = event => {
	event.respondWith(
		caches.match(event.request) // Search resource in cache
			.then(res => {
				if (res) { // Found 
					console.log(`[Service Worker] Ressource trouvée dans le cache ${event.request.url}`);
					return response; // Return resource from cache
				}
				const request = event.request.clone(); // Because request is a stream
				return fetch(request) // Fetch the resource
					.then((response) => {
						cache.open(cacheName) // Open the cache
							.then(cache => {
								const responseClone = response.clone(); // Because response is a stream
								console.log(`[Service Worker] Mise en cache: ${responseClone}`) 
								cache.put(event.request, responseClone); // Put the response in the cache
								return responseClone; // Return the response
						}
					}).catch(e => console.log(`[Service Worker] Erreur lors de la récupération de la ressource`, e));
			})
	)
}
