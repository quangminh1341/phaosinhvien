// notify-build.js
import fetch from 'node-fetch';

const webhookURL =
  'https://discord.com/api/webhooks/1413163303559237775/7clTXZfIMwicHSWB_TWwpHZWWOwqtNkwfTisiDjiPx7tkU9qkDiyttCp786y9PiJQ4Lr';

async function sendDiscordMessage(message) {
  try {
    const res = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });
    console.log('Discord response status:', res.status); // in ra 204 là ok
  } catch (err) {
    console.error('Error sending message:', err);
  }
}

sendDiscordMessage('Frontend build completed successfully!');