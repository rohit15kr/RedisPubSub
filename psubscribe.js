const Redis = require("ioredis");
const redis = new Redis();
redis.psubscribe("employee-channel-*", (err, count) => {
  if (err) {
    console.error("Failed to subscribe: %s", err.message);
  } else {
    console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`
    );
  }
});
redis.on("pmessage", (pattern, channel, message) => {
  console.log(`Received ${message} from ${channel} (matching pattern ${pattern})`);
});

redis.on("pmessageBuffer", (pattern, channel, message) => {
  console.log(`Received ${message.toString()} from ${channel} (matching pattern ${pattern})`);
});
