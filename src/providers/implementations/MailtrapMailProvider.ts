import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

import dotenv from 'dotenv';
dotenv.config();

const { MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: Number(MAIL_PORT),
      auth: {
        user: `${MAIL_USER}`,
        pass: `${MAIL_PASS}`
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    })
  }
}