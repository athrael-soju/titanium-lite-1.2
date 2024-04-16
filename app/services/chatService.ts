let audioQueue: string[] = [];
let isPlaying = false;

const delay = (ms: number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const playNextAudio = () => {
  if (audioQueue.length > 0 && !isPlaying) {
    const audioUrl = audioQueue.shift();
    const audio = new Audio(audioUrl);
    isPlaying = true;
    audio.play();
    audio.onended = async () => {
      await delay(250);
      isPlaying = false;
      playNextAudio();
    };
  }
};

const retrieveTextFromSpeech = async (
  text: string,
  model: string,
  voice: string
): Promise<void> => {
  try {
    const response = await fetch('/api/speech/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model, voice }),
    });
    if (!response.ok) {
      throw new Error('Failed to convert text to speech');
    }
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    audioQueue.push(audioUrl);
    if (!isPlaying) {
      playNextAudio();
    }
  } catch (error) {
    console.error('STT conversion error: ', error);
    return undefined;
  }
};

const retrieveAIResponse = async (
  message: string,
  userEmail: string,
  isAssistantEnabled: boolean
): Promise<Response | ReadableStreamDefaultReader<Uint8Array> | undefined> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage: message, userEmail }),
    });
    if (isAssistantEnabled) {
      return response;
    } else {
      return response.body?.getReader();
    }
  } catch (error) {
    console.error('Failed to fetch AI response: ', error);
    return undefined;
  }
};

export { retrieveAIResponse, retrieveTextFromSpeech };
