import { AppState } from "@/types/state";
import { Action } from "./actions";
import { boardReducer } from "./board.reducer";
import { taskReducer } from "./task.reducer";

export const rootReducer = (state: AppState, action: Action): AppState => {
  if (action.type === "SET_MUTATING") {
    return { ...state, isMutating: action.payload };
  }
  if (action.type === "SET_FETCHING") {
    return { ...state, isFetching: action.payload };
  }

  const afterBoard = boardReducer(state, action);
  const afterTask = taskReducer(afterBoard, action);

  return afterTask;
};
