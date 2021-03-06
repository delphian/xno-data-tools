const nodejs = (typeof process === 'object' && process.title === 'node') ? true : false;
const { parentPort } = require('worker_threads');
const { xnoPowWorker } = require('./xno-data-tools-pow-common');

if (nodejs) {
	parentPort.once('message', async (message) => {
		let nonced = await xnoPowWorer(message.hash, message.threshold, (data) => {
			parentPort.postMessage({ type: 'status', data: data });
		});
		parentPort.postMessage({ type: 'result', data: nonced });
	});
} else {
	self.addEventListener('message', async function(event) {
        	let nonced = await xnoPowWorker(event.data.hash, event.data.threshold, (data) => {
                	self.postMessage({ type: 'status', data: data });
	        }, event.data.limit);
        	self.postMessage({ type: 'result', data: nonced });
	}, false);
}
