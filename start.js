function createPromise(index) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(`Resolved promise ${index}`);
		}, 500 + 10 * index);
	});
}

const numberOfPromises = 500000;

// Create an array of promises
const promises = Array.from({ length: numberOfPromises }, (_, index) =>
	createPromise(index + 1)
);

function logMemoryUsage() {
	const memoryUsage = process.memoryUsage();
	console.log(`Memory Usage: 
      RSS: ${Math.round(memoryUsage.rss / 1024 / 1024)} MB`);
}

const memoryInterval = setInterval(logMemoryUsage, 1000);

Promise.all(promises)
	.then((results) => {
		results.forEach((result) => {
			console.log(result);
		});
	})
	.catch((error) => {
		console.error("One of the promises failed:", error);
	})
	.finally(() => {
		// Clear the memory interval when promises are done
		clearInterval(memoryInterval);
	});
