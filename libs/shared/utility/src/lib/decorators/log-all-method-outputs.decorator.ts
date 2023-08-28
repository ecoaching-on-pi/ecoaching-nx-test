/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@angular/core';

export function LogAllMethodOutputs(target: Type<any>): void {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
        const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
        if (descriptor === undefined || descriptor.value instanceof Function === false) {
            continue;
        }
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const result = originalMethod.apply(this, args);
            console.log(`${String(propertyName)} output:`, result);
            return result;
        };
        Object.defineProperty(target.prototype, propertyName, descriptor);
    }
}
