<p align="center">
  <a href="https://todomvc-once-more.vercel.app/">
    <img width="240px" src="https://raw.githubusercontent.com/seognil/todomvc-once-more/master/packages/website/public/favicon.svg" />
  </a>
</p>

<h1 align="center">
  <a href="https://todomvc-once-more.vercel.app/">TodoMVC once more</a>
</h1>

> Modern Frontend Development Practices

Docs: <https://todomvc-once-more.vercel.app/>

## Get Started

### Pnpm Install

This project use pnpm workspace to manage the code. pnpm is an npm alternative.

- [Install pnpm](https://pnpm.io/installation)
- [How Do I Install PNPM](https://egoist.sh/how-do-i-install-pnpm)

```sh
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

then install all packages dependencies

```sh
pnpm install # just like `npm install` but recursively in the workspace
```

### Run Example

Each example in the `examples/` folder is an isolated project. They are simply generated by cli (e.g. `npx create-react-app my-app`, `vue create hello-world`, `pnpm create vite my-app`).

```sh
cd examples/vite-react-recoil

pnpm run dev
pnpm run build
```

or run with pnpm filter at root dir

```sh
pnpm --filter ./examples/vite-react-recoil dev -- --port 3302
```

> Every example should have a `meta.js` file for the project description propose

## Development

Build the entire website

```sh
pnpm build # build everything in order

# or separated steps

pnpm build:examples # build every app in `examples/`

pnpm build:website # build these below

pnpm build:data # analyze every example: cloc, meta, etc..
pnpm build:static # build website pages
pnpm build:ssr # build example layout function for injection
pnpm build:inject # inject every example html with data and description

# preview the built website 

pnpm preview
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
