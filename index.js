import pLimit from "p-limit";

const limit = pLimit(10000);

const fetchData = (id) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			// console.log(`Fetched data for ID: ${id}`);
			resolve(`Data for ID: ${id}`);
		}, 1000);
	});
};

const runTasks = (n) => {
	const tasks = Array.from({ length: n }, (_, i) => {
		return limit(() => fetchData(i + 1));
	});

	// Start tracking memory usage every second
	const memoryInterval = setInterval(() => {
		const memoryUsage = process.memoryUsage();
		console.log("Memory Usage:", {
			rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
		});
	}, 1000);

	Promise.all(tasks).then((results) => {
		// console.log("All tasks done:", results);
		// Stop memory tracking when all tasks are completed
		clearInterval(memoryInterval);
	});
};

runTasks(90000);
