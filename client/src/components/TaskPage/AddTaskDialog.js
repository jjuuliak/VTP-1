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

const AddTaskDialog = ({ open, onClose, onSave }) => {
  const { t } = useTranslation();
  const [taskId, setTaskId] = useState('');
  const [status, setStatus] = useState('');
  const [methods, setMethods] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comments, setComments] = useState('');
  const [materialLink, setMaterialLink] = useState('');
  const [workpapersLink, setWorkpapersLink] = useState('');
  const [responsible, setResponsible] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onSave({
      taskId,
      status,
      methods,
      startDate,
      endDate,
      comments,
      materialLink,
      workpapersLink,
      responsible,
      notes,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{t('tasks.addDialogTitle')}</DialogTitle>
      <DialogContent>
        {/* Add form fields for each property */}
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('tasks.taskId')}
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('tasks.status')}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('tasks.methods')}
            value={methods}
            onChange={(e) => setMethods(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('tasks.startDate')}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('tasks.endDate')}
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('tasks.comments')}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('tasks.materialLink')}
            value={materialLink}
            onChange={(e) => setMaterialLink(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('tasks.workpapersLink')}
            value={workpapersLink}
            onChange={(e) => setWorkpapersLink(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('tasks.responsible')}
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label={t('tasks.notes')}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {t('tasks.cancel')}
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {t('tasks.add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
