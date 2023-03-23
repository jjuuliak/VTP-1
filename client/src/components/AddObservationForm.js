import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const AddObservationForm = ({ open, handleClose, handleSubmit }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    title: "",
    criterion: "",
    observation: "",
    reason: "",
    impact: "",
    significance: "",
    inspectionMethods: "",
  });

  const [criteria, setCriteria] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCriterion = () => {
    setCriteria([...criteria, formData.criterion]);
    setFormData({ ...formData, criterion: '' });
  };

  const submitForm = () => {
    handleSubmit(formData);
    setFormData({
      title: "",
      criterion: "",
      observation: "",
      reason: "",
      impact: "",
      significance: "",
      inspectionMethods: "",
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('addObservation.addNewObservation')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={t('addObservation.inspectionID')}
          type="text"
          InputProps={{ readOnly: true }}
        />
        <TextField
          margin="dense"
          label={t('addObservation.observationID')}
          type="text"
          InputProps={{ readOnly: true }}
        />
        <TextField
          margin="dense"
          label={t('addObservation.observationNumber')}
          type="text"
          InputProps={{ readOnly: true }}
        />

        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label={t('addObservation.title')}
          type="text"
          fullWidth
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <Typography variant="h6" gutterBottom>
          {t('addObservation.criterion')}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
            {criteria.map((criterion, index) => (
                <TableRow key={index}>
                  <TableCell>{criterion.title}</TableCell>
                  <TableCell>{criterion.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={1}>
          <Button variant="contained" onClick={handleAddCriterion}>
            {t('addObservation.add')}
          </Button>
        </Box>
        <TextField
          margin="dense"
          id="observation"
          name="observation"
          label={t('addObservation.observation')}
          type="text"
          fullWidth
          value={formData.observation}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="reason"
          name="reason"
          label={t('addObservation.reason')}
          type="text"
          fullWidth
          value={formData.reason}
          onChange={handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="impact"
          name="impact"
          label={t('addObservation.impact')}
          type="text"
          fullWidth
          value={formData.impact}
          onChange={handleInputChange}
          required
        />
        <FormControl fullWidth margin="dense" required>
          <InputLabel id="merkitys-label">{t('addObservation.significance')}</InputLabel>
          <Select
            labelId="significance-label"
            id="significance"
            name="significance"
            value={formData.significance}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="1">{t('addObservation.minorSignificance')}</MenuItem>
            <MenuItem value="2">{t('addObservation.moderateSignificance')}</MenuItem>
            <MenuItem value="3">{t('addObservation.majorSignificance')}</MenuItem>
            <MenuItem value="4">{t('addObservation.veryHighSignificance')}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          id="inspectionMethods"
          name="inspectionMethods"
          label={t('addObservation.inspectionMethodsTasks')}
          type="text"
          fullWidth
          value={formData.inspectionMethods}
          onChange={handleInputChange}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('addObservation.cancel')}</Button>
        <Button onClick={submitForm}>{t('addObservation.saveObservation')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddObservationForm;