import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

interface SpeechFormProps {
  error: { model: boolean; voice: boolean };
}

const SpeechForm: React.FC<SpeechFormProps> = ({ error }) => {
  const { watch, setValue } = useFormContext();
  const model = watch('model');
  const voice = watch('voice');

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <FormControl margin="dense" sx={{ flexGrow: 1, marginRight: '16px' }}>
        <InputLabel id="model-select-label">Model</InputLabel>
        <Select
          labelId="model-select-label"
          id="model-select"
          value={model}
          label="Model"
          onChange={(e) => setValue('model', e.target.value as string)}
          error={error.model}
        >
          <MenuItem value={'tts-1'}>TTS-1</MenuItem>
          <MenuItem value={'tts-1-hd'}>TTS-1 HD</MenuItem>
        </Select>
      </FormControl>
      <FormControl margin="dense" sx={{ flexGrow: 1 }}>
        <InputLabel id="voice-select-label">Voice</InputLabel>
        <Select
          labelId="voice-select-label"
          id="voice-select"
          value={voice}
          label="Voice"
          onChange={(e) => setValue('voice', e.target.value as string)}
          error={error.voice}
        >
          <MenuItem value={'nova'}>Nova</MenuItem>
          <MenuItem value={'alloy'}>Alloy</MenuItem>
          <MenuItem value={'echo'}>Echo</MenuItem>
          <MenuItem value={'fable'}>Fable</MenuItem>
          <MenuItem value={'onyx'}>Onyx</MenuItem>
          <MenuItem value={'shimmer'}>Shimmer</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SpeechForm;