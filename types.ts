
export interface AuditGap {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface ScriptSection {
  title: string;
  content: string;
}

export interface PriceTier {
  service: string;
  range: string;
  includes: string[];
}

export interface StrategyData {
  conversionKillers: AuditGap[];
  aiScript: {
    firstMessage: string;
    features: string[];
  };
  emailHook: string;
  seoKeywords: string[];
  pricingTiers: PriceTier[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}