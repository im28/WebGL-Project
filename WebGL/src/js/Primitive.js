/* eslint-disable max-classes-per-file */
/* eslint-disable no-debugger, no-console */
/* eslint-disable spaced-comment */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint import/newline-after-import: "off" */
/* eslint-disable indent */
/* eslint-disable max-len */

import { vec2, vec3 } from 'gl-matrix'
import { Vertex } from './Vertex'

export class Primitive {
  /**
   * @param {vec3[]} vertices
   * @param {number[]} indices
   */
  constructor(vertices = [], indices = []) {
    this.vertices = vertices
    this.indices = indices
  }

  /**
   * @param {vec3[]} vertices
   * @param {number[]} indices
   */
  set(vertices, indices) {
    this.vertices = vertices
    this.indices = indices
  }

  getVertices() {
    return this.vertices
  }

  getIndices() {
    return this.indices
  }

  getNrOfVertices() {
    return this.vertices.length
  }

  getNrOfIndices() {
    return this.indices.length
  }
}

export class Triangle extends Primitive {
  constructor() {
    super()
    this.vertices = [
      new Vertex(
        vec3.fromValues(0.0, 0.5, 0.0),
        vec3.fromValues(1.0, 0.0, 0.0),
        vec2.fromValues(0.5, 1.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
      new Vertex(
        vec3.fromValues(-0.5, -0.5, 0.0),
        vec3.fromValues(0.0, 1.0, 0.0),
        vec2.fromValues(0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
      new Vertex(
        vec3.fromValues(0.5, -0.5, 0.0),
        vec3.fromValues(0.0, 0.0, 1.0),
        vec2.fromValues(1.0, 0.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
    ]

    this.indices = [0, 1, 2]
  }
}

export class Quad extends Primitive {
  constructor() {
    super()
    let vertices = [
      new Vertex(
        vec3.fromValues(-0.5, 0.5, 0.0),
        vec3.fromValues(1.0, 0.0, 0.0),
        vec2.fromValues(0.0, 1.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
      new Vertex(
        vec3.fromValues(-0.5, -0.5, 0.0),
        vec3.fromValues(0.0, 1.0, 0.0),
        vec2.fromValues(0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
      new Vertex(
        vec3.fromValues(0.5, -0.5, 0.0),
        vec3.fromValues(0.0, 0.0, 1.0),
        vec2.fromValues(1.0, 0.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
      new Vertex(
        vec3.fromValues(0.5, 0.5, 0.0),
        vec3.fromValues(1.0, 1.0, 0.0),
        vec2.fromValues(1.0, 1.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
    ]

    let indices = [0, 1, 2, 0, 2, 3]

    this.set(vertices, indices)
  }
}

export class Pyramid extends Primitive {
  constructor() {
    super()
    let vertices = [
      new Vertex(
        vec3.fromValues(0.0, 0.5, 0.0),
        vec3.fromValues(1.0, 0.0, 0.0),
        vec2.fromValues(0.5, 1.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
      new Vertex(
        vec3.fromValues(-0.5, -0.5, 0.5),
        vec3.fromValues(0.0, 1.0, 0.0),
        vec2.fromValues(0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
      new Vertex(
        vec3.fromValues(0.5, -0.5, 0.5),
        vec3.fromValues(0.0, 0.0, 1.0),
        vec2.fromValues(1.0, 0.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
      //Triangle left
      new Vertex(
        vec3.fromValues(0.0, 0.5, 0.0),
        vec3.fromValues(1.0, 1.0, 0.0),
        vec2.fromValues(0.5, 1.0),
        vec3.fromValues(-1.0, 0.0, 0.0)
      ),
      new Vertex(
        vec3.fromValues(-0.5, -0.5, -0.5),
        vec3.fromValues(0.0, 0.0, 1.0),
        vec2.fromValues(0.0, 0.0),
        vec3.fromValues(-1.0, 0.0, 0.0)
      ),
      new Vertex(
        vec3.fromValues(-0.5, -0.5, 0.5),
        vec3.fromValues(0.0, 0.0, 1.0),
        vec2.fromValues(1.0, 0.0),
        vec3.fromValues(-1.0, 0.0, 0.0)
      ),
      //Triangle back
      new Vertex(
        vec3.fromValues(0.0, 0.5, 0.0),
        vec3.fromValues(1.0, 1.0, 0.0),
        vec2.fromValues(0.5, 1.0),
        vec3.fromValues(0.0, 0.0, -1.0)
      ),
      new Vertex(
        vec3.fromValues(0.5, -0.5, -0.5),
        vec3.fromValues(0.0, 0.0, 1.0),
        vec2.fromValues(0.0, 0.0),
        vec3.fromValues(0.0, 0.0, -1.0)
      ),
      new Vertex(
        vec3.fromValues(-0.5, -0.5, -0.5),
        vec3.fromValues(0.0, 0.0, 1.0),
        vec2.fromValues(1.0, 0.0),
        vec3.fromValues(0.0, 0.0, -1.0)
      ),
      //Triangle right
      new Vertex(
        vec3.fromValues(0.0, 0.5, 0.0),
        vec3.fromValues(1.0, 1.0, 0.0),
        vec2.fromValues(0.5, 1.0),
        vec3.fromValues(1.0, 0.0, 0.0)
      ),
      new Vertex(
        vec3.fromValues(0.5, -0.5, -0.5),
        vec3.fromValues(0.0, 0.0, 1.0),
        vec2.fromValues(0.0, 0.0),
        vec3.fromValues(1.0, 0.0, 0.0)
      ),
      new Vertex(
        vec3.fromValues(0.5, -0.5, 0.5),
        vec3.fromValues(0.0, 0.0, 1.0),
        vec2.fromValues(1.0, 0.0),
        vec3.fromValues(1.0, 0.0, 0.0)
      ),
    ]

    this.set(vertices, [])
  }
}

export class Cube extends Primitive {
  constructor() {
    super()
    let vertices = [
      new Vertex(
        vec3.fromValues(-0.5, 0.5, 0.5),
        vec3.fromValues(1.0, 0.0, 0.0),
        vec2.fromValues(0.0, 1.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
      new Vertex(
        vec3.fromValues(-0.5, -0.5, 0.5),
        vec3.fromValues(0.0, 1.0, 0.0),
        vec2.fromValues(0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
      new Vertex(
        vec3.fromValues(0.5, -0.5, 0.5),
        vec3.fromValues(0.0, 0.0, 1.0),
        vec2.fromValues(1.0, 0.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),
      new Vertex(
        vec3.fromValues(0.5, 0.5, 0.5),
        vec3.fromValues(1.0, 1.0, 0.0),
        vec2.fromValues(1.0, 1.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      ),

      new Vertex(
        vec3.fromValues(0.5, 0.5, -0.5),
        vec3.fromValues(1.0, 0.0, 0.0),
        vec2.fromValues(0.0, 1.0),
        vec3.fromValues(0.0, 0.0, -1.0)
      ),
      new Vertex(
        vec3.fromValues(0.5, -0.5, -0.5),
        vec3.fromValues(0.0, 1.0, 0.0),
        vec2.fromValues(0.0, 0.0),
        vec3.fromValues(0.0, 0.0, -1.0)
      ),
      new Vertex(
        vec3.fromValues(-0.5, -0.5, -0.5),
        vec3.fromValues(0.0, 0.0, 1.0),
        vec2.fromValues(1.0, 0.0),
        vec3.fromValues(0.0, 0.0, -1.0)
      ),
      new Vertex(
        vec3.fromValues(-0.5, 0.5, -0.5),
        vec3.fromValues(1.0, 1.0, 0.0),
        vec2.fromValues(1.0, 1.0),
        vec3.fromValues(0.0, 0.0, -1.0)
      ),
    ]
    let indices = [
      0, 1, 2, 0, 2, 3,

      7, 6, 1, 7, 1, 0,

      4, 5, 6, 4, 6, 7,

      3, 2, 5, 3, 5, 4,
    ]
    this.set(vertices, indices)
  }
}

export class Cylinder extends Primitive {
  /**
   * @param {number} radius
   * @param {number} height
   */
  constructor(radius = 0, height = 0) {
    super()
    let x = 0.0
    let y = 0.0
    let angle = 0.0
    let angle_stepsize = 0.1

    angle = 0.0
    const pi = Math.PI

    let vertices = []

    while (angle < 2 * pi) {
      x = radius * Math.cos(angle)
      y = radius * Math.sin(angle)
      vertices.push(
        new Vertex(
          vec3.fromValues(x, y, height),
          vec3.fromValues(1.0, 0, 1.0),
          vec2.fromValues(0.0, 1.0),
          vec3.fromValues(0.0, 0.0, 1.0)
        )
      )
      vertices.push(
        new Vertex(
          vec3.fromValues(x, y, 0),
          vec3.fromValues(1.0, 0, 1.0),
          vec2.fromValues(0.0, 1.0),
          vec3.fromValues(0.0, 0.0, 1.0)
        )
      )

      angle += angle_stepsize
    }
    vertices.push(
      new Vertex(
        vec3.fromValues(radius, 0, height),
        vec3.fromValues(1.0, 0, 1.0),
        vec2.fromValues(0.0, 1.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      )
    )
    vertices.push(
      new Vertex(
        vec3.fromValues(radius, 0, 0),
        vec3.fromValues(1.0, 0, 1.0),
        vec2.fromValues(0.0, 1.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      )
    )

    angle = 0.0
    while (angle < 2 * pi) {
      x = radius * Math.cos(angle)
      y = radius * Math.sin(angle)
      vertices.push(
        new Vertex(
          vec3.fromValues(x, y, height),
          vec3.fromValues(1.0, 0, 1.0),
          vec2.fromValues(0.0, 1.0),
          vec3.fromValues(0.0, 0.0, 1.0)
        )
      )

      angle += angle_stepsize
    }
    vertices.push(
      new Vertex(
        vec3.fromValues(radius, 0, height),
        vec3.fromValues(1.0, 0, 1.0),
        vec2.fromValues(0.0, 1.0),
        vec3.fromValues(0.0, 0.0, 1.0)
      )
    )

    this.set(vertices, [])
  }
}

export class Vase extends Primitive {
  /**
   * @param {number} v_levels
   * @param {number} h_levels
   */
  constructor(v_levels = 0, h_levels = 0) {
    super()
    this.horiz_levels = h_levels
    this.vertical_levels = v_levels

    let mincal = 50
    let maxcal = 100 // minimum and maximum diameter
    let height = 380 //define the height of the vase
    let step = height / this.vertical_levels
    const pi = Math.PI

    let vertices = []

    for (let i = -50; i < 330; i += step) {
      let r1 = mincal * Math.sin((i / 180.0) * pi) + maxcal

      let r2 = mincal * Math.sin(((i + step) / 180.0) * pi) + maxcal

      for (let j = 0; j < this.horiz_levels; j += 1) {
        //Division of each layer
        let angle1 = (360.0 / this.horiz_levels) * j
        let angle2 = (360.0 / this.horiz_levels) * (j + 1)
        /*
            Generate vertices v1, v2 on slice i, v3, v4 on slice i+step,
            four points constitute a square
         */
        let v1 = vec3.fromValues(
          r1 * Math.cos((angle1 / 180.0) * pi),
          i,
          r1 * Math.sin((angle1 / 180.0) * pi)
        )
        let v2 = vec3.fromValues(
          r1 * Math.cos((angle2 / 180.0) * pi),
          i,
          r1 * Math.sin((angle2 / 180.0) * pi)
        )
        let v3 = vec3.fromValues(
          r2 * Math.cos((angle2 / 180.0) * pi),
          i + step,
          r2 * Math.sin((angle2 / 180.0) * pi)
        )
        let v4 = vec3.fromValues(
          r2 * Math.cos((angle1 / 180.0) * pi),
          i + step,
          r2 * Math.sin((angle1 / 180.0) * pi)
        )
        //Generate corresponding texture coordinates
        let t1 = vec2.fromValues(j / this.horiz_levels, (i + 50) / height)
        let t2 = vec2.fromValues((j + 1) / this.horiz_levels, (i + 50) / height)
        let t3 = vec2.fromValues(
          (j + 1) / this.horiz_levels,
          (i + step + 50) / height
        )
        let t4 = vec2.fromValues(
          j / this.horiz_levels,
          (i + step + 50) / height
        )

        vertices.push(
          new Vertex(
            v1,
            vec3.fromValues(1.0, 0.0, 1.0),
            vec2.fromValues(0.0, 1.0),
            vec3.fromValues(0.0, 0.0, 1.0)
          )
        )
        vertices.push(
          new Vertex(
            v2,
            vec3.fromValues(1.0, 0.0, 1.0),
            vec2.fromValues(0.0, 1.0),
            vec3.fromValues(0.0, 0.0, 1.0)
          )
        )
        vertices.push(
          new Vertex(
            v3,
            vec3.fromValues(1.0, 0.0, 1.0),
            vec2.fromValues(0.0, 1.0),
            vec3.fromValues(0.0, 0.0, 1.0)
          )
        )
        vertices.push(
          new Vertex(
            v4,
            vec3.fromValues(1.0, 0.0, 1.0),
            vec2.fromValues(0.0, 1.0),
            vec3.fromValues(0.0, 0.0, 1.0)
          )
        )
      }
    }
    this.set(vertices, [])
  }
}
