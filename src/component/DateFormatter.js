function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata',
    };
  
    return date.toLocaleString('en-IN', options);
  }
  
export default formatTimestamp;  