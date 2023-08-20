# paramTypes

Specifies parameter types to support when parsing SQL prepared statements.

## Motivation

While some SQL dialects have built-in support for prepared statements,
others do not and instead rely on 3rd party libraries to emulate it,
while yet others might have built-in support for prepared statements,
but the syntax depends on the driver used to connect to the database.

By default SQL Formatter supports only the built-in prepared statement
syntax of an SQL dialect as documented in [params option documentation][params].
For example if you're using PostgreSQL you can use the `$nr` syntax:

```ts
format('SELECT * FROM users WHERE name = $1 AND age < $2', { language: 'postgresql' });
```

However if you're connecting to the database using a Java DB connection library,
you might expect to use `:name` placeholders for parameters:

```ts
format('SELECT * FROM users WHERE name = :name AND age < :age', { language: 'postgresql' });
```

This gets by default formatted like so:

```sql
SELECT
  *
FROM
  users
WHERE
  name = : name
  AND age < : age
```

To fix it, you'd need to specify with `paramTypes` config
that you're using `:`-prefixed named placeholders:

```ts
format('SELECT * FROM users WHERE name = :name AND age < :name', {
  language: 'postgresql',
  paramTypes: { named: [':'] },
});
```

After which you'll get the correct result:

```sql
SELECT
  *
FROM
  users
WHERE
  name = :name
  AND age < :age
```

## Option value

An object with the following following optional fields:

- **`positional`**: `boolean`. True to enable `?` placeholders, false to disable them.
- **`numbered`**: `Array<"?" | ":" | "$">`. To allow for `?1`, `:2` and/or `$3` syntax for numbered placholders.
- **`named`**: `Array<":" | "@" | "$">`. To allow for `:name`, `@name` and/or `$name` syntax for named placholders.
- **`quoted`**: `Array<":" | "@" | "$">`. To allow for `:"name"`, `@"name"` and/or `$"name"` syntax for quoted placholders.
  Note that the type of quotes dependes on the quoted identifiers supported by a dialect.
  For example in MySQL using `paramTypes: {quoted: [':']}` would allow you to use `` :`name` `` syntax,
  while in Transact-SQL `:"name"` and `:[name]` would work instead.
  See [identifier syntax wiki page][] for information about differences in support quoted identifiers.
- **`custom`**: `Array<{ regex: string, key?: (text: string) => string }>`.
  An option to implement custom syntax for parameter placeholders. See below for details.

Note that using this config will override the by default supported placeholders types.
For example PL/SQL supports numbered (`:1`) and named (`:name`) placeholders by default.
When you provide the following `paramTypes` configuration:

```js
paramTypes: { positional: true, numbered: [], named: [':', '@'] }
```

The result will be:

- `?` positional placeholders are supported
- `:1` numbered placeholders are no more supported
- `:name` is still supported and `@name` named placeholder is also supported.

## Parameter value substitution

This config option can be used together with [params][] to substitute the placeholders with actual values.

## Custom parameter syntax

Say, you'd like to support the `{name}` parameter placeholders in this SQL:

```sql
SELECT id, fname, age FROM person WHERE lname = {lname} AND age > {age};
```

You can define a regex pattern to match the custom parameters:

```js
paramTypes: {
  custom: [{ regex: '\\{[a-zA-Z0-9_]+\\}' }];
}
```

Note the double backslashes. You can get around the double-escaping problem by using `String.raw`:

```js
paramTypes: {
  custom: [{ regex: String.raw`\{[a-zA-Z0-9_]+\}` }];
}
```

You can also use the [params][] option to substitute values of these parameters.
However by default the parameter names contain the whole string that is matched by the regex:

```js
params: { '{lname}': 'Doe', '{age}': '25' },
```

To get around this, you can also specify the `key` function to extract the name of the parameter:

```js
paramTypes: {
  custom: [{
    regex: String.raw`\{[a-zA-Z0-9_]+\}`
    key: (text) => text.slice(1, -1), // discard first and last char
  }]
}
```

Now you can refer to the parameters by their actual name:

```js
params: { 'lname': 'Doe', 'age': '25' },
```

[params]: ./params.md
[identifier syntax wiki page]: https://github.com/sql-formatter-org/sql-formatter/wiki/identifiers
