# Vite & NextUI Template

This is a template for creating applications using Vite and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/vite-template)

## Technologies Used

- [Vite](https://vitejs.dev/guide/)
- [NextUI](https://nextui.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)

## How to Use

To clone the project, run the following command:

```bash
git clone https://github.com/nextui-org/vite-template.git
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

### Testing

```bash
pnpm test         # fast unit lane (Vitest, watch)
pnpm test:run     # unit lane, one-shot (CI + pre-PR gate)
pnpm test:smoke   # smoke specs vs the Cloudflare preview (needs PREVIEW_URL)
```

The unit lane is node-only and co-located (`src/**/*.test.ts(x)`). See
[`.claude/rules/tests.md`](.claude/rules/tests.md) for the testing strategy.

## License

Licensed under the [MIT license](https://github.com/nextui-org/vite-template/blob/main/LICENSE).
