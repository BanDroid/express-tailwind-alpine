# express-tailwind-alpine

template project for express application using ejs as view engine and apply tailwindcss for css libraries, also using alpinejs for dom manipulation.

## setup

1. you could download this repository as zip or clone the repository.

```bash
git clone https://github.com/BanDroid/express-tailwind-alpine.git
```

2. change the `name` and `author` properties in package.json as you like.
3. run `deno install --npm`.
4. run `deno task "dev*"` to start dev mode.
5. run `deno task build:tailwind; deno task start` to use it in your production server.

this template is already configured with livereload, no need to refresh browser for each change.

> This new changes use Deno, altough, you just need to configure scripts in `package.json` and make sure you are using Node v20.11.0 and above.
