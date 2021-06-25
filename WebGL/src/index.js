// Test import of a JavaScript module
import { example } from '@/js/example'

// Test import of an asset
import webpackLogo from '@/images/webpack-logo.svg'

// Test import of styles
import '@/styles/index.scss'
import { Shader } from './js/Shader'

// Appending to the DOM
const logo = document.createElement('img')
logo.src = webpackLogo

const heading = document.createElement('h1')
heading.textContent = example()

const app = document.querySelector('#root')

app.append(logo, heading)
function main() {
  const canvas = document.querySelector('#canvas')
  const gl = canvas.getContext('webgl')
  //   if (!gl) {
  //     return
  //   }
  //   const size = 2
  //   console.log(size)
  const testing = new Shader(1, 1, gl)
  testing.set1f('asd', 1.0)
}
main()
