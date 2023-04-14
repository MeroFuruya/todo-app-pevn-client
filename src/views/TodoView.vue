<template>
    <div class="todo">
        <div class="todo__input">
            <input type="text" v-model="newTodoTitle" @keyup.enter="addTodo" />
            <button @click="addTodo">Add</button>
        </div>
        <div class="todo__list">
        <div class="todo__list__item" v-for="(task, index) in tasks" :key="index">
            <div class="todo__list__item__text">
                <input type="checkbox" v-model="task.completed" @change="updateTodo(tasks[index])"/>
                {{ task.title }}
                <button @click="deleteTodo(tasks[index])">Delete</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ToDo } from '../todo';
import { TodoTask } from '@/TodoTask';

export default defineComponent({
    name: "TodoView",
    data() {
        let tasks: TodoTask[] = [];
        const todo: ToDo = new ToDo();
        return {
            tasks: tasks,
            todo: todo,
            newTodoTitle: "",
        };
    },
    mounted() {
        this.todo.getTodoTasks().then((new_tasks: TodoTask[]) => {
            this.tasks = new_tasks;
            console.log(this.tasks);
        });
    },
    methods: {
        addTodo() {
            this.todo.addTodoTask(this.newTodoTitle).then((task: TodoTask) => {
                this.tasks.push(task);
            });
            this.newTodoTitle = "";
        },
        deleteTodo(task: TodoTask) {
            this.todo.deleteTodoTask(task).then(() => {
                this.tasks = this.tasks.filter((t) => t.id !== task.id);
            });
        },
        updateTodo(task: TodoTask) {
            this.todo.updateTodoTask(task).then((updated: TodoTask) => {
                this.tasks = this.tasks.map((t) => {
                    if (t.id === updated.id) {
                        return updated;
                    }
                    return t;
                });
            });
        },
    },
    });
</script>
