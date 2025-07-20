import { Request, Response, NextFunction } from 'express';
import { Task, tasks } from '../model/Task';

export const createTask = (req: Request, res: Response, next: NextFunction) => {
    try {
        const updates = req.body
        console.log('Server: Receiving data for createTask:', updates);
        const newTask: Task = {id: Date.now(), ...updates}
        tasks.push(newTask)
        console.log('Server: New task created:', newTask);
        res.status(200).json(newTask)
    } catch(error) {
      console.error('Server: Error in createTask:', error);
        next(error)
    }
}

export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Server: Fetching all tasks.');
    res.json(tasks);
  } catch (error) {
    console.error('Server: Error in getTasks:', error);
    next(error);
  }
};

export const getTaskById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    console.log(`Server: Receiving request for task with ID: ${id}`)
    const task = tasks.find((i) => i.id === id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    console.log('Server: Task found:', task);
    res.json(task);
  } catch (error) {
     console.error('Server: Error in getTaskById:', error);
    next(error);
  }
};

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;
    console.log(`Server: Receiving update request for task ID: ${id}`); // Лог ID
    console.log('Server: Update payload:', updates);
    const taskIndex = tasks.findIndex((i) => i.id === id);
    if (taskIndex === -1) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    console.log('Server: Task before update:', tasks[taskIndex]);
    tasks[taskIndex] = {...tasks[taskIndex], ...updates};
    console.log('Server: Task after update:', tasks[taskIndex]);
    res.json(tasks[taskIndex]);
  } catch (error) {
    console.error('Server: Error in updateTask:', error);
    next(error);
  }
};

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex((i) => i.id === id);
    if (taskIndex === -1) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    const deletedItem = tasks.splice(taskIndex, 1)[0];
    res.json(deletedItem);
  } catch (error) {
    next(error);
  }
};