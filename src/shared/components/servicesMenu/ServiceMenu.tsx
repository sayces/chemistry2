import styles from './ServiceMenu.module.scss'

interface ServiceMenuProps {
  time: string;
  anchorX: number;
  anchorY: number;
  onClose: () => void;
  onTimeSelect?: (date: Date, time: string) => void;
  isMobile?: boolean;
  
}

const ServiceMenu = () => {

}

export default ServiceMenu;