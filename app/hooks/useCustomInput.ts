import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useFormContext } from 'react-hook-form';
import { retrieveServices } from '@/app/services/commonService';

interface UseCustomInputProps {
  onSendMessage: (message: string) => Promise<void>;
}

export const useCustomInput = ({ onSendMessage }: UseCustomInputProps) => {
  const { data: session } = useSession();
  const [inputValue, setInputValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState({ speech: false });
  const { setValue } = useFormContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const prefetchServices = useCallback(async () => {
    const userEmail = session?.user?.email as string;

    // Prefetch speech data
    let response = await retrieveServices({
      userEmail,
      serviceName: 'speech',
    });
    if (response.isTextToSpeechEnabled !== undefined) {
      setValue('isTextToSpeechEnabled', response.isTextToSpeechEnabled);
      setValue('model', response.model);
      setValue('voice', response.voice);
    }
  }, [session?.user?.email, setValue]);

  useEffect(() => {
    prefetchServices();
  }, [prefetchServices]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const appendText = (text: string) => {
    setInputValue((prevValue) => `${prevValue} ${text}`.trim());
  };

  const handleSendClick = async () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDialog = (dialog: keyof typeof isDialogOpen) => {
    setIsDialogOpen((prev) => ({ ...prev, [dialog]: !prev[dialog] }));
    handleMenuClose();
  };

  return {
    inputValue,
    appendText,
    handleInputChange,
    handleSendClick,
    isDialogOpen,
    toggleDialog,
    handleMenuOpen,
    handleMenuClose,
    anchorEl,
  };
};
