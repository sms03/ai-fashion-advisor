
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock, Unlock, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { LLMSettings } from '@/types/llm-settings';

interface ApiKeyInputProps {
  item: { key: string; label: string };
  settings: LLMSettings | null;
  onApiKeyChange: (provider: string, value: string) => void;
  onKeyConfiguration: (provider: string) => void;
}

const getApiKeyLink = (provider: string) => {
  const links: Record<string, string> = {
    openai: 'https://platform.openai.com/api-keys',
    gemini: 'https://makersuite.google.com/app/apikey',
    deepseek: 'https://platform.deepseek.com/api',
    claude: 'https://console.anthropic.com/account/keys'
  };
  return links[provider] || '#';
};

export const ApiKeyInput = ({ 
  item, 
  settings, 
  onApiKeyChange, 
  onKeyConfiguration 
}: ApiKeyInputProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const apiKeyLink = getApiKeyLink(item.key);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={`${item.key}-api-key`}>{item.label}</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowApiKey(!showApiKey)}
          className="h-8 w-8 p-0"
        >
          {showApiKey ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            id={`${item.key}-api-key`}
            type={showApiKey ? "text" : "password"}
            value={String(settings?.[`${item.key}_api_key` as keyof LLMSettings] || '')}
            onChange={(e) => onApiKeyChange(item.key, e.target.value)}
            className="w-full"
            placeholder={`Enter your ${item.label}`}
          />
        </div>
        <Button
          variant={settings?.[`${item.key}_key` as keyof LLMSettings] ? "secondary" : "outline"}
          className="relative group hover:shadow-md transition-all duration-200 border-2 w-20"
          onClick={() => onKeyConfiguration(item.key)}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {settings?.[`${item.key}_key` as keyof LLMSettings] ? (
              <>
                <Lock className="absolute transition-all duration-200 group-hover:scale-0" />
                <Unlock className="absolute transition-all duration-200 scale-0 group-hover:scale-100" />
              </>
            ) : (
              <>
                <Unlock className="absolute transition-all duration-200 group-hover:scale-0" />
                <Lock className="absolute transition-all duration-200 scale-0 group-hover:scale-100" />
              </>
            )}
          </div>
        </Button>
      </div>
      <a 
        href={apiKeyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm text-accent hover:underline mt-1"
      >
        Get your {item.label} <ExternalLink className="h-3 w-3 ml-1" />
      </a>
    </div>
  );
};
