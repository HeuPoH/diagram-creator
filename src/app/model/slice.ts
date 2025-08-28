import { createSlice} from '@reduxjs/toolkit';
import type { State } from 'app/model/types';
import { sceneReducers } from 'app/model/scene-reducers';
import { choiceReducers } from 'app/model/choice-reducers';

const initialState: State = {
  scenes: { '11': { id: '1', title: 'test', description: 'ewf', choiceIds: ['1'] } },
  choices: { '1': { id: '1', title: 'e', description: '23', from: '2', to: '1' } }
};
export const slice = createSlice({
  name: 'scenes',
  initialState,
  reducers: {
    ...sceneReducers,
    ...choiceReducers
  }
});

export const sceneReducer = slice.reducer;
export const {
  add: addScene,
  update: updateScene,
  remove: removeScene,
  addChoice,
  updateChoice,
  removeChoice
} = slice.actions;
