import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor() {}
  @MessagePattern('rabbit-mq-producer')
  public async receiveRabbitMQMessage(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('data', data);
    const channel = context.getChannelRef();
    console.log('channel', channel);
    const orginalMessage = context.getMessage();
    console.log('orginalMessage', orginalMessage);
    channel.ack(orginalMessage);
  }
}
