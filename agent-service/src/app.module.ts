import { Module } from '@nestjs/common';
import { AgentController } from './agent/agent.controller';
import { AgentService } from './agent/agent.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AppModule {}
