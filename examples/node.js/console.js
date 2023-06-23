

setInterval(_=>{
	console.log('world');
}, 500)

process.addListener("SIGINT", _ => {
	console.log('good bye');
	process.exit(0);
})

console.log('hello');
console.log(process.pid)
console.log(process.argv)
console.log(process.env)
console.log(process.cwd())
console.log(process.memoryUsage())
// console.log(process.EventEmitter)