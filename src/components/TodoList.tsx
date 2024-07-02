import React, { useState, useEffect } from 'react';
import { Button, TextInput } from 'carbon-components-react';
import '@carbon/styles/css/styles.css';

interface ITodo {
  id: number;
  task: string;
  completed: boolean;
  isCompleted?: boolean;
}

const TodoList: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    const newTodo: ITodo = {
      id: Date.now(),
      task: inputValue,
      completed: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  };

  const handleToggleComplete = (todoIndex: number) => {
    const updatedTodos = todos.map((todo, index) => {
      if (index === todoIndex) {
        return {...todo, isCompleted:!todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };
  
  

  const handleDeleteTodo = (todoIndex: number) => {
    const updatedTodos = todos.filter((_, index) => index!== todoIndex);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className='container'>
    <div className="bx--grid bx--grid--full-width">
      <div className="bx--row">
        <div className="bx--col-lg-16">
          <TextInput
            id="new-task-input"
            labelText="Novo opravilo:"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Vnesite opravilo"
          />
          <Button kind="primary" onClick={handleAddTodo}>Dodaj</Button>
          <ul className="bx--list-box__menu bx--list-box__menu--scrollable">
          {todos.map((todo, index) => (
            <li key={todo.id} className={`bx--list-box__menu-item ${todo.isCompleted? 'completed' : ''}`}>
                <span style={{ color: todo.isCompleted? 'green' : 'black' }}>{todo.task}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Button kind="ghost" onClick={() => handleDeleteTodo(index)}>Izbriši</Button>
                <Button kind="ghost" onClick={() => handleToggleComplete(index)} style={{ display: todo.isCompleted? 'none' : 'initial' }}>Dokončano</Button>
                </div>
            </li>
            ))}


        </ul>

        </div>
      </div>
    </div>
    </div>
  );
};

export default TodoList;
