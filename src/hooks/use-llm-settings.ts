
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { LLMSettings, ModelType } from "@/types/llm-settings";

export const useLLMSettings = () => {
  const [settings, setSettings] = useState<LLMSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('user_llm_settings')
        .select('*')
        .single();

      if (error) throw error;
      
      const selectedModel = data?.selected_model || 'openai';
      setSettings({
        ...data,
        selected_model: selectedModel as ModelType
      } as LLMSettings);
    } catch (error: any) {
      console.error('Error fetching settings:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModelChange = async (model: ModelType) => {
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

  const handleApiKeyChange = async (provider: string, value: string) => {
    try {
      const updateData = {
        [`${provider}_api_key`]: value,
      };

      const { error } = await supabase
        .from('user_llm_settings')
        .update(updateData)
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      setSettings(prev => prev ? { ...prev, ...updateData } : null);
      
      toast({
        title: "Success",
        description: "API key updated successfully",
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

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    handleModelChange,
    handleKeyConfiguration,
    handleApiKeyChange,
  };
};
