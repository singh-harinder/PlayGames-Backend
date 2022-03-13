import { createTransport, getTestMessageUrl } from 'nodemailer';
import 'dotenv/config';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: 857,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeAnEmail(text: string): string {
  return `
    <div style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
    ">
        <h2>Hello There</h2>
        <p>${text}</p>
        <p>User</p>
    </div>
    `;
}

export interface MailResponse {
  accepted: string[] | null;
  rejected: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  // eslint-disable-next-line no-use-before-define
  envelope: Envelope;
  messageId: string;
  pending: string[] | null;
}
export interface Envelope {
  from: string;
  to: string[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = (await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your Password Reset Token',
    html: makeAnEmail(`Your Password Reset Token is here
            <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
        `),
  })) as unknown as MailResponse;
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Message sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
