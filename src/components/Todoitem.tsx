import { useState } from "react";
import { TList } from "./TodoList";
import { FaCheck } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onClickDelete(id: number): void;
  onClickUpdate(updatedTodoItem: TList): void;
}

const TodoItem = ({
  id,
  text,
  completed,
  onClickDelete,
  onClickUpdate,
}: TodoItemProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedText, setUpdatedText] = useState<string>(text);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedText(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTodoItem = {
      id: id,
      text: updatedText,
      completed: completed,
    };
    onClickUpdate(updatedTodoItem);
    setIsUpdating(false);
  };

  const handleComplete = () => {
    const updatedTodoItem = {
      id: id,
      text: text,
      completed: !completed,
    };
    onClickUpdate(updatedTodoItem);
  };

  return (
    <div className="flex justify-between items-center ml-10 mr-10">
      <div className="flex items-center">
        {!isUpdating ? (
          <li className="list-none m-3 flex">
            <button
              className="w-8 h-8 flex justify-center items-center border border-black mr-4 rounded-full p-1"
              onClick={handleComplete}
            >
              {completed ? <FaCheck /> : null}
            </button>
            <div
              className="text-2xl font-light"
              style={completed ? { textDecoration: "line-through" } : undefined}
            >
              {text}
            </div>
          </li>
        ) : (
          <li className="list-none m-3 flex">
            <button onClick={handleComplete}>
              {completed ? <FaCheck /> : null}
            </button>
            <form onSubmit={handleFormSubmit}>
              <input
                className="text-2xl font-light focus:outline-none"
                type="text"
                value={updatedText}
                onChange={handleInputChange}
              />
            </form>
          </li>
        )}
      </div>
      <div className="flex">
        {!isUpdating ? (
          <>
            <button
              className="mr-5"
              type="button"
              onClick={() => setIsUpdating(true)}
            >
              <FaRegEdit size="20" color="#777777" />
            </button>
            <button type="button" onClick={() => onClickDelete(id)}>
              <FaX size="20" color="#777777" />
            </button>
          </>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="flex">
              <button className="mr-5" type="submit">
                <FaCheck size="20" color="#777777" />
              </button>
              <button type="button" onClick={() => setIsUpdating(false)}>
                <FaX size="20" color="#777777" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
