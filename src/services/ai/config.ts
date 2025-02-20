import { config } from '../../config/env';

// Prioritize services in order of reliability
export const AI_CONFIG = {
  gemini: {
    enabled: true,
    apiKey: config.geminiApiKey,
    model: 'gemini-pro',
    priority: 1
  },
  mistral: {
    enabled: Boolean(config.mistralApiKey),
    apiKey: config.mistralApiKey,
    model: 'mistral-tiny',
    priority: 2
  },
  openai: {
    enabled: Boolean(config.openaiApiKey),
    apiKey: config.openaiApiKey,
    model: 'gpt-4',
    priority: 3
  },
} as const;

export const ENABLED_SERVICES = Object.entries(AI_CONFIG)
  .filter(([_, config]) => config.enabled)
  .sort((a, b) => a[1].priority - b[1].priority)
  .map(([name]) => name);

export const DEFAULT_SERVICE = 'gemini';