
import { createRenderer } from 'fela'
import { render, rehydrate, renderToMarkup } from 'fela-dom'
import presetWeb from 'fela-preset-web'
import * as isBrowser from 'is-browser'

interface AnyObject {
  [key: string]: any
}

interface Options {
  method: string,
  fdef: (vm: AnyObject) => AnyObject,
  ssr: boolean,
  plugins: any[]
}

const defaultOpts = {
  method: 'f',
  fdef: (_vm: AnyObject) => ({}),
  ssr: false,
  plugins: []
}

class Renderer {
  private renderer: AnyObject
  private _mixin: AnyObject
  public get mixin(): AnyObject {
    return Object.freeze(this._mixin)
  }
  public get style(): string {
    return renderToMarkup(this.renderer)
  }
  constructor(opts: Partial<Options> = {}) {
    const { method, fdef, ssr, plugins } = { ...defaultOpts, ...opts }
    const renderer = createRenderer({ plugins: [ ...presetWeb, ...plugins ] })
    if(isBrowser) {
      if(ssr) {
        rehydrate(renderer)
      } else {
        render(renderer)
      }
    }
    this._mixin = {
      methods: {
        [method](propsOrRule: any, props: AnyObject = {}): string {
          const rule = ({
            'function': propsOrRule,
            'object': () => propsOrRule,
            'string': (() => {
              const rule = this.style && (this.style as any)[propsOrRule]
              return ({
                'function': rule,
                'object': () => rule,
              } as any)[typeof rule] || ((props: AnyObject) => props)
            })()
          } as any)[typeof propsOrRule]
          return renderer.renderRule(rule, props)
        }
      },
      computed: {
        fdef() {
          return fdef(this)
        }
      }
    }
  }
}

export {
  Renderer
}