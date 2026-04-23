import { services } from "@/entities/store/serviceStore/types";
import styles from "./ServiceMenu.module.scss";
import Typography from "../typography/Typography";
import SwitchButton from "../switch/SwitchButton";
import { useState } from "react";

interface ServiceMenuProps {
  onClose?: () => void;
  onTimeSelect?: (date: Date, time: string) => void;
}

const ServiceMenu = ({ onClose, onTimeSelect }: ServiceMenuProps) => {
  const [selectedService, setSelectedService] = useState<
    keyof typeof services | null
  >(null);

  const serviceList = Object.entries(services);

  const handleServiceChange = (serviceKey: keyof typeof services) => {
    setSelectedService(serviceKey);
  };
  return (
    <div className={styles.serviceMenu}>
      <Typography as="h4">Услуги</Typography>
      <ul className={styles.serviceList}>
        {serviceList.map(([serviceKey, serviceName]) => (
          <li key={serviceKey} className={styles.serviceItem}>
            <SwitchButton
              isActive={selectedService === serviceKey}
              onClick={() => {}}
            >
              {serviceName}
            </SwitchButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceMenu;
