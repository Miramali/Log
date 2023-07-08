function errorHandler(err, req, res, next) {
    // Log the error
    const specialId = 'your_special_id'; // Replace with your desired special ID
    const errorLogMessage = `Error: ${err.message}`;
  
    const { date, time } = getCurrentDateTime();
    const logEntry = `[${date} ${time}] ${specialId} - ${errorLogMessage}\n`;
  
    fs.appendFile(errorLogFile, logEntry, (err) => {
      if (err) {
        console.error(`Failed to write log entry to ${errorLogFile}:`, err);
      }
    });
  
    // Send custom error response to the client
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  }
  
  module.exports = errorHandler;
  