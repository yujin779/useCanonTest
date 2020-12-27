import { createGlobalState } from "react-hooks-global-state";

export const Scene = {
  Opning: 0,
  Playing: 1,
  GameOver: 2
};

const initialState = {
  scene: Scene.Opning,
score: 0
};
export const { useGlobalState } = createGlobalState(initialState);
