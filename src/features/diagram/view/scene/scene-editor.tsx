import React from 'react';

import type { IChoice, ISceneInfo } from 'app/model/types';
import { Choices } from 'features/diagram/view/choices/choices';

import { defer, Modal, ModalButtons } from 'shared/components/modal';
import { Input } from 'shared/components/input';
import { Textarea } from 'shared/components/textarea';
import { FormGroup } from 'shared/components/form';

import classes from './scene-editor.module.css';

type Result = { scene: ISceneInfo; choices: IChoice[] };

type Args = {
  scene: ISceneInfo;
  choices: IChoice[];
};
export function openSceneEditor(args: Args) {
  return defer<Result | undefined>((resolve) => (
    <SceneEditor
      {...args}
      onOk={resolve}
      onCancel={() => resolve(undefined)}
    />
  ));
}

type Props = Args & {
  onOk(res: Result): void;
  onCancel(): void;
};

const SceneEditor: React.FC<Props> = ({ onOk, onCancel, scene, choices }) => {
  const [sceneData, setSceneData] = React.useState(() => ({ ...scene }));
  const updatedChoices = React.useRef(choices);

  const onSceneChanged = (partial: Partial<ISceneInfo>) => {
    setSceneData(prev => ({ ...prev, ...partial }));
  };

  const onChoicesChanged = (choices: IChoice[]) => {
    updatedChoices.current = choices;
  };
  
  const getDataToSave = () => ({ scene: sceneData, choices: updatedChoices.current });

  return (
    <Modal onClose={onCancel}>
      <div className={classes.sceneEditor}>
        <FormGroup direction='row'>
          <label htmlFor='scene-title'>Название сцены:</label>
          <Input
            id='scene-title'
            value={sceneData.title}
            onChange={(v) => onSceneChanged({ title: v })}
          />
        </FormGroup>
        <FormGroup direction='row'>
          <label htmlFor='scene-description'>Описание сцены:</label>
          <Textarea
            id='scene-description'
            value={sceneData.description}
            onChange={(v) => onSceneChanged({ description: v })}
            style={{ resize: 'vertical' }}
          />
        </FormGroup>
        <Choices
          choices={choices}
          onChoicesChanged={onChoicesChanged}
          scenes={[]}
        />
      </div>
      <ModalButtons onOk={() => onOk(getDataToSave())} onCancel={onCancel} />
    </Modal>
  );
};
