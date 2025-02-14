import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Lock, Unlock } from 'lucide-react';

interface LLMSettings {
  openai_key: boolean;
  gemini_key: boolean;
  deepseek_key: boolean;
  claude_key: boolean;
  selected_model: string;
}

const LLMSettings = () => {
  const [settings, setSettings] = useState<LLMSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('user_llm_settings')
        .select('*')
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error: any) {
      console.error('Error fetching settings:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModelChange = async (model: string) => {
    try {
      const { error } = await supabase
        .from('user_llm_settings')
        .update({ selected_model: model })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      setSettings(prev => prev ? { ...prev, selected_model: model } : null);
      toast({
        title: "Success",
        description: "Model preference updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleKeyConfiguration = async (provider: string) => {
    const modelKeyMap = {
      'openai': 'OPENAI_API_KEY',
      'gemini': 'GEMINI_API_KEY',
      'deepseek': 'DEEPSEEK_API_KEY',
      'claude': 'CLAUDE_API_KEY'
    };

    const keyName = modelKeyMap[provider as keyof typeof modelKeyMap];
    if (!keyName) return;

    try {
      const currentValue = settings?.[`${provider}_key` as keyof LLMSettings];
      const updateData = {
        [`${provider}_key`]: !currentValue,
      };

      const { error } = await supabase
        .from('user_llm_settings')
        .update(updateData)
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      setSettings(prev => prev ? { ...prev, ...updateData } : null);
      
      toast({
        title: "Success",
        description: `API key ${currentValue ? 'removed' : 'configured'} successfully`,
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  return (
    <Card className="relative z-10 overflow-visible">
      <CardHeader>
        <CardTitle>AI Model Settings</CardTitle>
        <CardDescription>Configure your AI model preferences and API keys</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="model-select">Selected Model</Label>
          <Select
            value={settings?.selected_model || 'openai'}
            onValueChange={handleModelChange}
          >
            <SelectTrigger id="model-select" className="bg-white border-2 hover:bg-gray-50 transition-colors">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="bg-white border-2 shadow-xl z-[100] min-w-[200px]"
              align="start"
            >
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="gemini">Google Gemini</SelectItem>
              <SelectItem value="deepseek">DeepSeek</SelectItem>
              <SelectItem value="claude">Claude AI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'openai', label: 'OpenAI API Key' },
            { key: 'gemini', label: 'Gemini API Key' },
            { key: 'deepseek', label: 'DeepSeek API Key' },
            { key: 'claude', label: 'Claude API Key' },
          ].map((item) => (
            <Button
              key={item.key}
              variant={settings?.[`${item.key}_key` as keyof LLMSettings] ? "secondary" : "outline"}
              className="w-full relative group hover:shadow-md transition-all duration-200 border-2"
              onClick={() => handleKeyConfiguration(item.key)}
            >
              <div className="absolute left-4 w-6 h-6 flex items-center justify-center">
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
              <span className="ml-8">{item.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LLMSettings;
