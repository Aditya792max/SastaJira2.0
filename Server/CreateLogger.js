const fs = require("fs");
const path = require("path");

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, "logs");

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Create log file with session start time
const now = new Date();

const pad = (num) => String(num).padStart(2, "0");

const fileName = `session-${
    now.getFullYear()
}-${
    pad(now.getMonth() + 1)
}-${
    pad(now.getDate())
}_${
    pad(now.getHours())
}-${
    pad(now.getMinutes())
}-${
    pad(now.getSeconds())
}.txt`;

const logFile = path.join(logDir, fileName);

// Session Header
fs.appendFileSync(
    logFile,
    "=========================================\n" +
    `Session Started : ${now.toLocaleString()}\n` +
    "=========================================\n\n"
);

// Save original console methods
const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;

// Function to write logs
function writeLog(type, args) {
    const timestamp = new Date().toLocaleString();

    const message = args
        .map((arg) =>
            typeof arg === "object"
                ? JSON.stringify(arg, null, 2)
                : String(arg)
        )
        .join(" ");

    fs.appendFileSync(
        logFile,
        `[${timestamp}] [${type}] ${message}\n`
    );
}

// Override console methods
console.log = (...args) => {
    originalLog(...args);
    writeLog("LOG", args);
};

console.error = (...args) => {
    originalError(...args);
    writeLog("ERROR", args);
};

console.warn = (...args) => {
    originalWarn(...args);
    writeLog("WARN", args);
};

process.on("exit", () => {
    fs.appendFileSync(
        logFile,
        `\nSession Ended : ${new Date().toLocaleString()}\n`
    );
});

module.exports = logFile;