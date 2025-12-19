export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text1, text2 } = req.body;

  if (!text1 || !text2) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const message = `📩 New Submission\n\nText 1:\n${text1}\n\nText 2:\n${text2}`;

  const telegramRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    }
  );

  if (!telegramRes.ok) {
    return res.status(500).json({ error: "Telegram error" });
  }

  return res.status(200).json({ success: true });
}
