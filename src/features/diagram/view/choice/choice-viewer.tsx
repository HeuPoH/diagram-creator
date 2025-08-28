import React from 'react';

import type { IChoice } from 'app/model/types';

import classes from './choice-viewer.module.css';

type Props = { choice: IChoice };
export const ChoiceViewer: React.FC<Props> = ({ choice }) => {
  return (
    <section className={classes.choiceViewer}>
      <div className={classes.choiceTitle}>{choice.title}</div>
      <div className={classes.choiceDescription}>{choice.description}</div>
      <div className={classes.choiceDestination}>{choice.to}</div>
    </section>
  );
};
