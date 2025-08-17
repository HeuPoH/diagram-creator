import type { Node } from '@xyflow/react';

export type ContainerData = { entityId: string };
export type Container = Node<ContainerData>;
export type State = {
  containers: Container[];
};
