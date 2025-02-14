
import { supabase } from "@/integrations/supabase/client";

export const callPythonBackend = async (data: any) => {
  try {
    const { data: response, error } = await supabase.functions.invoke('python_handler', {
      body: data,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (error) throw error;
    return response;
  } catch (error) {
    console.error('Error calling Python backend:', error);
    throw error;
  }
};
