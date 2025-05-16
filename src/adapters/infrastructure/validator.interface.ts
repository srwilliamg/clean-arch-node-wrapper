export type IValidator = {
  validate(schema, payload): any | null;
};
