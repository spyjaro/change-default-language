declare module 'node-gkm' {
  export function keyboardLayout(): number;
  export function setKeyboardLayout(layout: number): void;
  export const events: {
    on(event: string, callback: (data: any) => void): void;
  };
}
