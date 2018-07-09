

# recomended plugins : ( vs code )
- mjml by `Attila Buti`
- mjml-syntax `digitalstreamio`

# anatomy

1. we will create .pug files -> compile ext will be .mjml
2. then the mjml will be converted in html

in this way can use pugs ! wala


# cmnd list 
cmnd | what is does ?
---|---
`clr:dist`| clears everyting in `dist` dir
`clr:bin`| clears everyting in `.bin` dir
`clr:all`| runs all with `clr:**`
`clear`| runs `clr:all`
---|---
`sft:img`| copresses img files ( rem : update file links with urls)
---|---
`pug:full` | compiles pug files to `html -> mjml -> html`
`pug:w` | runs `pug:full` in compress mode.
`pug:w` | runs `pug:min` in watch mode 
---|---
`show` | runs `browserSync` in dist dir
`show:w` | runs `show` in watch mode
---|---
`dev:all`| runs `pug:w` + `show:w`
`dev:font`| runs `pug:w`
---|---
`build`| runs `clear` + `sft:img` + `pug:min`