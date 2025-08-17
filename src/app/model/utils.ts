import type { State } from 'app/model/types';

export function removeChoice(state: State, choiceId: string) {
  const choice = state.choices[choiceId];
  if (!choice) {
    return;
  }

  delete state.choices[choiceId];
  const { from, to } = choice;
  state.scenes[from].choiceIds = deleteIdFromArray(state.scenes[from].choiceIds, choiceId);
  state.scenes[to].choiceIds = deleteIdFromArray(state.scenes[to].choiceIds, choiceId);
}

export function deleteIdFromArray(arr: string[], toDelete: string) {
  return arr.filter(id => id !== toDelete);
}

export function moveChoiceId(state: State, deleteFromSceneId: string, putToSceneId: string, choiceId: string) {
  const { choiceIds } = state.scenes[deleteFromSceneId];
  state.scenes[deleteFromSceneId].choiceIds = deleteIdFromArray(choiceIds, choiceId);
  state.scenes[putToSceneId].choiceIds.push(choiceId);
}
