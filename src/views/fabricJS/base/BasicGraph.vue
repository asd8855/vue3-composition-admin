
<!-- /**
 * 基础图形包括
 * Circle       圆形            http://fabricjs.com/docs/fabric.Circle.html
 * Ellipse      椭圆形          http://fabricjs.com/docs/fabric.Ellipse.html
 * Line         线              http://fabricjs.com/docs/fabric.Line.html
 * Polygon      多边形          http://fabricjs.com/docs/fabric.Polygon.html
 * Polyline     折线（多段线）   http://fabricjs.com/docs/fabric.Polyline.html
 * Rect         矩形            http://fabricjs.com/docs/fabric.Rect.html
 * Triangle     三角形          http://fabricjs.com/docs/fabric.Triangle.html
 */ -->
<template>
  <canvas
    width="600"
    height="600"
    id="canvas"
    style="border: 1px solid #ccc;"
  />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { fabric } from 'fabric'

const init = () => {
  const canvas = new fabric.Canvas('canvas')

  // 矩形
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'orange',
    width: 100,
    height: 100
  })
  canvas.add(rect)

  // 圆角矩形
  const roundRect = new fabric.Rect({
    left: 300,
    top: 100,
    fill: 'yellowgreen',
    width: 100,
    height: 100,
    rx: 20,
    ry: 20
  })
  canvas.add(roundRect)

  // 圆形
  const circle = new fabric.Circle({
    radius: 50,
    fill: 'green',
    left: 200,
    top: 200
    // controls: true, // 不可编辑
    // hasControls: false // 控件将不显示，并且不能用于操作对象
  })

  // 三角形
  const triangle = new fabric.Triangle({
    width: 100,
    height: 100,
    fill: 'blue',
    left: 300,
    top: 300
  })
  canvas.add(circle, triangle) // 一次添加2个图形

  // 椭圆
  const ellipse = new fabric.Ellipse({
    top: 20,
    left: 20,
    rx: 70,
    ry: 30,
    fill: '#f38181'
  })
  canvas.add(ellipse)

  // 线 { x: 500, y: 10 }, { x: 550, y: 300 }
  const line = new fabric.Line([500, 10, 550, 300], {
    stroke: '#5E2300',
    strokeWidth: 10
  })
  canvas.add(line)

  // 虚线
  const dottedLine = new fabric.Line([450, 10, 500, 300], {
    stroke: '#221ffc', // 笔触颜色
    strokeDashArray: [20, 10] // 虚线 实：20 虚：10 的长度
  })
  canvas.add(dottedLine)

  // 多边形，会自动闭合
  const polygon = new fabric.Polygon([
    { x: 100, y: 300 },
    { x: 300, y: 320 },
    { x: 10, y: 500 },
    { x: 40, y: 200 }
  ], {
    fill: '#ffd3b6'
  })
  canvas.add(polygon)

  // 折线

  const polyline = new fabric.Polyline([
    { x: 430, y: 430 },
    { x: 530, y: 430 },
    { x: 430, y: 530 },
    { x: 530, y: 530 }
  ], {
    fill: 'transparent',
    stroke: '#6639a6',
    strokeWidth: 10
  })

  canvas.add(polyline)
}

onMounted(() => {
  init()
})
</script>
