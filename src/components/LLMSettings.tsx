
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelSelector } from "./ModelSelector";
import { ApiKeyInput } from "./ApiKeyInput";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import { ModelType } from "@/types/llm-settings";

const LLMSettings = () => {
  const { settings, loading, handleModelChange, handleKeyConfiguration, handleApiKeyChange } = useLLMSettings();

  if (loading) {
    return <div>Loading settings...</div>;
  }

  const selectedModel: ModelType = settings?.selected_model || 'openai';

  return (
    <Card className="relative z-10 overflow-visible">
      <CardHeader>
        <CardTitle>AI Model Settings</CardTitle>
        <CardDescription>Configure your AI model preferences and API keys</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={handleModelChange}
        />

        <div className="grid grid-cols-1 gap-6">
          {[
            { key: 'openai', label: 'OpenAI API Key' },
            { key: 'gemini', label: 'Gemini API Key' },
            { key: 'deepseek', label: 'DeepSeek API Key' },
            { key: 'claude', label: 'Claude API Key' },
          ].map((item) => (
            <ApiKeyInput
              key={item.key}
              item={item}
              settings={settings}
              onApiKeyChange={handleApiKeyChange}
              onKeyConfiguration={handleKeyConfiguration}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LLMSettings;
