import React from 'react';

import type { ISceneInfo } from 'app/model/types';

import { defer, Modal, ModalButtons } from 'shared/components/modal';
import { Input } from 'shared/components/input';
import { Textarea } from 'shared/components/textarea';
import { FormGroup } from 'shared/components/form';

import classes from './scene-editor.module.css';

type Args = {
  scene: ISceneInfo
};
export function openSceneEditor(args: Args) {
  return defer<ISceneInfo | undefined>((resolve) => (
    <SceneEditor
      {...args}
      onOk={resolve}
      onCancel={() => resolve(undefined)}
    />
  ));
}

type Props = {
  scene: ISceneInfo;
  onOk(value: ISceneInfo): void;
  onCancel(): void;
};

const SceneEditor: React.FC<Props> = ({ onOk, onCancel, scene }) => {
  const [state, setState] = React.useState(() => ({ ...scene }));
  const onChange = (partial: Partial<ISceneInfo>) => {
    setState(prev => ({ ...prev, ...partial }));
  };

  return (
    <Modal onClose={onCancel}>
      <div className={classes.sceneEditor}>
        <FormGroup direction='row'>
          <label htmlFor='scene-title'>Название сцены:</label>
          <Input
            id='scene-title'
            value={state.title}
            onChange={(v) => onChange({ title: v })}
          />
        </FormGroup>
        <FormGroup direction='row'>
          <label htmlFor='scene-description'>Описание сцены:</label>
          <Textarea
            id='scene-description'
            value={state.description}
            onChange={(v) => onChange({ description: v })}
            style={{ resize: 'vertical' }}
          />
        </FormGroup>
      </div>
      <ModalButtons onOk={() => onOk(state)} onCancel={onCancel} />
    </Modal>
  );
};
