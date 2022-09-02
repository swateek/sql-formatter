import dedent from 'dedent-js';

import { format as originalFormat, FormatFn } from 'src/sqlFormatter';
import RedshiftFormatter from 'src/languages/redshift/redshift.formatter';
import behavesLikeSqlFormatter from './behavesLikeSqlFormatter';

import supportsAlterTable from './features/alterTable';
import supportsCreateTable from './features/createTable';
import supportsDropTable from './features/dropTable';
import supportsJoin from './features/join';
import supportsOperators from './features/operators';
import supportsStrings from './features/strings';
import supportsDeleteFrom from './features/deleteFrom';
import supportsComments from './features/comments';
import supportsIdentifiers from './features/identifiers';
import supportsParams from './options/param';
import supportsSetOperations from './features/setOperations';
import supportsLimiting from './features/limiting';
import supportsInsertInto from './features/insertInto';
import supportsUpdate from './features/update';
import supportsTruncateTable from './features/truncateTable';
import supportsCreateView from './features/createView';

describe('RedshiftFormatter', () => {
  const language = 'redshift';
  const format: FormatFn = (query, cfg = {}) => originalFormat(query, { ...cfg, language });

  behavesLikeSqlFormatter(format);
  supportsComments(format);
  supportsCreateView(format, { orReplace: true, materialized: true });
  supportsCreateTable(format, { ifNotExists: true });
  supportsDropTable(format, { ifExists: true });
  supportsAlterTable(format, {
    addColumn: true,
    dropColumn: true,
    renameTo: true,
    renameColumn: true,
  });
  supportsDeleteFrom(format, { withoutFrom: true });
  supportsInsertInto(format);
  supportsUpdate(format);
  supportsTruncateTable(format, { withoutTable: true });
  supportsStrings(format, ["''"]);
  supportsIdentifiers(format, [`""`]);
  supportsOperators(format, RedshiftFormatter.operators);
  supportsJoin(format);
  supportsSetOperations(format, ['UNION', 'UNION ALL', 'EXCEPT', 'INTERSECT', 'MINUS']);
  supportsParams(format, { numbered: ['$'] });
  supportsLimiting(format, { limit: true, offset: true });

  it('formats LIMIT', () => {
    expect(format('SELECT col1 FROM tbl ORDER BY col2 DESC LIMIT 10;')).toBe(dedent`
      SELECT
        col1
      FROM
        tbl
      ORDER BY
        col2 DESC
      LIMIT
        10;
    `);
  });

  it('formats only -- as a line comment', () => {
    const result = format(`
      SELECT col FROM
      -- This is a comment
      MyTable;
    `);
    expect(result).toBe(dedent`
      SELECT
        col
      FROM
        -- This is a comment
        MyTable;
    `);
  });

  // Regression test for sql-formatter#358
  it('formats temp table name starting with #', () => {
    expect(format(`CREATE TABLE #tablename AS tbl;`)).toBe(
      dedent`
        CREATE TABLE
          #tablename AS tbl;
      `
    );
  });

  it('formats DISTKEY and SORTKEY after CREATE TABLE', () => {
    expect(
      format(
        'CREATE TABLE items (a INT PRIMARY KEY, b TEXT, c INT NOT NULL, d INT NOT NULL, e INT NOT NULL) DISTKEY(created_at) SORTKEY(created_at);'
      )
    ).toBe(dedent`
      CREATE TABLE
        items (
          a INT PRIMARY KEY,
          b TEXT,
          c INT NOT NULL,
          d INT NOT NULL,
          e INT NOT NULL
        ) DISTKEY (created_at) SORTKEY (created_at);
    `);
  });

  // This is far from ideal, but at least the formatter doesn't crash :P
  it('formats COPY', () => {
    expect(
      format(`
        COPY schema.table
        FROM 's3://bucket/file.csv'
        IAM_ROLE 'arn:aws:iam::123456789:role/rolename'
        FORMAT AS CSV DELIMITER ',' QUOTE '"'
        REGION AS 'us-east-1'
      `)
    ).toBe(dedent`
      COPY
        schema.table
      FROM
        's3://bucket/file.csv' IAM_ROLE 'arn:aws:iam::123456789:role/rolename' FORMAT AS CSV DELIMITER ',' QUOTE '"' REGION AS 'us-east-1'
    `);
  });

  it('formats ALTER TABLE ... ALTER COLUMN', () => {
    expect(
      format(
        `ALTER TABLE t ALTER COLUMN foo TYPE VARCHAR;
         ALTER TABLE t ALTER COLUMN foo ENCODE my_encoding;`
      )
    ).toBe(dedent`
      ALTER TABLE
        t
      ALTER COLUMN
        foo
      TYPE
        VARCHAR;

      ALTER TABLE
        t
      ALTER COLUMN
        foo
      ENCODE
        my_encoding;
    `);
  });
});
