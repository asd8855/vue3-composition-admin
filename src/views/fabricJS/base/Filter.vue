<template>
  <div
    class="flex items-center content-between"
    style="padding: 0 32px"
  >
    <h2>Fabric.js: 5.2.4</h2>
    <el-button
      type="primary"
      @click="onSave"
    >
      保存
    </el-button>
  </div>

  <div class="box flex content-center">
    <canvas
      id="filter-canvas"
      style="border: 1px solid #ccc"
    />
  </div>
  <div
    class="controls-wrapper flex content-center"
    style="height: 60px"
  >
    <el-slider
      v-if="currentFilterConfig.isSlider"
      style="width: 50%"
      v-model="currentFilterConfig.value"
      :min="currentFilterConfig.min"
      :max="currentFilterConfig.max"
      :step="currentFilterConfig.step"
      @change="changeSlider"
    />
    <el-radio-group
      v-else-if="currentFilterConfig.isRadio"
      v-model="currentFilterConfig.value"
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
    <div
      v-else-if="currentFilterConfig.isGamma"
      class="flex content-between items-center"
      style="width: 100%"
    >
      <div
        class="flex items-center"
        style="width: 70%"
      >
        <label>Red</label>
        <el-slider
          style="width: 70%"
          v-model="gammaRed"
          :min="0.01"
          :max="2.2"
          :step="0.01"
          @change="changeGammaRed"
        />
      </div>
      <div
        class="flex items-center"
        style="width: 70%"
      >
        <label>Green</label>
        <el-slider
          style="width: 70%"
          v-model="gammaGreen"
          :min="0.01"
          :max="2.2"
          :step="0.01"
          @change="changeGammaGreen"
        />
      </div>
      <div
        class="flex items-center"
        style="width: 70%"
      >
        <label>Blue</label>
        <el-slider
          style="width: 70%"
          v-model="gammaBlue"
          :min="0.01"
          :max="2.2"
          :step="0.01"
          @change="changeGammaBlue"
        />
      </div>
    </div>
    <div
      v-else-if="currentFilterConfig.isBlendColor"
      class="flex content-between items-center"
      style="width: 100%"
    >
      <div class="flex items-center">
        <label>Mode</label>
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
      <div class="flex items-center">
        <label>Color</label>
        <el-color-picker
          style="width: 70%"
          v-model="blendColor"
          size="large"
          @change="changeBlendColor"
        />
      </div>
      <div
        class="flex items-center"
        style="width: 70%"
      >
        <label>Alpha</label>
        <el-slider
          style="width: 70%"
          v-model="blendAlpha"
          :min="0"
          :max="1"
          :step="0.01"
          @change="changeBlendAlpha"
        />
      </div>
    </div>
    <div
      v-else-if="currentFilterConfig.isRemoveColor"
      class="flex content-between items-center"
      style="width: 100%"
    >
      <div class="flex items-center">
        <label>Color</label>
        <el-color-picker
          style="width: 70%"
          v-model="removeColor"
          size="large"
          @change="changeRemoveColorValue"
        />
      </div>
      <div
        class="flex items-center"
        style="width: 70%"
      >
        <label>Distance</label>
        <el-slider
          style="width: 70%"
          v-model="removeColorDistance"
          :min="0"
          :max="1"
          :step="0.01"
          @change="changeRemoveColorDistance"
        />
      </div>
    </div>
  </div>
  <div class="controls-wrapper flex">
    <div
      v-for="item in filters"
      :key="item.title"
      class="flex flex-col items-center filter-item"
      @click="onClickFilter(item)"
    >
      <div class="img-container">
        <img
          :src="getIconURL(item.icon)"
          alt="grayscale"
          :title="item.title"
          :class="[item.isChecked ? 'active' : '']"
        >
      </div>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fabric } from 'fabric'
import { onMounted, ref, reactive } from 'vue'
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

const gammaRed = ref(1)
const gammaGreen = ref(1)
const gammaBlue = ref(1)
const blendMode = ref('multiply')
const blendColor = ref('#00f900')
const blendAlpha = ref(1)
const blendModeList = [
  'multiply',
  'screen',
  'add',
  'diff',
  'subtract',
  'lighten',
  'darken',
  'exclusion',
  'overlay',
  'tint'
]

const removeColor = ref('#00f900')
const removeColorDistance = ref(0.5)

const currentFilterConfig = ref({})
const showSettingToolbar = ref(false)

let canvas: fabric.Canvas, f: fabric.IAllFilters

const getIconURL = (url: string) => {
  return require(`../imgs/filter/${url}.jpeg`)
}
const applyFilter = (
  index: number,
  filter: fabric.IAllFilters | fabric.IInvertFilter
) => {
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

const getFilter = (index: number) => {
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

const changeBrightness = (value: any) => {
  applyFilter(9, value && new f.Brightness())
}
const changeBrightnessValue = (value: number) => {
  applyFilterValue(9, 'brightness', value)
}

const changeGamma = (value: any) => {
  applyFilter(
    10,
    value &&
      new f.Gamma({
        gamma: [gammaRed.value, gammaGreen.value, gammaBlue.value]
      })
  )
}

const changeGammaRed = (value: number) => {
  const current = getFilter(10).gamma
  if (!current.length) return
  current[0] = value
  applyFilterValue(10, 'gamma', current)
}

const changeGammaGreen = (value: number) => {
  const current = getFilter(10).gamma
  if (!current.length) return

  current[1] = value
  applyFilterValue(10, 'gamma', current)
}

const changeGammaBlue = (value: number) => {
  const current = getFilter(10).gamma
  if (!current.length) return
  current[2] = value
  applyFilterValue(10, 'gamma', current)
}

const changeContrast = (value: any) => {
  applyFilter(11, value && new f.Contrast())
}

const changeContrastValue = (value: number) => {
  applyFilterValue(11, 'contrast', value)
}

const changeSaturation = (value: any) => {
  applyFilter(
    12,
    value && new f.Saturation()
  )
}

const changeSaturationValue = (value: number) => {
  applyFilterValue(12, 'saturation', value)
}

const changeVibrance = (value: any) => {
  applyFilter(13, value && new f.Vibrance())
}

const changeVibranceValue = (value: number) => {
  applyFilterValue(13, 'vibrance', value)
}

const changeHueRotation = (value: any) => {
  applyFilter(
    14,
    value && new f.HueRotation()
  )
}

const changeHueRotationValue = (value: number) => {
  applyFilterValue(14, 'rotation', value)
}

const changeNoise = (value: any) => {
  applyFilter(15, value && new f.Noise())
}

const changeNoiseValue = (value: number) => {
  applyFilterValue(15, 'noise', value)
}

const changePixelate = (value: any) => {
  applyFilter(16, value && new f.Pixelate())
}

const changePixelateValue = (value: number) => {
  applyFilterValue(16, 'blocksize', value)
}

const changeBlur = (value: boolean) => {
  applyFilter(17, value && new f.Blur())
}

const changeBlurValue = (value: number) => {
  applyFilterValue(17, 'blur', value)
}

const changeSharpen = (value: any) => {
  applyFilter(
    18,
    value &&
      new f.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
      })
  )
}

const changeEmboss = (value: any) => {
  applyFilter(
    19,
    value &&
      new f.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1]
      })
  )
}

const changeBlend = (value: any) => {
  applyFilter(
    20,
    value &&
      new f.BlendColor({
        color: blendColor.value,
        mode: blendMode.value,
        alpha: blendAlpha.value
      })
  )
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

const changeRemoveColor = (value: any) => {
  applyFilter(21, value && new f.RemoveColor({ distance: removeColorDistance.value, color: removeColor.value }))
}

const changeRemoveColorValue = (value: any) => {
  applyFilterValue(21, 'color', value)
}

const changeRemoveColorDistance = (value: any) => {
  applyFilterValue(21, 'distance', value)
}

const filters = ref([
  {
    icon: 'grayscale',
    title: 'Grayscale',
    isChecked: false,
    isRadio: true,
    hasSetting: true,
    value: 'average',
    func: (bool: Boolean) => {
      changeGrayscale(bool)
    }
  },
  {
    icon: 'blackWhite',
    title: 'Black&White',
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
  {
    icon: 'removeColor',
    title: 'RemoveColor',
    isChecked: false,
    hasSetting: true,
    isRemoveColor: true,
    func: (bool: Boolean) => {
      changeRemoveColor(bool)
    }
  },
  {
    icon: 'brightness',
    title: 'Brightness',
    isChecked: false,
    hasSetting: true,
    isSlider: true,
    min: -1,
    max: 1,
    step: 0.01,
    value: 0.5,
    func: (bool: Boolean) => {
      changeBrightness(bool)
    },
    sliderFunc: (value: number) => {
      changeBrightnessValue(value)
    }
  },
  {
    icon: 'gamma',
    title: 'Gamma',
    isChecked: false,
    hasSetting: true,
    isGamma: true,
    redValue: 1,
    Green: 1,
    Blue: 1,
    func: (bool: Boolean) => {
      changeGamma(bool)
    }
  },
  {
    icon: 'noise',
    title: 'Noise',
    isChecked: false,
    hasSetting: true,
    isSlider: true,
    min: 0,
    max: 1000,
    step: 1,
    value: 700,
    func: (bool: Boolean) => {
      changeNoise(bool)
    },
    sliderFunc: (value: number) => {
      changeNoiseValue(value)
    }
  },
  {
    icon: 'pixelate',
    title: 'Pixelate',
    hasSetting: true,
    isChecked: false,
    isSlider: true,
    min: 2,
    max: 20,
    step: 1,
    value: 4,
    func: (bool: Boolean) => {
      changePixelate(bool)
    },
    sliderFunc: (value: number) => {
      changePixelateValue(value)
    }
  },
  {
    icon: 'blur',
    title: 'Blur',
    isChecked: false,
    hasSetting: true,
    isSlider: true,
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.5,
    func: (bool: boolean) => {
      changeBlur(bool)
    },
    sliderFunc: (value: number) => {
      changeBlurValue(value)
    }
  },
  {
    icon: 'contrast',
    title: 'Contrast',
    isChecked: false,
    hasSetting: true,
    isSlider: true,
    min: -1,
    max: 1,
    step: 0.01,
    value: 0.5,
    func: (bool: Boolean) => {
      changeContrast(bool)
    },
    sliderFunc: (value: number) => {
      changeContrastValue(value)
    }
  },
  {
    icon: 'saturation',
    title: 'Saturation',
    isChecked: false,
    hasSetting: true,
    isSlider: true,
    min: -1,
    max: 1,
    step: 0.01,
    value: 0.5,
    func: (bool: Boolean) => {
      changeSaturation(bool)
    },
    sliderFunc: (value: number) => {
      changeSaturationValue(value)
    }
  },
  {
    icon: 'vibrance',
    title: 'Vibrance',
    isChecked: false,
    hasSetting: true,
    isSlider: true,
    min: -1,
    max: 1,
    step: 0.01,
    value: 0.5,
    func: (bool: Boolean) => {
      changeVibrance(bool)
    },
    sliderFunc: (value: number) => {
      changeVibranceValue(value)
    }
  },
  {
    icon: 'hueRotation',
    title: 'HueRotation',
    isChecked: false,
    hasSetting: true,
    isSlider: true,
    min: -1,
    max: 1,
    step: 0.01,
    value: 0.5,
    func: (bool: Boolean) => {
      changeHueRotation(bool)
    },
    sliderFunc: (value: number) => {
      changeHueRotationValue(value)
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
    title: 'BlendColor',
    isChecked: false,
    hasSetting: true,
    isBlendColor: true,
    func: (bool: Boolean) => {
      changeBlend(bool)
    }
  }
])

const init = () => {
  fabric.Image.fromURL(gwen, (img) => {
    canvas = new fabric.Canvas('filter-canvas', {
      width: img.width,
      height: img.height
    })
    f = fabric.Image.filters
    canvas.add(img)
  })
}

const changeSlider = (value: number) => {
  currentFilterConfig.value.sliderFunc(value)
}

const onClickFilter = (item: any) => {
  item.isChecked = !item.isChecked
  item.func(item.isChecked)
  currentFilterConfig.value = item
  if (item.hasSetting && item.isChecked && item.isSlider) {
    changeSlider(item.value)
  }
}

const onSave = () => {
  const base64 = canvas.toDataURL({ format: 'jpeg' })
  const a = document.createElement('a')
  a.href = base64
  a.download = 'default.jpeg'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

onMounted(() => {
  init()
  // setImg()
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

.items-center {
  align-items: center;
}

.content-center {
  justify-content: center;
}

.content-between {
  justify-content: space-between;
}

.controls-wrapper {
  background-color: #000;
  padding: 8px 16px;
  overflow-x: scroll;
  .filter-item {
    margin: 8px;
  }

  .img-container {
    position: relative;
  }

  .mask-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    opacity: 0.8;
  }

  img {
    width: 64px;
    height: 64px;
    border-radius: 4px;
    border: 2px solid transparent;
    display: block;
  }

  .active {
    border-color: blue;
  }

  span {
    font-size: 12px;
    color: #fff;
  }

  label {
    font-size: 14px;
    color: #fff;
    margin-right: 16px;
  }
}
</style>
