
import { ModelType } from "@/types/llm-settings";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModelSelectorProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
}

export const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="model-select">Selected Model</Label>
      <Select
        value={selectedModel}
        onValueChange={onModelChange}
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
  );
};
