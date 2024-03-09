import {defineConfig} from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
export default defineConfig({
  // ...UnoCSS options
  transformers: [transformerDirectives()],
  theme: {
    breakpoints: {
      md: '960px',
      lg: '1024px',
      xl: '1200px',
      xxl: '1440px',
    },
  },
})
