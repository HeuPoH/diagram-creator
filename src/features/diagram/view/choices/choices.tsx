import React from 'react';

import type { IChoice, IScene } from 'app/model/types';
import { Button } from 'shared/components/button';
import { ChoiceEditor } from 'features/diagram/view/choice/choice-editor';
import { ChoiceViewer } from 'features/diagram/view/choice/choice-viewer';

import deleteIcon from 'assetss/icons/delete.svg';
import editIcon from 'assetss/icons/edit.svg';

import classes from './choices.module.css';

type Props = {
  scenes: IScene[];
  choices: IChoice[];
  onChoicesChanged(choices: IChoice[]): void;
};
export const Choices: React.FC<Props> = ({ choices, onChoicesChanged }) => {
  const [choicesData, setChoicesData] = React.useState(() => ([...choices]));
  const [editedChoiceId, setEditedChoiceId] = React.useState('');

  const deleteChoice = (id: string) => {
    setChoicesData((prev) => {
      const result = prev.filter(ch => ch.id !== id);
      onChoicesChanged(result);
      return result;
    });
  };

  const renderChoices = () => {
    const cb = (choice: IChoice) => {
      return (
        <li key={choice.id} className={classes.choiceWrapper}>
          <div className={classes.choiceWrapperBody}>
            <ChoiceContainer
              onChange={() => {}}
              choice={choice}
              isEdit={choice.id === editedChoiceId}
            />
          </div>
          <footer className={classes.choiceWrapperFooter}>
            <EditButton
              onClick={() => {
                const nextChoiceId = choice.id !== editedChoiceId ? choice.id : '';
                setEditedChoiceId(nextChoiceId);
              }}
            />
            <DeleteButton onClick={() => deleteChoice(choice.id)} />
          </footer>
        </li>
      );
    };

    return choicesData.map(cb);
  };

  return (
    <section className={classes.choices}>
      <div>Переходы</div>
      <ul>
        {renderChoices()}
      </ul>
    </section>
  );
};

type ChoiceContainerProps = {
  choice: IChoice;
  isEdit: boolean;
  onChange(): void;
};
const ChoiceContainer: React.FC<ChoiceContainerProps> = ({ choice, isEdit }) => {
  return isEdit
    ? (
      <ChoiceEditor
        choice={choice}
        scenes={[]}
        onChange={() => {}}
      />
    )
    : <ChoiceViewer choice={choice} />;
};

const DeleteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button
      className={classes.choiceButton}
      onClick={onClick}
    >
      <img
        className={classes.choiceButtonImg}
        src={deleteIcon}
        alt='Удалить'
      />
    </Button>
   );
};

const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button
      className={classes.choiceButton}
      onClick={onClick}
    >
      <img
        className={classes.choiceButtonImg}
        src={editIcon}
        alt='Редактировать'
      />
    </Button>
   );
};
