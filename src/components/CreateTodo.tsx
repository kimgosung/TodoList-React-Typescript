interface InputTextProps {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(event: React.FormEvent<HTMLFormElement>): void;
  inputText: string;
}

const CreateTodo = ({ onChange, onSubmit, inputText }: InputTextProps) => {
  return (
    <div className="mt-5 flex justify-center">
      <form onSubmit={(event) => onSubmit(event)}>
        <input
          className="p-3 mr-2 text-sm border-solid border rounded-md w-96 focus:outline-none"
          type="text"
          placeholder="할 일을 입력해주세요."
          onChange={(e) => onChange(e)}
          value={inputText}
        />
        {inputText ? (
          <button
            type="submit"
            className="pl-4 pr-4 pb-3 pt-3 bg-slate-800 text-sm rounded-md font-semibold text-white"
          >
            등록하기
          </button>
        ) : (
          <button
            type="submit"
            disabled={true}
            className="pl-4 pr-4 pb-3 pt-3 bg-slate-800 text-sm rounded-md font-semibold text-white"
          >
            등록하기
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateTodo;
