import { services } from "@/entities/store/serviceStore/types";
import styles from "./ServiceMenu.module.scss";
import Typography from "../typography/Typography";
import SwitchButton from "../switch/SwitchButton";
import { useState } from "react";
import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";

interface ServiceMenuProps {
  onClose?: () => void;
  onTimeSelect?: (date: Date, time: string) => void;
}

const ServiceMenu = ({ onClose, onTimeSelect }: ServiceMenuProps) => {
  const {selectedServices, setServices} = useCalendarStore();

  const serviceList = Object.entries(services);

  const handleServiceChange = (serviceKey: keyof typeof services) => {
    setServices(serviceKey);
  };
  
  return (
    <div className={styles.serviceMenu}>
      <Typography as="h4">Услуги</Typography>
      <ul className={styles.serviceList}>
        {serviceList.map(([serviceKey, serviceName]) => (
          <li key={serviceKey} className={styles.serviceItem}>
            <SwitchButton
              isActive={selectedServices === serviceKey}
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
