import React, { useEffect, useState, useContext  } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import StepPopupContext from '../../contexts/StepPopupContext';
import FirstTable from './FirstTable';
import SecondTable from './SecondTable';
import ThirdTable from './ThirdTable';
import StepsTable from './StepsTable';
import TaskService from '../../services/TaskService';
import AddStepDialog from './AddStepDialog';
import AddTaskDialog from './AddTaskDialog';

const TaskPage = () => {
  const { t } = useTranslation();
  const { showStepPopup, setShowStepPopup } = useContext(StepPopupContext);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await TaskService.fetchTasks();
      setTasksData(data);
    };
    fetchData();
  }, []);

  const handleAddTaskPopup = () => {
    setShowTaskPopup(true);
  };

  const handleSaveTask = (taskData) => {
    // Implement your logic to save the task information, e.g., send data to the API
    // Example: TaskService.saveTask(taskData);
  };

  const handleAddTask = async (task) => {
    const newTask = await TaskService.addTask(task);
    setTasksData([...tasksData, newTask]);
  };

  const handleCloseTask = async (taskId) => {
    await TaskService.closeTask(taskId);
    const updatedTasks = tasksData.map(task =>
      task.id === taskId ? { ...task, status: 'Closed' } : task
    );
    setTasksData(updatedTasks);
  };

  const handleCloseStepPopup = () => {
    setShowStepPopup(false);
  };

  const handleSaveStep = (stepData) => {
    // Implement your logic to save the step information, e.g., send data to the API
    // Example: TaskService.saveStep(stepData);
  };

  return (
    <div>
      <h2>{t('tasks.commonMethodsAndTasks')}</h2>
      <FirstTable data={tasksData} />
      <SecondTable data={tasksData} />
      <ThirdTable data={tasksData} onCloseTask={handleCloseTask} />
      <Button variant="contained" color="primary"onClick={handleAddTaskPopup}>
        {t('tasks.addNewTask')}
      </Button >

      <h2>{t('tasks.keyInspectionSteps')}</h2>
      <StepsTable data={tasksData} />
      <Button variant="contained" color="primary" onClick={() => setShowStepPopup(true)}>
        {t('tasks.addNewTask')}
      </Button >
      <AddTaskDialog open={showTaskPopup} onClose={() => setShowTaskPopup(false)} onSave={handleSaveTask} />
      <AddStepDialog open={showStepPopup} onClose={handleCloseStepPopup} onSave={handleSaveStep} />
    </div>
  );
};

export default TaskPage;
