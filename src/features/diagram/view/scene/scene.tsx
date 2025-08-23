import { Node, type NodeProps } from '@xyflow/react';
import { useAppStore } from 'app/store/hooks';
import type { ContainerData } from 'features/diagram/model/types';

import classes from 'features/diagram/view/diagram.module.css';

export const Scene: React.FC<NodeProps<Node<ContainerData, 'entityId'>>> = (props) => {
  const { getState } = useAppStore();
  const { scenes } = getState().scenes;
  const scene = scenes[props.data.entityId];

  if (!scene) {
    return null;
  }

  return (
    <article className={classes.scene}>
      <h2>{scene.title}</h2>
      <div>{scene.description}</div>
    </article>
  );
};
