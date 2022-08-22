<template>
  <div class="step-container">
    <h3>
      Sprite sheet animation with steps()
    </h3>
    <div class="box" />
    <div class="box box1" />
    <div class="box box2" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
// body {
//   font-family: Raleway;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   color: #000;
// }

.step-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.box {
  width: 256px;
  height: 256px;
  background: url("https://github.com/iamalperen/playground/blob/main/SpriteSheetAnimation/sprite.png?raw=true");
  margin-top: 30px;
  cursor: pointer;
}
.box1 {
  animation: sprite 0.6s steps(6, end) infinite;
}
.box2 {
  animation: sprite 0.2s steps(6, start) infinite;
}

@keyframes sprite {
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: -1536px 0px;
  }
}
</style>
