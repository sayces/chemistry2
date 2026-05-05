export const services = {
  manicure: "Маникюр",
  extensions: "Наращивание",
} as const;

export type Services = typeof services; // { readonly manic: "маникюр"; readonly increase: "наращивание"; }

export type Service = keyof typeof services; // 'manic' | 'increase' ✅

export type ServiceName = Services[Service]; // "Маникюр" | "Наращивание"

// export const getEntries = <T extends Record<string, unknown>>(obj: T) =>
//   Object.entries(obj) as [keyof T, T[keyof T]][];

export const serviceList = Object.entries(services) as [keyof typeof services, string][];

// export const serviceList = (Object.keys(services) as Service[]).map((key) => ({
//   key,
//   name: services[key],
// }));
