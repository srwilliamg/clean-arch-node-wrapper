export const generateSequence = (schema, tableName) =>
  `nextval('${schema}.seq_${tableName}_id')`;
