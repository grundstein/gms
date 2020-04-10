## @grundstein/gms

### WIP. NOT IN PRODUCTION, TESTED AND/OR BENCHMARKED YET!

## gms: grundstein magic server

### features:

#### static page serving

serves a local directory (process.cwd() + 'public' is the default)

#### index.html directory alias

requests to `/dir/` get answered by sending `/dir/index.html` back, if it exists.

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

// serve specific directory
gms --dir /global/directory/path

// serve on specific host and port
gms --host grundstein.it --port 2323
```
