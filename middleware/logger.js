const fs = require('fs');
const path = require('path');

const logsDirectory = path.join(__dirname, '../logs');
const requestLogFile = path.join(logsDirectory, 'request.log');
const errorLogFile = path.join(logsDirectory, 'error.log');

function createLogsDirectory() {
  if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
  }
}

function getCurrentDateTime() {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toLocaleTimeString([], { hour12: false });
  return { date, time };
}

function logEvent(logFilePath, level, specialId, message) {
  const { date, time } = getCurrentDateTime();
  const logEntry = `[${date} ${time}] [${level}] ${specialId} - ${message}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error(`Failed to write log entry to ${logFilePath}:`, err);
    }
  });
}

module.exports = {
  logEvents: function () {
    createLogsDirectory();

    setInterval(() => {
      const { date, time } = getCurrentDateTime();
    
      const specialId = 'your_special_id'; // Replace with your desired special ID
      const requestLogMessage = `Request log entry: ${date} ${time}`;
      const errorLogMessage = `Error log entry: ${date} ${time}`;

      logEvent(requestLogFile, 'INFO', specialId, requestLogMessage);
      logEvent(errorLogFile, 'ERROR', specialId, errorLogMessage);
    }, 10000);
  }
};
