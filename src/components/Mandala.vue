<template>
  <div class="mandala-container" :class="className">
    <div
      class="mandala-translate"
      :class="className === 'right' ? 'rotate-right' : 'rotate-left'"
    >
      <svg
        width="675"
        height="675"
        viewBox="0 0 675 675"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mandala"
      >
        <defs>
          <path
            d="M337.5,337.5 m-320,0 a320,320 0 1,1 640,0 a320,320 0 1,1 -640,0"
            id="circle1"
          />
          <path
            d="M337.5,337.5 m-280,0 a280,280 0 1,1 560,0 a280,280 0 1,1 -560,0"
            id="circle2"
          />
          <path
            d="M337.5,337.5 m-240,0 a240,240 0 1,1 480,0 a240,240 0 1,1 -480,0"
            id="circle3"
          />
          <path
            d="M337.5,337.5 m-200,0 a200,200 0 1,1 400,0 a200,200 0 1,1 -400,0"
            id="circle4"
          />
          <path
            d="M337.5,337.5 m-160,0 a160,160 0 1,1 320,0 a160,160 0 1,1 -320,0"
            id="circle5"
          />
        </defs>
        <text class="mandala-accent-1" dy="70" textLength="2010">
          <textPath textLength="2010" href="#circle1">
            <tspan
              v-for="s1 in items.s1.len"
              :key="s1"
              v-html="items.s1.text"
            />
          </textPath>
        </text>
        <text class="mandala-accent-2" dy="70" textLength="1760">
          <textPath textLength="1760" href="#circle2">
            <tspan
              v-for="s2 in items.s2.len"
              :key="s2"
              v-html="items.s2.text"
            />
          </textPath>
        </text>
        <text class="mandala-accent-3" dy="70" textLength="1507">
          <textPath textLength="1507" href="#circle3">
            <tspan
              v-for="s3 in items.s3.len"
              :key="s3"
              v-html="items.s3.text"
            />
          </textPath>
        </text>
        <text class="mandala-accent-4" dy="70" textLength="1257">
          <textPath textLength="1257" href="#circle4">
            <tspan
              v-for="s4 in items.s4.len"
              :key="s4"
              v-html="items.s4.text"
            />
          </textPath>
        </text>
        <text class="mandala-accent-5" dy="70" textLength="1005">
          <textPath textLength="1005" href="#circle5">
            <tspan
              v-for="s5 in items.s5.len"
              :key="s5"
              v-html="items.s5.text"
            />
          </textPath>
        </text>
      </svg>
    </div>
  </div>
</template>

<script>
import { NON_BREAKING_SPACE } from '@/state/'

export default {
  name: 'Mandala',
  props: {
    className: {
      type: String,
      default: 'left',
    },
  },
  data: () => ({
    items: {
      s1: {
        text: `${NON_BREAKING_SPACE.repeat(3)}΅̮̼˘˼̐`,
        len: 7,
      },
      s2: {
        text: `${NON_BREAKING_SPACE.repeat(
          2
        )};̧΅̮̼<tspan>̧΅</tspan>̃ˬ<tspan>̧</tspan>̧΅̮<tspan>͒̈́</tspan>`,
        len: 7,
      },
      s3: {
        text: `˘˼̐˶̨̰̼̃͂̏̑̉̆${NON_BREAKING_SPACE.repeat(2)}`,
        len: 6,
      },
      s4: {
        text: `${NON_BREAKING_SPACE.repeat(3)} ͒̈́'`,
        len: 7,
      },
      s5: {
        text: 'ˠ˞˟˷̐˽̘̖̫̫̭̮̔',
        len: 15,
      },
    },
  }),
}
</script>

<style>
.mandala-container {
  --mandala-primary: rgb(136 136 136);
  --mandala-accent-1: rgb(136 136 136);
  --mandala-accent-2: rgb(136 136 136);
  --mandala-accent-3: rgb(136 136 136);
  --mandala-accent-4: rgb(136 136 136);

  position: absolute;
  overflow: hidden;
  bottom: -40px;
  opacity: 0.4;
}

.mandala-container.left {
  right: -150px;
}

.mandala-container.right {
  left: -150px;
}

@keyframes rotation-left {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

@keyframes rotation-right {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.mandala-container .rotate-left > svg {
  animation: rotation-left 500s linear infinite;
}

.mandala-container .rotate-right > svg {
  animation: rotation-right 500s linear infinite;
}

.mandala-container svg {
  font-size: 1.5rem;
  font-weight: 300;
  user-select: none;
}

.mandala-container svg > text {
  fill: var(--mandala-primary);
}

.mandala-container .mandala-accent-1 {
  font-size: 1.5rem;
}

.mandala-container .mandala-accent-2 {
  font-size: 1.3rem;
}

.mandala-container .mandala-accent-3 {
  font-size: 1.2rem;
}

.mandala-container .mandala-accent-4 {
  font-size: 1.1rem;
}

.mandala-container .mandala-accent-5 {
  font-size: 1rem;
}
</style>
