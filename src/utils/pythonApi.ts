
import { supabase } from "@/integrations/supabase/client";

export const callPythonBackend = async (data: any) => {
  try {
    console.log('Calling Python backend with data:', data);
    const { data: response, error } = await supabase.functions.invoke('python_handler', {
      body: data,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (error) {
      console.error('Error from Python backend:', error);
      throw error;
    }
    
    console.log('Python backend response:', response);
    return response;
  } catch (error) {
    console.error('Error calling Python backend:', error);
    throw error;
  }
};
