import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCustomInput } from '@/app/hooks/useCustomInput';
import { RecordVoiceOver } from '@mui/icons-material';
import { Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import { Microphone } from '../Speech/stt';
import MenuIcon from '@mui/icons-material/Menu';
import SpeechDialog from '../Speech/tts';

const CustomizedInputBase = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => Promise<void>;
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    inputValue,
    appendText,
    handleInputChange,
    handleSendClick,
    isDialogOpen,
    toggleDialog,
    handleMenuOpen,
    handleMenuClose,
    anchorEl
  } = useCustomInput({ onSendMessage });

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: isSmallScreen ? '100%' : 650,
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleSendClick();
          }
        }}
      >
        <Microphone onAppendText={appendText} />
        <Tooltip title="View features">
          <IconButton
            sx={{ p: '10px' }}
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => toggleDialog('speech')}>
            <ListItemIcon>
              <RecordVoiceOver />
            </ListItemIcon>
            Speech
          </MenuItem>
        </Menu>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter your message"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Tooltip title="Send message">
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="send"
            onClick={handleSendClick}
          >
            <SendIcon />
          </IconButton>
        </Tooltip>
      </Paper>

      <SpeechDialog
        open={isDialogOpen.speech}
        onClose={() => toggleDialog('speech')}
      />

    </>
  );
};

export default CustomizedInputBase;
