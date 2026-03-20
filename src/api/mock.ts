/** Cuando VITE_USE_MOCK=false se usan llamadas reales al backend */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export function mockDelay(ms = 350): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
