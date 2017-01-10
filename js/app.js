// Service Worker 

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register("/service-worker.js", {scope: "/"})
		.then(_ => console.log("service worker registered !"))
		.catch(e => console.log(`error: ${e}`));
}