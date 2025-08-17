import React from 'react';
import { useDispatch } from 'react-redux';
import { type NodeChange, applyNodeChanges, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { customNodes } from 'features/diagram/model/config';
import { updateContainers } from 'features/diagram/model/slice';
import type { Container } from 'features/diagram/model/types';
import { useDispatchSceneAndContainer } from 'features/diagram/model/hooks';
import { Menu } from 'shared/components/context-menu';

import classes from './diagram.module.css';

import addIcon from 'assetss/icons/add.svg';
import deleteIcon from 'assetss/icons/delete.svg';

export const Diagram: React.FC = () => {
  const [containers, add, remove] = useDispatchSceneAndContainer();
  const dispatch = useDispatch();

  const onContextMenu = (e: React.MouseEvent) => {
    const menu = [{
      label: 'Добавить сцену',
      command: () => add(e),
      icon: addIcon
    }];
    Menu.show(e, menu);
  };

  const onNodeContextMenu = (e: React.MouseEvent, node: Container) => {
    e.stopPropagation();
    const menu = [{
      label: 'Удалить сцену',
      command: () => remove(node.data.entityId),
      icon: deleteIcon
    }];
    Menu.show(e, menu);
  };

  const onNodesChanged = React.useCallback((changes: NodeChange<Container>[]) => {
    const nextContainers = applyNodeChanges(changes, containers);
    dispatch(updateContainers(nextContainers));
  }, [containers, dispatch]);

  return (
    <div className={classes.diagram}>
      <ReactFlow
        nodeTypes={customNodes}
        onNodesChange={onNodesChanged}
        nodes={containers}
        onContextMenu={onContextMenu}
        onNodeContextMenu={onNodeContextMenu}
      />
    </div>
  );
};
