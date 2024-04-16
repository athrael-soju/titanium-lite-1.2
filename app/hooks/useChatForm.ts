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
}

export const useChatForm = () => {
  const formMethods = useForm<ChatFormValues>({
    defaultValues: {
      name: '',
      description: '',
      transcript: '',
      model: '',
      voice: '',
      isLoading: false,
      isAssistantEnabled: false,
      isTextToSpeechEnabled: false,
      isSpeechToTextEnabled: false
    },
  });

  return formMethods;
};
