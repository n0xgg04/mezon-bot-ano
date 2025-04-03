import { ReflectKeys } from "../constants";

export function Module(options: { imports?: any[]; providers?: any[] }) {
  return (target: any) => {
    Reflect.defineMetadata(ReflectKeys.MODULES, options.imports, target);
  };
}
