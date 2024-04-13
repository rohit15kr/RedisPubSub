const fs = require("fs");
const Redis = require("ioredis");

const redis = new Redis();
fs.readFile("employees.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    const employees = JSON.parse(data);
    let index = 0;
    
    setInterval(() => {
      const employee = employees[index % employees.length];
      const channel = `employee-channel-${index + 1}`;
      redis.publish(channel, JSON.stringify(employee));
      console.log(`Published employee data to ${channel}`);
      index++;
    }, 2000);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
