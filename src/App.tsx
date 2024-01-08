import React from 'react';
import './scss/app.scss';
import '@fortawesome/fontawesome-free/css/all.css';


import Progress from './components/progress/index';
import AppBoxTodo from './sections/app/AppBoxTodo';

import api from './services/api';

import { useEffect , useState } from 'react';

const TodoContext = React.createContext<any>(null);
const App = () => {
  const [todosList, setTodosList] = useState([]);
  useEffect(() => {
    const fectchTodo = async () => {
      await api.get('todos').then((response: any) => {
        setTodosList(response.data);
      });
    };
    fectchTodo();
  },[]);
  


 

  return (
    <TodoContext.Provider value={{todosList,setTodosList}}>
      <div className="App myContainer">
        <div className="box-app-todo">
          <Progress />
          <AppBoxTodo />
        </div>

      </div>
    </TodoContext.Provider>
  );
}

export { TodoContext }
export default App;
