import { AppState } from "@/types/state";

export const initialState: AppState = {
  boards: {},
  tasks: {},
  isMutating: false,
  isFetching: true, // We start as fetching to show initial loader
};
