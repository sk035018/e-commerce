export type Decision = 'APPROVE' | 'REJECT' | 'REVIEW';

export interface DecisionResult {
  ruleDecision: Decision;
  llmDecision?: Decision;
  finalDecision: Decision;
  reason?: string;
}
