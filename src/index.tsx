import Reactions from './components/Reactions';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export { Reactions };
