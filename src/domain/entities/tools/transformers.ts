export const jsonBTransformer = {
  to(value: any): string {
    return JSON.stringify(value);
  },
  from(value: string): any {
    return JSON.parse(value);
  },
};
