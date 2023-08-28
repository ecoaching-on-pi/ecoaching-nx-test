
/* eslint-disable @typescript-eslint/no-explicit-any */
export function LogMethodOutput(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      console.log(`${String(propertyKey)} output:`, result);
      return result;
  };
  return descriptor;
}
