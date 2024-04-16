import { useForm } from 'react-hook-form';

interface ChatFormValues {
  name: string;
  description: string;
  transcript: string;
  isLoading: boolean;

  // assistant
  isAssistantEnabled: boolean;

  // speech
  model: string;
  voice: string;
  isTextToSpeechEnabled: boolean;
  isSpeechToTextEnabled: boolean;

  // vision
  visionId: string;
  isVisionEnabled: boolean;
  isVisionDefined: boolean;
  visionFiles: {
    id: string;
    visionId: string;
    name: string;
    type: string;
    url: string;
  }[];
}

export const useChatForm = () => {
  const formMethods = useForm<ChatFormValues>({
    defaultValues: {
      name: '',
      description: '',
      transcript: '',
      model: '',
      voice: '',
      visionId: '',
      isLoading: false,
      isAssistantEnabled: false,
      isTextToSpeechEnabled: false,
      isSpeechToTextEnabled: false,
      isVisionEnabled: false,
      isVisionDefined: false,
      visionFiles: [] 
    },
  });

  return formMethods;
};
