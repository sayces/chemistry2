import { Service, serviceList } from "@/entities/store/serviceStore/types";
import styles from "./ServiceMenu.module.scss";
import Typography from "@/shared/components/UI/typography/Typography";
import SwitchButton from "@/shared/components/UI/switch/SwitchButton";
import { useState } from "react";
import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";

interface ServiceMenuProps {}

const ServiceMenu = ({}: ServiceMenuProps) => {
  const { selectedServices, setServices } = useCalendarStore();

  console.log(selectedServices);

  const handleServiceChange = (serviceKey: Service) => {
    const currentSelected = selectedServices || [];
    const nextServices = currentSelected.includes(serviceKey)
      ? currentSelected.filter((id) => id !== serviceKey)
      : [...currentSelected, serviceKey];
    setServices(nextServices);
  };

  return (
    <div className={styles.serviceMenu}>
      <Typography as="h4">Услуги</Typography>
      <ul className={styles.serviceList}>
        {serviceList.map(([serviceKey, serviceName]) => (
          <li key={serviceKey} className={styles.serviceItem}>
            <SwitchButton
              isActive={selectedServices?.includes(serviceKey) || false}
              onClick={() => handleServiceChange(serviceKey)}
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
