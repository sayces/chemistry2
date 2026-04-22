import { services } from '@/shared/store/serviceStore/types';
import styles from './ServiceMenu.module.scss'
import Typography from '../typography/Typography';

interface ServiceMenuProps {
  time: string;
  anchorX: number;
  anchorY: number;
  onClose: () => void;
  onTimeSelect?: (date: Date, time: string) => void;
}

const ServiceMenu = () => {

  const serviceList = Object.entries(services);

  return (<>
 
    <Typography as='h1' size='10'>Услуги</Typography>
    <ul>
      {serviceList.map(([serviceKey, serviceName]) => (
          <li key={serviceKey} className={styles.serviceItem}>
            {serviceName}
            
          </li>
        ))}
    </ul>
    </>
  )
}

export default ServiceMenu;