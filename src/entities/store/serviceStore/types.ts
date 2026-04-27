export const services = {
  manicure: 'Маникюр',
  extensions: 'Наращивание',
} as const;

export type Services = typeof services; // { readonly manic: "маникюр"; readonly increase: "наращивание"; }

export type Service = keyof typeof services; // 'manic' | 'increase' ✅

export type ServiceName = Services[Service]; // "Маникюр" | "Наращивание"