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

## References

- <http://todomvc.com/>
- [I built the same app 10 times - Fireship](https://www.youtube.com/watch?v=cuHDQhDhvPE)
