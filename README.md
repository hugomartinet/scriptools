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

### Runner

**Run script**

The `runScript` method handles exiting process while running a script. It works with both synchronous and asynchronous methods.

```typescript
runScript(() => {
    ...
})
```

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

### Timer

The `withTimer` method wraps a function and logs the execution time.

```typescript
const result = withTimer(myFunction)('arg1', 2); // will log `[myFunction] 12.34ms`
```
