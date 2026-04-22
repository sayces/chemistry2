export const services = {
  manicure: 'маникюр',
  extensions: 'наращивание',
} as const;

export type Services = typeof services; // { readonly manic: "маникюр"; readonly increase: "наращивание"; }

export type Service = keyof typeof services; // 'manic' | 'increase' ✅

export type ServiceName = Services[Service]; // "маникюр" | "наращивание"