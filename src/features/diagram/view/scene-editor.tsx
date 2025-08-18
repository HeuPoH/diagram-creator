import { defer, Modal, ModalButtons } from 'shared/components/modal';

export function openSceneEditor() {
  return defer((resolve) => <SceneEditor onOk={resolve} onCancel={() => resolve(undefined)} />);
}

type Props = {
  onOk(value: unknown): void;
  onCancel(): void;
};

const SceneEditor: React.FC<Props> = ({ onOk, onCancel }) => {
  return (
    <Modal onClose={onCancel}>
      <div>Editor</div>
      <ModalButtons onOk={() => onOk({})} onCancel={onCancel} />
    </Modal>
  );
};
