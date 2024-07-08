import { dist, mag } from "./utils"

const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
canvas.height = innerHeight
canvas.width = innerWidth

class Point {
  constructor() {
    this.position = { x: 0, y: 0 }
    this.color = null
  }
  draw() {
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, 20, 20);


  }
  update() {
    this.draw()
  }
}

class Points {
  constructor() {
    this.points = new Array()
  }
  addPoints() {
    for (let i = 0; i <= 11; i++) {
      let point = new Point()
      point.position = { x: Math.random() * canvas.width, y: Math.random() * canvas.height }
      point.color = `rgb(${Math.random() * 225},${Math.random() * 225},${Math.random() * 225})`
      this.points.push(point)
    }
  }
  renderPoints() {
    this.points.map(point => point.draw())
  }
  updatePoints() {
    this.points.map(point => point.update())

  }
}

class Player {
  constructor() {
    this.position = { x: 0, y: 0 }
    this.velocity = { x: 0, y: 0 }
    this.speed = 5
    this.size = 50
    this.score = 0
  }

  followCursor() {

    document.onmousemove = e => {
      // this.position.x = e.clientX
      // this.position.y = e.clientY
      let vel = { x: e.clientX - this.position.x - (this.size) / 2, y: e.clientY - this.position.y - (this.size) / 2 }
      this.velocity.x = vel.x * this.speed / mag(vel)
      this.velocity.y = vel.y * this.speed / mag(vel)

      if (this.position.x + (this.size) / 2 + this.velocity.x == e.clientX && this.position.y + this.velocity.y + (this.size) / 2 == e.clientY) {
        this.velocity = { x: 0, y: 0 }
      }
    }
  }

  eatPoints(Points) {
    for (let i = 0; i < Points.points.length; i++) {
      if (dist(Points.points[i].position, this.position) <= this.size /(1.414)) {
        Points.points.splice(i, 1)
        Points.renderPoints()
        this.score += 1
        this.size += 2
        this.speed *= 0.99
        document.getElementById("score").innerHTML = `SCORE IS : ${this.score}`
        console.log(this.score)
      }
    }
  }
  draw() {
    c.fillStyle = "red"
    c.fillRect(this.position.x, this.position.y, this.size, this.size)

    this.followCursor()
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

const PointsGroup = new Points()
PointsGroup.addPoints()
PointsGroup.renderPoints()


const player = new Player()
player.draw()

const animate = () => {
  c.fillStyle = "#eeeeee"
  c.fillRect(0, 0, canvas.width, canvas.height)


  PointsGroup.updatePoints()
  player.update()
  player.eatPoints(PointsGroup)
  if (PointsGroup.points.length <= 10) {
    PointsGroup.addPoints()
  }


  requestAnimationFrame(animate)

}

animate()