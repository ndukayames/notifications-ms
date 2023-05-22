import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(EmailService.name);
  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('SMTP_HOST'),
      port: configService.get('SMTP_PORT'),
      secure: true,
      auth: {
        user: configService.get('SMTP_USERNAME'),
        pass: configService.get('SMTP_PASSWORD'),
      },

      tls: {
        rejectUnauthorized: true,
      },
    });
    this.transporter
      .verify()
      .then(() => Logger.log('Connected to email server'))
      .catch((err) =>
        Logger.error(
          'Unable to connect to email server. Make sure you have configured the SMTP options in .env',
          err,
        ),
      );
  }

  async sendEmailToOneUser(to, subject, text) {
    const msg = {
      from: this.configService.get('EMAIL_FROM'),
      to,
      subject,
      text,
    };
    await this.transporter.sendMail(msg);
  }
}
