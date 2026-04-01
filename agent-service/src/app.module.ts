import { Module } from '@nestjs/common';
import { AgentController } from './agent/agent.controller';
import { AgentService } from './agent/agent.service';

import { DecisionEngine } from './agent/decision/decision.engine';
import { RuleEngine } from './agent/decision/rule.engine';
import { ValidatorService } from './agent/decision/validator.service';
import { LLMService } from './agent/decision/llm.service';

@Module({
  controllers: [AgentController],
  providers: [
    AgentService,
    DecisionEngine,
    RuleEngine,
    ValidatorService,
    LLMService,
  ],
})
export class AppModule {}
