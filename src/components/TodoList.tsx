import { useState, useRef, useEffect } from "react";
import CreateTodo from "./CreateTodo";
import TodoItem from "./Todoitem";

export interface TList {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todoList, setTodoList] = useState<TList[]>([]);
  const [inputText, setInputText] = useState("");
  const todoListRef = useRef<HTMLDivElement>(null);

  const textTypingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const textInputHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newTodo: TList = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    setInputText("");
  };

  const textDeleteHandler = (id: number) => {
    setTodoList(todoList.filter((TodoItem) => TodoItem.id !== id));
  };

  const textUpdateHandler = (newTodo: TList): void => {
    const newTodoList = todoList.map((item) => {
      if (item.id === newTodo.id) {
        return newTodo;
      } else {
        return item;
      }
    });
    setTodoList(newTodoList);
  };

  const today = new Date();

  const dateString = today.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayName = today.toLocaleString("ko-KR", { weekday: "long" });

  useEffect(() => {
    if (todoListRef.current) {
      todoListRef.current.scrollTop = todoListRef.current.scrollHeight;
    }
  }, [todoList]);

  return (
    <div className="w-128 h-256 m-auto border rounded-xl mt-20 flex flex-col">
      <div className="flex-none">
        <h3 className="ml-6 text-4xl font-bold mt-10 mb-2">{dateString}</h3>
        <h5 className="ml-6 mb-10 text-2xl text-zinc-400">{dayName}</h5>
        <div className="w-full h-1 border-t mb-5"></div>
      </div>
      <div className="flex-1 overflow-y-auto" ref={todoListRef}>
        {todoList.map((item) => (
          <TodoItem
            id={item.id}
            text={item.text}
            completed={item.completed}
            onClickDelete={textDeleteHandler}
            onClickUpdate={textUpdateHandler}
          />
        ))}
      </div>
      <div className="mt-auto mb-6">
        <CreateTodo
          onChange={textTypingHandler}
          onSubmit={textInputHandler}
          inputText={inputText}
        />
      </div>
    </div>
  );
};

export default TodoList;
