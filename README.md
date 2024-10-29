# 📦 scriptools

A series of tools to use in JS/TS scripts. Feel free to suggest new features, improvements or report issues!

## Installation

With NPM

```zsh
npm install scriptools
```

With Bun

```zsh
bun add scriptools
```

With Yarn

```zsh
yarn add scriptools
```

With PNPM

```zsh
pnpm add scriptools
```

## Usage

### Logger

The `Logger` singleton class handles logging with different levels and printing a log recap.

**Add logs to journal**

```typescript
Logger.log(level, log, logDetails); // will push log to journal
Logger.log(level, log, logDetails, { print: true }); // will push log to journal as well as print it immediately
```

- `level` can be `"info"`, `"success"`, `"warn"` or `"error"`
- `logDetails` is optional

**Print logs**

```typescript
Logger.printAll(); // will print all logs in the order they were pushed
Logger.printAll({ grouped: true }); // will print all logs grouped by level
```

**Clear journal**

```typescript
Logger.clear(); // will empty log journal
```

**Set options on Logger**

```typescript
Logger.setOptions({ printOnLog: true }); // will print logs immediately
Logger.setOptions({ grouped: false }); // will print all logs grouped by level
```
