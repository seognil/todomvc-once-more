# Build Todo Apps With Different (Modern) Frameworks

## Dev

Use [pnpm](https://pnpm.io/) instead of npm

```sh
pnpm build # build everything in order

# or separated steps

pnpm build:examples # build every app in `examples/`
pnpm build:data # analyze every example: cloc, meta, etc..
pnpm build:pages # build web index page and layout
pnpm build:website # build the final web
```

### Troubleshoot

if you see some error like this:

```sh
../../node_modules/.pnpm/@types+react@18.0.5/node_modules/@types/react/index.d.ts:3311:13 - error TS2717: Subsequent property declarations must have the same type.
```

It's a TypeScript + node_modules problem ([Multiple references to the same type definitions](https://stackoverflow.com/questions/52107983/typescript-subsequent-property-declarations-must-have-the-same-type-multip)),

Try [set this](https://www.typescriptlang.org/tsconfig#skipLibCheck) in the `tsconfig.json` in the relative sub projects

```json
"skipLibCheck": true,
```

## References

- <http://todomvc.com/>
- [I built the same app 10 times - Fireship](https://www.youtube.com/watch?v=cuHDQhDhvPE)
