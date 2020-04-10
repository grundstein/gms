## @grundstein/gms

### WIP. NOT IN PRODUCTION YET!

gms: grundstein magic server

serves a local directory (process.cwd() + 'public' is the default)

only serves favicon.ico, js, css, html and txt files in that directory,
all other files will be served by the [gss](https://grundstein.it/gss): grundstein static server
instead

#### installation
```bash
npm i -g @grundstein/gms
```

#### usage
```bash
// show full help
gms --help

// serve the ./public directory
gms

// serve specific directories
gms --dir /global/directory/path

// serve on specific port with specific host
gms --port 2323 --host example.com
```
