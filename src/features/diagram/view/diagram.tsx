import React from 'react';
import { type NodeChange, applyNodeChanges, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { updateScene } from 'app/model/slice';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { openSceneEditor } from 'features/diagram/view/scene-editor';
import { customNodes } from 'features/diagram/model/config';
import { updateContainers } from 'features/diagram/model/slice';
import type { Container } from 'features/diagram/model/types';
import { useDispatchSceneAndContainer } from 'features/diagram/model/hooks';
import { Menu } from 'shared/components/context-menu';

import classes from './diagram.module.css';

import addIcon from 'assetss/icons/add.svg';
import deleteIcon from 'assetss/icons/delete.svg';
import editIcon from 'assetss/icons/edit.svg';

export const Diagram: React.FC = () => {
  const [containers, add, remove] = useDispatchSceneAndContainer();
  const scenes = useAppSelector(state => state.scenes.scenes);
  const dispatch = useAppDispatch();

  const onContextMenu = (e: React.MouseEvent) => {
    const menu = [{
      label: 'Добавить сцену',
      command: () => add(e),
      icon: addIcon
    }];
    Menu.show(e, menu);
  };

  const openSceneEditorHandler = async (sceneId: string) => {
    const scene = scenes[sceneId];
    if (scene) {
      const res = await openSceneEditor({ scene });
      if (res) {
        dispatch(updateScene({ id: sceneId, data: res }));
      }
    }
  };

  const onNodeContextMenu = (e: React.MouseEvent, node: Container) => {
    e.stopPropagation();
    const sceneId = node.data.entityId;
    const menu = [
      {
        label: 'Редактировать сцену',
        command: () => openSceneEditorHandler(sceneId),
        icon: editIcon
      },
      {
        label: 'Удалить сцену',
        command: () => remove(sceneId),
        icon: deleteIcon
      }
    ];
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
        onNodeDoubleClick={(_, node) => openSceneEditorHandler(node.data.entityId)}
      />
    </div>
  );
};
