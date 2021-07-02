import '@/styles/index.scss'
import { WindowManager } from './js/WindowManger'

function main() {
  const canvas = document.querySelector('#canvas')
  const gl = canvas.getContext('webgl2')

  const testing = new WindowManager('title', 1000, 900, false, gl)
  testing.update(0)

  // testing.initOpenGLOptions()
}
main()
