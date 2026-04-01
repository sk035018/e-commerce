import { Decision } from '../types/decision.types';

export function extractDecision(response: string): Decision {
  try {
    const parsed = JSON.parse(response);
    const decision = parsed.decision;

    if (['APPROVE', 'REJECT', 'REVIEW'].includes(decision)) {
      return decision;
    }
  } catch (e) {}
  console.warn({
    event: 'LLM_PARSE_FAILED',
    raw: response,
  });
  
  return 'REVIEW'; // fallback safety
}
