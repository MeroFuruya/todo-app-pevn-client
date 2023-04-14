import axios from 'axios';
import { TodoTask } from './TodoTask';

const API_URL = '/tasks';

export class ToDo {
    public async getTodoTasks(): Promise<TodoTask[]> {
        const response = await axios.get(API_URL);
        console.log(response.data.tasks);
        return response.data.tasks;
    }

    public async addTodoTask(title: string): Promise<TodoTask> {
        const response = await axios.post(API_URL, { title });
        return response.data;
    }

    public async updateTodoTask(task: TodoTask): Promise<TodoTask> {
        const response = await axios.put(`${API_URL}/${task.id}`, task);
        return response.data;
    }

    public async deleteTodoTask(task: TodoTask): Promise<void> {
        const response = await axios.delete(`${API_URL}/${task.id}`);
        return response.data;
    }
}
