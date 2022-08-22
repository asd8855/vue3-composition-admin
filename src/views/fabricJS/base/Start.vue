<template>
  <div class="box">
    <div class="canvas_x">
      <div>可交互</div>
      <canvas
        width="400"
        height="400"
        id="canvas1"
      />
    </div>
    <div class="canvas_x">
      <div>不可交互</div>
      <canvas
        width="400"
        height="400"
        id="canvas2"
      />
    </div>
    <div class="canvas_x">
      <div>初始化画布样式</div>
      <canvas id="canvas3" />
    </div>
    <div class="canvas_x">
      <div>使用背景图</div>
      <canvas id="canvas4" />
    </div>
    <div class="canvas_x">
      <div>旋转背景图</div>
      <canvas id="canvas5" />
    </div>
    <div class="canvas_x">
      <div>拉伸背景图</div>
      <canvas id="canvas6" />
    </div>
    <div class="canvas_x">
      <div>重复背景图</div>
      <canvas id="canvas7" />
    </div>
    <div class="canvas_x">
      <div>重叠影象</div>
      <canvas id="canvas8" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fabric } from 'fabric'
import { onMounted } from 'vue'
import jailCellBars from '../imgs/jail_cell_bars.png'
const imgURL =
  'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27d1b4e5f8824198b6d51a2b1c2d0d75~tplv-k3u1fbpfcp-zoom-crop-mark:400:400:400:400.awebp'

const init1 = () => {
  // 通过元素id绑定
  const canvas = new fabric.Canvas('canvas1')
  // 矩形
  const rect = new fabric.Rect({
    top: 100, // 矩形离顶部距离
    left: 100, // 矩形离左侧距离
    fill: 'red', // 填充色
    width: 30, // 矩形宽度
    height: 30 // 矩形高度
  })

  canvas.add(rect) // 将团添加到canvas里
}

const init2 = () => {
  // 通过元素id绑定
  const canvas = new fabric.StaticCanvas('canvas2')
  // 矩形
  const rect = new fabric.Rect({
    top: 100, // 矩形离顶部距离
    left: 100, // 矩形离左侧距离
    fill: 'red', // 填充色
    width: 30, // 矩形宽度
    height: 30 // 矩形高度
  })

  canvas.add(rect) // 将团添加到canvas里
}

const init3 = () => {
  // 通过元素id绑定
  const canvas = new fabric.Canvas('canvas3', {
    width: 300,
    height: 300,
    backgroundColor: '#eee'
  })
  // 矩形
  const circle = new fabric.Circle({
    radius: 30, // 半径
    top: 20,
    left: 20,
    fill: 'pink'
  })
  canvas.add(circle) // 将团添加到canvas里
}

const init4 = () => {
  const canvas = new fabric.Canvas('canvas4', { width: 400, height: 400 })
  canvas.setBackgroundImage(imgURL, canvas.renderAll.bind(canvas))
}

const init5 = () => {
  const canvas = new fabric.Canvas('canvas5', { width: 400, height: 400 })
  canvas.setBackgroundImage(
    imgURL,
    canvas.renderAll.bind(canvas),
    { angle: 15, opacity: 0.5 } // 旋转背景图
  )
  //  setBackgroundImage(image, callback, optionsopt) → {fabric.Canvas}
  //  optionsopt
  //  opacity: 0.5,
  //   angle: 45,
  //   left: 400,
  //   top: 400,
  //   originX: 'left',
  //   originY: 'top',
  //   crossOrigin: 'anonymous'
}

const init6 = () => {
  const canvas = new fabric.Canvas('canvas6', { width: 400, height: 400 })
  fabric.Image.fromURL(imgURL, img => {
    console.log('abric.Image.fromURL', img)
    // 缩放突破按，使其完全填充满画布
    img.set({
      scaleX: canvas.width / img.width,
      scaleY: canvas.height / img.height
    })
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas))
  })
}

const init7 = () => {
  const canvas = new fabric.Canvas('canvas7', { width: 400, height: 400 })
  canvas.setBackgroundColor(
    {
      source: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27d1b4e5f8824198b6d51a2b1c2d0d75~tplv-k3u1fbpfcp-zoom-crop-mark:40:40:40:40.awebp',
      repeat: 'repeat'
    },
    canvas.renderAll.bind(canvas)
  )

  //   setBackgroundColor(backgroundColor, callback) → {fabric.Canvas}
  //   backgroundColor String | fabric.Pattern
  //   canvas.setBackgroundColor('rgba(255, 73, 64, 0.6)', canvas.renderAll.bind(canvas));
  //   canvas.setBackgroundColor({
  //   source: 'http://fabricjs.com/assets/escheresque_ste.png',
  //   repeat: 'repeat',
  //   offsetX: 200,
  //   offsetY: 100
  // }, canvas.renderAll.bind(canvas));
  //   source: 'http://fabricjs.com/assets/escheresque_ste.png',
  //   repeat: 'repeat',
  //   offsetX: 200,
  //   offsetY: 100
  //   crossOrigin: "", "anonymous", "use-credentials
}

const init8 = () => {
  const canvas = new fabric.Canvas('canvas8', { width: 400, height: 400 })
  const circle = new fabric.Circle({
    radius: 30,
    fill: '#f55',
    top: 70,
    left: 70
  })
  canvas.add(circle)
  console.log('jailCellBars', jailCellBars)
  canvas.setOverlayImage(
    jailCellBars,
    canvas.renderAll.bind(canvas)
  )
}

onMounted(() => {
  init1()
  init2()
  init3()
  init4()
  init5()
  init6()
  init7()
  init8()
})
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.canvas_x {
  margin: 10px;

  canvas {
    border: 1px solid #ccc;
  }
}
</style>
