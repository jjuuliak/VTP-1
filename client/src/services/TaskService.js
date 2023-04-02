const API_BASE_URL = 'http://localhost:8080/api';

const TaskService = {
  async fetchTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  },

  async addTask(task) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding task:', error);
      return null;
    }
  },

  async closeTask(taskId) {
    try {
      await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Closed' }),
      });
    } catch (error) {
      console.error('Error closing task:', error);
    }
  },

  handleAddTaskPopup() {
    // Implement the logic to display the "Add Task" popup
  },

};

export default TaskService;