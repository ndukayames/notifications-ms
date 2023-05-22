import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  constructor(private emailService: EmailService) {}
  async sendSignupEmail(body: { name: string; email: string }) {
    const emailBody = `Hello ${body.name}
    welcome to our platform, you'll receive another email to activate your account`;
    await this.emailService.sendEmailToOneUser(
      body.email,
      'Welcome!',
      emailBody,
    );
    this.logger.log('email sent');
  }
}
