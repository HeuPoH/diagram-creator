import React from 'react';

import type { IChoice, IScene } from 'app/model/types';
import { FormGroup } from 'shared/components/form';
import { Input } from 'shared/components/input';
import { Textarea } from 'shared/components/textarea';
import { Select } from 'shared/components/select';

type Props = {
  choice: IChoice;
  scenes: IScene[];
  onChange(data: Partial<IChoice>): void;
};
export const ChoiceEditor: React.FC<Props> = ({ choice, scenes, onChange }) => {
  const [state, setState] = React.useState(choice);
  const sceneTransitionOptions = React.useMemo(() => scenes.map(s => ({ label: s.title, value: s.id })), []);
  const currSceneTransition = React.useMemo(() => sceneTransitionOptions.find(s => s.value === state.id), [state.id]);

  const onChangeHandler = (data: Partial<IChoice>) => {
    setState(prev => {
      const nextState = { ...prev, ...data };
      onChange(nextState);
      return nextState;
    });
  };

  return (
    <section>
      <FormGroup direction='column'>
        <label htmlFor={`choice-${state.id}-title`}>Название</label>
        <Input
          id={`choice-${state.id}-title`}
          value={state.title}
          onChange={(v) => onChangeHandler({ title: v })}
        />
      </FormGroup>
      <FormGroup direction='column'>
        <label htmlFor={`choice-${state.id}-desc`}>Описание</label>
        <Textarea
          id={`choice-${state.id}-desc`}
          value={state.title}
          onChange={(v) => onChangeHandler({ title: v })}
        />
      </FormGroup>
      <FormGroup direction='column'>
        <label htmlFor={`choice-${state.id}-to`}>Переход</label>
        <Select
          value={currSceneTransition}
          options={sceneTransitionOptions}
          onChange={(v) => onChangeHandler({ to: v })}
        />
      </FormGroup>
    </section>
  );
};
