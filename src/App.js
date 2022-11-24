import './assets/styles/styles.scss';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/Todoes/TodoList';

function App() {
    return (
    <div className="App">
        <div className="todoes">
            <TodoList/>
        </div>
        <div className="form">
            <AddTodo/>
        </div>
    </div>
    );
}


export default App;
