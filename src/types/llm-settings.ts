
export type ModelType = 'openai' | 'gemini' | 'deepseek' | 'claude';

export interface LLMSettings {
  openai_key: boolean;
  gemini_key: boolean;
  deepseek_key: boolean;
  claude_key: boolean;
  selected_model: ModelType;
  openai_api_key: string | null;
  gemini_api_key: string | null;
  deepseek_api_key: string | null;
  claude_api_key: string | null;
}
