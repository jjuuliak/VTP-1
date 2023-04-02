import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const AddStepDialog = ({ open, onClose, onSave }) => {
  const { t } = useTranslation();

  const [phase, setPhase] = useState('');
  const [events, setEvents] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState('');

  const handleSubmit = () => {
    onSave({ phase, events, date, participants });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('steps.addDialogTitle')}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('steps.phase')}
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('steps.events')}
            value={events}
            onChange={(e) => setEvents(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('steps.date')}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('steps.participants')}
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {t('steps.cancel')}
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {t('steps.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStepDialog;
