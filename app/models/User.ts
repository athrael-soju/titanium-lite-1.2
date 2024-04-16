interface IUser {
  email: string;
  name: string;

  // assistant
  isAssistantEnabled: boolean;

  // speech
  isTextToSpeechEnabled: boolean;
  model: string;
  voice: string;
}
