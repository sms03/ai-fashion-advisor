
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
    <Card className="relative z-10">
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
            <SelectTrigger id="model-select" className="bg-white">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="gemini">Google Gemini</SelectItem>
              <SelectItem value="deepseek">DeepSeek</SelectItem>
              <SelectItem value="claude">Claude AI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant={settings?.openai_key ? "secondary" : "outline"}
            className="w-full relative group"
            onClick={() => handleKeyConfiguration('openai')}
          >
            {settings?.openai_key ? (
              <Lock className="mr-2 h-4 w-4 transition-opacity group-hover:opacity-0" />
            ) : (
              <Unlock className="mr-2 h-4 w-4 transition-opacity group-hover:opacity-0" />
            )}
            <Lock className={`mr-2 h-4 w-4 absolute left-4 transition-opacity ${settings?.openai_key ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`} />
            <Unlock className={`mr-2 h-4 w-4 absolute left-4 transition-opacity ${!settings?.openai_key ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`} />
            OpenAI API Key
          </Button>

          <Button
            variant={settings?.gemini_key ? "secondary" : "outline"}
            className="w-full relative group"
            onClick={() => handleKeyConfiguration('gemini')}
          >
            {settings?.gemini_key ? (
              <Lock className="mr-2 h-4 w-4 transition-opacity group-hover:opacity-0" />
            ) : (
              <Unlock className="mr-2 h-4 w-4 transition-opacity group-hover:opacity-0" />
            )}
            <Lock className={`mr-2 h-4 w-4 absolute left-4 transition-opacity ${settings?.gemini_key ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`} />
            <Unlock className={`mr-2 h-4 w-4 absolute left-4 transition-opacity ${!settings?.gemini_key ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`} />
            Gemini API Key
          </Button>

          <Button
            variant={settings?.deepseek_key ? "secondary" : "outline"}
            className="w-full relative group"
            onClick={() => handleKeyConfiguration('deepseek')}
          >
            {settings?.deepseek_key ? (
              <Lock className="mr-2 h-4 w-4 transition-opacity group-hover:opacity-0" />
            ) : (
              <Unlock className="mr-2 h-4 w-4 transition-opacity group-hover:opacity-0" />
            )}
            <Lock className={`mr-2 h-4 w-4 absolute left-4 transition-opacity ${settings?.deepseek_key ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`} />
            <Unlock className={`mr-2 h-4 w-4 absolute left-4 transition-opacity ${!settings?.deepseek_key ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`} />
            DeepSeek API Key
          </Button>

          <Button
            variant={settings?.claude_key ? "secondary" : "outline"}
            className="w-full relative group"
            onClick={() => handleKeyConfiguration('claude')}
          >
            {settings?.claude_key ? (
              <Lock className="mr-2 h-4 w-4 transition-opacity group-hover:opacity-0" />
            ) : (
              <Unlock className="mr-2 h-4 w-4 transition-opacity group-hover:opacity-0" />
            )}
            <Lock className={`mr-2 h-4 w-4 absolute left-4 transition-opacity ${settings?.claude_key ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`} />
            <Unlock className={`mr-2 h-4 w-4 absolute left-4 transition-opacity ${!settings?.claude_key ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`} />
            Claude API Key
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LLMSettings;
