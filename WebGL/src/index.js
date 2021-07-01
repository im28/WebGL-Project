// Test import of a JavaScript module
// import { example } from '@/js/example'

// Test import of an asset
// import webpackLogo from '@/images/webpack-logo.svg'

// Test import of styles
import '@/styles/index.scss'
import { WindowManager } from './js/WindowManger'
import { ui_panel } from './js/UI'

// Appending to the DOM
// const logo = document.createElement('img')
// logo.src = webpackLogo

// const heading = document.createElement('h1')
// heading.textContent = example()

// const app = document.querySelector('#root')

// app.append(logo, heading)
function main() {
  const canvas = document.querySelector('#canvas')
  const gl = canvas.getContext('webgl2')

  const testing = new WindowManager('title', 500, 500, false, gl)
  testing.update(0)

  // testing.initOpenGLOptions()
}
1
main()
