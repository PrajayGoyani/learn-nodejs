"use strict";

const os = require('os');
const modules = require('module');


console.log(modules);
process.exit();

let hostname = os.hostname();
let freemem = os.freemem() / (1024 * 1024 * 1024);
let homedir = os.homedir();
let platform = os.platform();
let release = os.release();
// let tmpDir = os.tmpDir(); // os.tmpDir() is deprecated
let tmpDir = os.tmpdir();
let totalmem = os.totalmem();
let cpus = os.cpus();
let cpusnum = os.cpus().length;
let network = os.networkInterfaces();
let arch = os.arch();

console.log("\n" + "Hostname:" + hostname + "\n");
console.log("Available memory: " + freemem + "\n");
console.log("User directory: " + homedir + "\n");
console.log("System platform: " + platform + "\n");
console.log("System version: " + release + "\n");
console.log("Application temporary directory: " + tmpDir + "\n");
console.log("Total memory size: " + totalmem + "\n");
console.log("cpu information:\n");
console.log(cpus);
console.log("\n" + "cpu core:" + cpusnum + "\n");
console.log("Network information:\n");
console. log(network);
console.log("\n" + "architecture:" + arch); // x64 or x32