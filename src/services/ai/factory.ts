import { AIService } from './types';
import { MistralAIService } from './mistral';
import { GeminiService } from './gemini';
import { GPT4Service } from './gpt4o';
import { AI_CONFIG, ENABLED_SERVICES } from './config';

export class AIServiceFactory {
  private static instances: AIService[] = [];

  static getInstances(): AIService[] {
    if (this.instances.length === 0) {
      this.instances = ENABLED_SERVICES.map(service => {
        switch (service) {
          case 'mistral':
            return new MistralAIService();
          case 'gemini':
            return new GeminiService();
          case 'openai':
            return new GPT4Service();
          default:
            throw new Error(`Unknown AI service: ${service}`);
        }
      });

      // Always ensure at least one service is available
      if (this.instances.length === 0) {
        console.warn('No AI services configured, using fallback service');
        this.instances.push(new GeminiService());
      }
    }
    return this.instances;
  }

  static async tryAll<T>(
    operation: (service: AIService) => Promise<T>,
    errorMessage: string
  ): Promise<T> {
    const services = this.getInstances();
    const errors: Error[] = [];

    for (const service of services) {
      try {
        return await operation(service);
      } catch (error) {
        console.error(`AI service failed:`, error);
        errors.push(error as Error);
        continue;
      }
    }

    const errorDetails = errors.map(e => e.message).join('; ');
    throw new Error(`${errorMessage}. Details: ${errorDetails}`);
  }
}