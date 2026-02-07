import {Box, IconButton, Modal, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import {MODAL_STYLES} from '../../../Constants';

interface Props {
  show: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWindow: React.FC<Props> = ({ show, title, onClose, children }) => {
  return (
    <Modal open={show} onClose={onClose}>
      <Box sx={MODAL_STYLES}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalWindow;