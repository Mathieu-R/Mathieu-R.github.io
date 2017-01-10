// Service Worker 
console.log("hello")

if ('serviceWorker' in navigator) {
	console.log("sw");
	navigator.serviceWorker
		.register("/service-worker.js", {scope: "/"})
		.then(_ => console.log("service worker registered !"))
		.catch(e => console.log(`error: ${e}`));
}