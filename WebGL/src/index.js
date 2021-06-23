// Test import of a JavaScript module
import { example } from '@/js/example'

// Test import of an asset
import webpackLogo from '@/images/webpack-logo.svg'

// Test import of styles
import '@/styles/index.scss'

// Appending to the DOM
const logo = document.createElement('img')
logo.src = webpackLogo

const heading = document.createElement('h1')
heading.textContent = example()

const app = document.querySelector('#root')

app.append(logo, heading)
function main() {
  //   var canvas = document.querySelector('#c')
  //   var gl = canvas.getContext('webgl')
  //   if (!gl) {
  //     return
  //   }
  //   const size = 2
  //   console.log(size)
}
main()
