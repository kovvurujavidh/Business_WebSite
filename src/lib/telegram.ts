const TELEGRAM_API_BASE = 'https://api.telegram.org';

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  projectType?: string | null;
  budget?: string | null;
  timeline?: string | null;
}

function getConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  return { token, chatId };
}

function formatEnquiryMessage(enquiry: EnquiryPayload): string {
  const lines = [
    '*New Enquiry Received*',
    '',
    `*Name:* ${escapeMarkdown(enquiry.name)}`,
    `*Email:* ${escapeMarkdown(enquiry.email)}`,
  ];

  if (enquiry.phone) {
    lines.push(`*Phone:* ${escapeMarkdown(enquiry.phone)}`);
  }

  lines.push(`*Subject:* ${escapeMarkdown(enquiry.subject)}`);

  if (enquiry.projectType) {
    lines.push(`*Project Type:* ${escapeMarkdown(enquiry.projectType)}`);
  }
  if (enquiry.budget) {
    lines.push(`*Budget:* ${escapeMarkdown(enquiry.budget)}`);
  }
  if (enquiry.timeline) {
    lines.push(`*Timeline:* ${escapeMarkdown(enquiry.timeline)}`);
  }

  lines.push('', '*Message:*', escapeMarkdown(enquiry.message));

  return lines.join('\n');
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

export async function sendTelegramNotification(
  enquiry: EnquiryPayload
): Promise<boolean> {
  const { token, chatId } = getConfig();

  if (!token || !chatId) {
    console.warn(
      '[Telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID. Skipping notification.'
    );
    return false;
  }

  if (
    token === 'your-telegram-bot-token-here' ||
    chatId === 'your-telegram-chat-id-here'
  ) {
    console.warn(
      '[Telegram] Using placeholder credentials. Skipping notification.'
    );
    return false;
  }

  const text = formatEnquiryMessage(enquiry);

  try {
    const url = `${TELEGRAM_API_BASE}/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'MarkdownV2',
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `[Telegram] API error ${response.status}: ${errorBody}`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Telegram] Failed to send notification:', error);
    return false;
  }
}
