import { ReactNode } from 'react';
import './ModalUI.css';

interface ModalUIProps {
  active: boolean;
  setActive: (active: boolean) => void;
  children: ReactNode;
}

const ModalUI: React.FC<ModalUIProps> = ({ active, setActive, children }) => {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalUI;
