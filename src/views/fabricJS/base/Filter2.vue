<template>
  <div class="box flex">
    <div style="width: 600px;margin-right: 16px;">
      <el-checkbox
        v-model="grayscale"
        label="Grayscale<灰度模式>"
        size="large"
        @change="changeGrayscale"
      />
      <el-radio-group
        v-model="grayscaleMode"
        @change="changeGrayscaleMode"
      >
        <el-radio
          label="average"
          size="large"
        >
          average | 平均
        </el-radio>
        <el-radio
          label="luminosity"
          size="large"
        >
          luminosity | 亮度
        </el-radio>
        <el-radio
          label="lightness"
          size="large"
        >
          lightness |光度
        </el-radio>
      </el-radio-group>

      <el-checkbox
        v-model="invert"
        label="Invert<倒置>"
        size="large"
        @change="changeInvert"
      />

      <p>色彩矩阵</p>
      <el-checkbox
        v-model="sepia"
        label="Sepia<深褐色>"
        size="large"
        @change="changeSepia"
      />
      <el-checkbox
        v-model="bw"
        label="Black/White"
        size="large"
        @change="changeBW"
      />
      <el-checkbox
        v-model="brownie"
        label="Brownie"
        size="large"
        @change="changeBrownie"
      />
      <el-checkbox
        v-model="vintage"
        label="Vintage"
        size="large"
        @change="changeVintage"
      />
      <el-checkbox
        v-model="kodachrome"
        label="Kodachrome<柯达彩色胶片>"
        size="large"
        @change="changeKodachrome"
      />
      <el-checkbox
        v-model="technicolor"
        label="Technicolor"
        size="large"
        @change="changeTechnicolor"
      />
      <el-checkbox
        v-model="polaroid"
        label="Polaroid"
        size="large"
        @change="changePolaroid"
      />
      <div>
        <el-checkbox
          v-model="brightness"
          label="Brightness<亮度>"
          size="large"
          @change="changeBrightness"
        />
        <el-slider
          v-model="brightnessValue"
          :min="-1"
          :max="1"
          :step="0.01"
          @change="changeBrightnessValue"
        />
        <el-checkbox
          v-model="gamma"
          label="Gamma<伽马>"
          size="large"
          @change="changeGamma"
        />
        <div class="flex">
          <label style="width: 100px">Red</label>
          <el-slider
            style="width: 70%"
            v-model="gammaRed"
            :min="0.01"
            :max="2.2"
            :step="0.01"
            @change="changeGammaRed"
          />
        </div>
        <div class="flex">
          <label style="width: 100px">Green</label>
          <el-slider
            style="width: 70%"
            v-model="gammaGreen"
            :min="0.01"
            :max="2.2"
            :step="0.01"
            @change="changeGammaGreen"
          />
        </div>
        <div class="flex">
          <label style="width: 100px">Blue</label>
          <el-slider
            style="width: 70%"
            v-model="gammaBlue"
            :min="0.01"
            :max="2.2"
            :step="0.01"
            @change="changeGammaBlue"
          />
        </div>
        <el-checkbox
          v-model="contrast"
          label="Contrast<对比度>"
          size="large"
          @change="changeContrast"
        />
        <el-slider
          v-model="contrastValue"
          :min="-1"
          :max="1"
          :step="0.01"
          @change="changeContrastValue"
        />
        <el-checkbox
          v-model="saturation"
          label="Saturation<饱和度>"
          size="large"
          @change="changeSaturation"
        />
        <el-slider
          v-model="saturationValue"
          :min="-1"
          :max="1"
          :step="0.01"
          @change="changeSaturationValue"
        />
        <el-checkbox
          v-model="vibrance"
          label="Vibrance<自然饱和度>"
          size="large"
          @change="changeVibrance"
        />
        <el-slider
          v-model="vibranceValue"
          :min="-1"
          :max="1"
          :step="0.01"
          @change="changeVibranceValue"
        />
        <el-checkbox
          v-model="hueRotation"
          label="HueRotation<色相旋转>"
          size="large"
          @change="changeHueRotation"
        />
        <el-slider
          v-model="hueRotationValue"
          :min="-1"
          :max="1"
          :step="0.01"
          @change="changeHueRotationValue"
        />
        <el-checkbox
          v-model="noise"
          label="Noise<噪波>"
          size="large"
          @change="changeNoise"
        />
        <el-slider
          v-model="noiseValue"
          :min="0"
          :max="1000"
          :step="1"
          @change="changeNoiseValue"
        />
        <el-checkbox
          v-model="pixelate"
          label="Pixelate<像素化>"
          size="large"
          @change="changePixelate"
        />
        <el-slider
          v-model="pixelateValue"
          :min="2"
          :max="20"
          :step="1"
          @change="changePixelateValue"
        />
        <el-checkbox
          v-model="blur"
          label="Blur<高斯模糊>"
          size="large"
          @change="changeBlur"
        />
        <el-slider
          v-model="blurValue"
          :min="0"
          :max="1"
          :step="0.01"
          @change="changeBlurValue"
        />
        <el-checkbox
          v-model="sharpen"
          label="Sharpen<锐化>"
          size="large"
          @change="changeSharpen"
        />
        <el-checkbox
          v-model="emboss"
          label="Emboss<浮雕>"
          size="large"
          @change="changeEmboss"
        />
        <div>
          <br>
          <el-checkbox
            v-model="blend"
            label="BlendColor"
            size="large"
            @change="changeBlend"
          />
        </div>

        <div class="flex">
          <label style="width: 100px">Mode</label>
          <el-select
            v-model="blendMode"
            class="m-2"
            placeholder="Select"
            size="large"
            @change="changBlendMode"
          >
            <el-option
              v-for="(item, index) in blendModeList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="flex">
          <label style="width: 100px">Color</label>
          <el-color-picker
            style="width: 70%"
            v-model="blendColor"
            size="large"
            @change="changeBlendColor"
          />
        </div>
        <div class="flex">
          <label style="width: 100px">Alpha</label>
          <el-slider
            style="width: 70%"
            v-model="blendAlpha"
            :min="0"
            :max="1"
            :step="0.01"
            @change="changeBlendAlpha"
          />
        </div>

        <el-button @click="onSave">
          保存
        </el-button>
      </div>
    </div>

    <canvas

      id="canvas"
      style="border: 1px solid #ccc;"
    />
  </div>
</template>

<script lang="ts" setup>
import { fabric } from 'fabric'
import { onMounted, ref } from 'vue'
import gwen from '../imgs/gwen-spider-verse-ah.jpg'

/**
 * fabric 内置滤镜
 * BaseFilter 基本过滤器
 * Blur 模糊
 * Brightness 亮度
 * ColorMatrix 颜色矩阵
 * Contrast 对比
 * Convolute 卷积
 * Gamma 伽玛
 * Grayscale 灰度
 * HueRotation 色调旋转
 * Invert 倒置
 * Noise 噪波
 * Pixelate 像素化
 * RemoveColor 移除颜色
 * Resize 调整大小
 * Saturation 饱和
 * Sepia 色偏
 */

const grayscale = ref(false)
const grayscaleMode = ref('')
const invert = ref(false)
const sepia = ref(false)
const bw = ref(false)
const brownie = ref(false)
const vintage = ref(false)
const kodachrome = ref(false)
const technicolor = ref(false)
const polaroid = ref(false)
const reverse = ref(false)
const brightness = ref(false)
const brightnessValue = ref(0.5)
const gamma = ref(false)
const gammaRed = ref(1)
const gammaGreen = ref(1)
const gammaBlue = ref(1)

const contrast = ref(false)
const contrastValue = ref(0.5)
const saturation = ref(false)
const saturationValue = ref(0)

const vibrance = ref(false)
const vibranceValue = ref(0)

const hueRotation = ref(false)
const hueRotationValue = ref(0)

const noise = ref(false)
const noiseValue = ref(700)

const pixelate = ref(false)
const pixelateValue = ref(4)

const blur = ref(false)
const blurValue = ref(0.1)

const sharpen = ref(false)
const emboss = ref(false)

const blend = ref(false)
const blendMode = ref('multiply')
const blendColor = ref('#00f900')
const blendAlpha = ref(1)
const blendModeList = ['multiply', 'screen', 'add', 'diff', 'subtract', 'lighten', 'darken', 'exclusion', 'overlay', 'tint']

// const getIconURL = (url: string) => {
//   return new URL(`./imgs/filter/${url}.jpeg`, import.meta.url).href
// }
let canvas: fabric.Canvas, f: fabric.IAllFilters

const applyFilter = (index: number, filter: fabric.IAllFilters | fabric.IInvertFilter) => {
  const obj = canvas.getActiveObject()
  if (!obj) return

  obj.filters[index] = filter
  obj.applyFilters()
  canvas.renderAll()
}

const applyFilterValue = (index: number, prop: any, value: any) => {
  const obj = canvas.getActiveObject()
  if (!obj) return
  if (obj.filters[index]) {
    obj.filters[index][prop] = value
    obj.applyFilters()
    canvas.renderAll()
  }
}

const getFilter = (index) => {
  const obj = canvas.getActiveObject()
  if (!obj) return
  return obj.filters[index]
}

const changeGrayscale = (value: any) => {
  applyFilter(0, value && new f.Grayscale())
}

const changeGrayscaleMode = (value: String) => {
  if (!value) return
  applyFilterValue(0, 'mode', value)
}

const changeInvert = (value: any) => {
  applyFilter(1, value && new f.Invert())
}

const changeSepia = (value: any) => {
  applyFilter(2, value && new f.Sepia())
}

// Sepia2 @types/fabric@4.5.11有  fabric 5.2.4无
// BlackWhite @types/fabric@4.5.11无  fabric 5.2.4有
const changeBW = (value: any) => {
  applyFilter(3, value && new f.BlackWhite())
}
// Brownie @types/fabric@4.5.11无  fabric 5.2.4有
const changeBrownie = (value: any) => {
  applyFilter(4, value && new f.Brownie())
}

const changeVintage = (value: any) => {
  applyFilter(5, value && new f.Vintage())
}

const changeKodachrome = (value: any) => {
  applyFilter(6, value && new f.Kodachrome())
}

const changeTechnicolor = (value: any) => {
  applyFilter(7, value && new f.Technicolor())
}

const changePolaroid = (value: any) => {
  applyFilter(8, value && new f.Polaroid())
}

const changeReverse = (value: any) => {
  applyFilter(9, value && new f.ColorMatrix({
    matrix: [
      -1, 0, 0, 0, 255,
      0, -1, 0, 0, 255,
      0, 0, -1, 0, 255,
      0, 0, 0, 1, 0
    ]
    // matrix: [
    //   0.3086, 0.6094, 0.0820, 0, 0,
    //   0.3086, 0.6094, 0.0820, 0, 0,
    //   0.3086, 0.6094, 0.0820, 0, 0,
    //   0, 0, 0, 1, 0
    // ]
  }))
}

const changeBrightness = (value: any) => {
  applyFilter(9, value && new f.Brightness({ brightness: brightnessValue.value }))
}
const changeBrightnessValue = (value: number) => {
  applyFilterValue(9, 'brightness', value)
}

const changeGamma = (value: any) => {
  applyFilter(10, value && new f.Gamma({ gamma: [gammaRed.value, gammaGreen.value, gammaBlue.value] }))
}

const changeGammaRed = (value: number) => {
  if (!gamma.value) return
  const current = getFilter(10).gamma
  current[0] = value
  applyFilterValue(10, 'gamma', current)
}

const changeGammaGreen = (value: number) => {
  if (!gamma.value) return
  const current = getFilter(10).gamma
  current[1] = value
  applyFilterValue(10, 'gamma', current)
}

const changeGammaBlue = (value: number) => {
  if (!gamma.value) return
  const current = getFilter(10).gamma
  current[2] = value
  applyFilterValue(10, 'gamma', current)
}

const changeContrast = (value: any) => {
  applyFilter(11, value && new f.Contrast({ contrast: contrastValue.value }))
}

const changeContrastValue = (value: number) => {
  applyFilterValue(11, 'contrast', value)
}

const changeSaturation = (value: any) => {
  applyFilter(12, value && new f.Saturation({ saturation: saturationValue.value }))
}

const changeSaturationValue = (value: number) => {
  applyFilterValue(12, 'saturation', value)
}

const changeVibrance = (value: any) => {
  applyFilter(13, value && new f.Vibrance({ vibrance: vibranceValue.value }))
}

const changeVibranceValue = (value: number) => {
  applyFilterValue(13, 'vibrance', value)
}

const changeHueRotation = (value: any) => {
  applyFilter(14, value && new f.HueRotation({ rotation: hueRotationValue.value }))
}

const changeHueRotationValue = (value: number) => {
  applyFilterValue(14, 'rotation', value)
}

const changeNoise = (value: any) => {
  applyFilter(15, value && new f.Noise({ noise: noiseValue.value }))
}

const changeNoiseValue = (value: number) => {
  applyFilterValue(15, 'noise', value)
}

const changePixelate = (value: any) => {
  applyFilter(16, value && new f.Pixelate({ blocksize: pixelateValue.value }))
}

const changePixelateValue = (value: number) => {
  applyFilterValue(16, 'blocksize', value)
}

const changeBlur = (value: any) => {
  applyFilter(17, value && new f.Blur({ blur: blurValue.value }))
}

const changeBlurValue = (value: number) => {
  applyFilterValue(17, 'blur', value)
}

const changeSharpen = (value: any) => {
  applyFilter(18, value && new f.Convolute({
    matrix: [0, -1, 0,
      -1, 5, -1,
      0, -1, 0]
  }))
}

const changeEmboss = (value: any) => {
  applyFilter(19, value && new f.Convolute({
    matrix: [1, 1, 1,
      1, 0.7, -1,
      -1, -1, -1]
  }))
}

const changeBlend = (value: any) => {
  applyFilter(20, value && new f.BlendColor({
    color: blendColor.value,
    mode: blendMode.value,
    alpha: blendAlpha.value
  }))
}
const changBlendMode = (value: any) => {
  applyFilterValue(20, 'mode', value)
}

const changeBlendColor = (value: any) => {
  applyFilterValue(20, 'color', value)
}

const changeBlendAlpha = (value: any) => {
  applyFilterValue(20, 'alpha', value)
}

const filters = ref([
  {
    icon: 'grayscale',
    title: 'Grayscale',
    isChecked: false,
    func: (bool: Boolean) => {
      changeGrayscale(bool)
    }
  },
  {
    icon: 'blackWhite',
    title: 'Black & White',
    isChecked: false,
    func: (bool: Boolean) => {
      changeBW(bool)
    }
  },
  {
    icon: 'sharpen',
    title: 'Sharpen',
    isChecked: false,
    func: (bool: Boolean) => {
      changeSharpen(bool)
    }
  },
  {
    icon: 'invert',
    title: 'Invert',
    isChecked: false,
    func: (bool: Boolean) => {
      changeInvert(bool)
    }
  },
  {
    icon: 'vintage',
    title: 'Vintage',
    isChecked: false,
    func: (bool: Boolean) => {
      changeVintage(bool)
    }
  },
  {
    icon: 'polaroid',
    title: 'Polaroid',
    isChecked: false,
    func: (bool: Boolean) => {
      changePolaroid(bool)
    }
  },
  {
    icon: 'kodachrome',
    title: 'Kodachrome',
    isChecked: false,
    func: (bool: Boolean) => {
      changeKodachrome(bool)
    }
  },
  {
    icon: 'technicolor',
    title: 'Technicolor',
    isChecked: false,
    func: (bool: Boolean) => {
      changeTechnicolor(bool)
    }
  },
  {
    icon: 'brownie',
    title: 'Brownie',
    isChecked: false,
    func: (bool: Boolean) => {
      changeBrownie(bool)
    }
  },
  {
    icon: 'sepia',
    title: 'Sepia',
    isChecked: false,
    func: (bool: Boolean) => {
      changeSepia(bool)
    }
  },
  // {
  //   icon: 'removeColor',
  //   title: 'Remove Color',
  //   isChecked: false,
  //   func: (bool: Boolean) => {
  //     changeRemoveColor(bool)
  //   }
  // },
  {
    icon: 'Brightness',
    title: 'brightness',
    isChecked: false,
    func: (bool: Boolean) => {
      changeBrightness(bool)
    }
  },
  {
    icon: 'gamma',
    title: 'Gamma',
    isChecked: false,
    func: (bool: Boolean) => {
      changeGamma(bool)
    }
  },
  {
    icon: 'noise',
    title: 'Noise',
    isChecked: false,
    func: (bool: Boolean) => {
      changeNoise(bool)
    }
  },
  {
    icon: 'pixelate',
    title: 'pixelate',
    isChecked: false,
    func: (bool: Boolean) => {
      changePixelate(bool)
    }
  },
  {
    icon: 'blur',
    title: 'Blur',
    isChecked: false,
    func: (bool: Boolean) => {
      changeBlur(bool)
    }
  },
  {
    icon: 'emboss',
    title: 'Emboss',
    isChecked: false,
    func: (bool: Boolean) => {
      changeEmboss(bool)
    }
  },
  {
    icon: 'blendColor',
    title: 'Blend Color',
    isChecked: false,
    func: (bool: Boolean) => {
      changeBlend(bool)
    }
  }
])

const init = () => {
  fabric.Image.fromURL(gwen, img => {
    canvas = new fabric.Canvas('canvas', { width: img.width, height: img.height })
    f = fabric.Image.filters
    canvas.add(img)
  })
}
const onClickFilter = (item: any) => {
  item.isChecked = !item.isChecked
  item.func(item.isChecked)
}

const onSave = () => {
  const base64 = canvas.toDataURL({ format: 'png' })
  const a = document.createElement('a')
  a.href = base64
  a.download = 'default.png'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

onMounted(() => {
  init()
})

</script>

<style lang="scss" scoped>
.box {
  padding: 32px;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.align-center {
  align-items: center
}
</style>
