import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  private logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  @EventPattern('new_talent_signup')
  async sendSignupEmail(@Payload() body: { name: string; email: string }) {
    this.logger.log('##### New talent signup kafka message received');
    await this.appService.sendSignupEmail(body);
    this.logger.log('##### New talent signup kafka message processed');
  }
}
