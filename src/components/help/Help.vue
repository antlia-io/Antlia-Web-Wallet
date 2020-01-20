<template>
  <div>
    <div class="help-page">
      <div class="row">
        <div class="col-lg-12">
          <div class="version">
            <div class="new-content">
              <h2>Antlia Version 20.20.1</h2>
              <p>
                Find release notes and downloads at
                <a
                  href
                  target="_blank"
                  rel="noopener"
                >www.antlia.io</a>
                <br />use the buttons below to learn about Antlia, Solve problems and get in touch. Thank you for using Antlia Wallet!
              </p>
            </div>
            <div class="help-options">
              <div class="option-box">
                <i class="material-icons">info</i>
                <h4>Help Videos</h4>
              </div>
              <div class="option-box">
                <i class="material-icons">info</i>
                <h4>Help Desk</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="faqs">
      <div class="Expander">
        <!-- <div class="row">
        <div class="col-lg-12">-->
        <div class="Expander__trigger" @click="open=!open" :class="open?'active':'beforeBorder'">
          <h4>{{ title }}</h4>
          <i class="material-icons" :class="{open:open}">expand_more</i>
          <!-- <svg
            class="Expander__trigger-Icon"
            :class="{open:open}"
            width="40"
            height="12"
            stroke="cornflowerblue"
          >
            <polyline points="12,2 20,10 28,2" stroke-width="3" fill="none" />
          </svg>-->
        </div>
        <transition :name="animation">
          <div class="Expander__body" v-show="open">
            <!-- <slot></slot> -->
            <p>
              Find release notes and downloads at
              <a
                href
                target="_blank"
                rel="noopener"
              >www.antlia.io</a>
              use the buttons below to learn about Antlia, Solve problems and get in touch. Thank you for using Antlia Wallet!
            </p>
          </div>
        </transition>
        <!-- </div>
        </div>-->
      </div>
      <div class="Expander">
        <div class="Expander__trigger" @click="open1=!open1" :class="open1?'active':'beforeBorder'">
          <h4>How do I get started?</h4>
          <i class="material-icons" :class="{open:open1}">expand_more</i>
        </div>
        <transition :name="animation">
          <div class="Expander__body" v-show="open1">
            <!-- <slot></slot> -->
            <p>{{ description }}</p>
          </div>
        </transition>
      </div>
      <div class="Expander">
        <div class="Expander__trigger" @click="open2=!open2" :class="open2?'active':'beforeBorder'">
          <h4>How do I update Antlia?</h4>
          <i class="material-icons" :class="{open:open2}">expand_more</i>
        </div>
        <transition :name="animation">
          <div class="Expander__body" v-show="open2">
            <!-- <slot></slot> -->
            <p>{{ description }}</p>
          </div>
        </transition>
      </div>
      <div class="Expander">
        <div class="Expander__trigger" @click="open3=!open3" :class="open3?'active':'beforeBorder'">
          <h4>How does Antlia keep my money safe?</h4>
          <i class="material-icons" :class="{open:open3}">expand_more</i>
        </div>
        <transition :name="animation">
          <div class="Expander__body" v-show="open3">
            <!-- <slot></slot> -->
            <p>{{ description }}</p>
          </div>
        </transition>
      </div>
      <div class="Expander">
        <div class="Expander__trigger" @click="open4=!open4" :class="open4?'active':'beforeBorder'">
          <h4>Can I use Antlia on multiple Devices?</h4>
          <i class="material-icons" :class="{open:open4}">expand_more</i>
        </div>
        <transition :name="animation">
          <div class="Expander__body" v-show="open4">
            <!-- <slot></slot> -->
            <p>{{ description }}</p>
          </div>
        </transition>
      </div>
      <div class="Expander">
        <div class="Expander__trigger" @click="open5=!open5" :class="open5?'active':'beforeBorder'">
          <h4>How long does it take to receive a payment after it was send?</h4>
          <i class="material-icons" :class="{open:open5}">expand_more</i>
        </div>
        <transition :name="animation">
          <div class="Expander__body" v-show="open5">
            <!-- <slot></slot> -->
            <p>{{ description }}</p>
          </div>
        </transition>
      </div>
      <div class="Expander">
        <div class="Expander__trigger" @click="open6=!open6" :class="open6?'active':'beforeBorder'">
          <h4>How can I see the details of a transaction?</h4>
          <i class="material-icons" :class="{open:open6}">expand_more</i>
        </div>
        <transition :name="animation">
          <div class="Expander__body" v-show="open6">
            <!-- <slot></slot> -->
            <p>{{ description }}</p>
          </div>
        </transition>
      </div>
      <div class="Expander">
        <div class="Expander__trigger" @click="open7=!open7" :class="open7?'active':'beforeBorder'">
          <h4>How to claim my withdraw amount?</h4>
          <i class="material-icons" :class="{open:open7}">expand_more</i>
        </div>
        <transition :name="animation">
          <div class="Expander__body" v-show="open7">
            <!-- <slot></slot> -->
            <p>{{ description }}</p>
          </div>
        </transition>
      </div>
      <!-- <div class="Expander">
        <div class="Expander__trigger" @click="open1=!open1" :class="open1?'active':'beforeBorder'">
          <h4>{{ title }}</h4>
          <i class="material-icons" :class="{open:open1}">expand_more</i>
        </div>
        <transition :name="animation">
          <div class="Expander__body" v-show="open1">
            <p>{{ description }}</p>
          </div>
        </transition>
      </div>-->
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex"

export default {
  name: `help`,
  components: {},
  props: {
    title: {
      type: String,
      default: "What is Antlia?"
    },
    description: {
      type: String,
      default:
        "Use the buttons below to learn about Antlia, Solve problems and get in touch. Thank you for using Antlia Wallet! Use the buttons below to learn about Antlia, Solve problems and get in touch. Thank you for using Antlia Wallet! Use the buttons below to learn about Antlia, Solve problems and get in touch. Thank you for using Antlia Wallet! Use the buttons below to learn about Antlia, Solve problems and get in touch. Thank you for using Antlia Wallet! Use the buttons below to learn about Antlia, Solve problems and get in touch. Thank you for using Antlia Wallet! Use the buttons below to learn about Antlia, Solve problems and get in touch. Thank you for using Antlia Wallet! Use the buttons below to learn about Antlia, Solve problems and get in touch. Thank you for using Antlia Wallet! Use the buttons below to learn about Antlia, Solve problems and get in touch. Thank you for using Antlia Wallet! Use the buttons below to learn about Antlia, Solve problems and get in touch. Thank you for using Antlia Wallet!"
    },
    animation: {
      type: String,
      default: "rightToLeft"
      // validator: prop => ['leftToRight', 'bounceIn', 'bottomToTop'].includes(prop)
    }
  },
  data() {
    return {
      open: false,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false,
      open6: false,
      open7: false
    }
  }
}
</script>
<style scoped>
.help-page {
  background: #1c203e;
  padding: 3rem 1rem;
  margin: 1rem;
}
.version {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.help-page h2 {
  font-size: 2.5rem;
  color: white;
  text-align: center;
  text-transform: capitalize;
  margin: 0 0 1.5rem;
}
.help-page p {
  font-size: 1rem;
  color: #848688;
  text-align: center;
}
.help-options {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em 0 0;
}
.option-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.5rem 2rem;
  background: #151934;
  border-radius: 5px;
  margin: 0 0.5rem;
}
.option-box .material-icons {
  font-size: 2rem;
  color: white;
  width: 100%;
  text-align: center;
  margin: 0 0 0.5rem;
}
.option-box h4 {
  font-size: 1.5rem;
  color: white;
  width: 100%;
  text-align: center;
}
.faqs {
  margin: 1rem;
}
.Expander {
  background: #1c203e;
  padding: 0;
  margin: 0 0 1rem;
}
/* .beforeBorder {
  position: relative;} */

/* .beforeBorder:after {
      transition: opacity .1s linear, transform .5s ease-in-out;
      position: absolute;
      border-bottom: 1px solid currentColor;
      content: '';
      width: 100%;
      left: 0;
      bottom: -1px;
  }
 .beforeBorder:not(:hover)::after{
      transform: scaleX(0);
      opacity: 0;
  } */

.Accordion {
  background: #fff;
  box-shadow: 0 1px 12px 1px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
.Expander__body {
  padding: 2.3rem;
}
.Expander__body p {
  font-size: 1rem;
  color: #848688;
  text-align: justify;
}
.Expander__trigger {
  cursor: pointer;
  padding: 1rem 2.3rem;
  /* border-bottom: 1px solid #efefef; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Expander__trigger h4 {
  color: #848688;
  font-size: 1.4rem;
}
.Expander__trigger .material-icons {
  color: #848688;
  font-size: 2.3rem;
}
.active {
  border-bottom: 1px solid #3c466c;
}
.Expander__trigger:hover {
  color: #848688;
}

.Expander__trigger-Icon {
  transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
}
.Expander__trigger .open {
  stroke: #848688;
  transform: rotate(180deg);
}

.Expander__trigger__body {
  padding: 1rem 1.5rem;
  background: #eff0f2;
  overflow: hidden;
}

.rightToLeft-enter-active {
  animation: rightToLeft 1s;
}
.rightToLeft-leave-active {
  animation: rightToLeft 1s reverse;
}
@keyframes rightToLeft {
  0% {
    transform: translateX(100vw);
  }
  50% {
    transform: translateX(-2em);
  }
  100% {
    transform: translateX(0);
  }
}

.leftToRight-enter-active {
  animation: leftToRight 0.5s;
}
.leftToRight-leave-active {
  animation: leftToRight 0.5s reverse;
}
@keyframes leftToRight {
  0% {
    transform: translateX(-100vw);
  }
  50% {
    transform: translateX(2em);
  }

  100% {
    transform: translateX(0);
  }
}
.bounceIn-enter-active {
  animation: bounceIn 0.3s;
}

.bounceIn-leave-active {
  animation: bottomToTop 0.2s reverse;
}

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.bottomToTop-enter-active {
  animation: bottomToTop 0.5s forwards;
}

.bottomToTop-leave-active {
  animation: bottomToTop 0.5s reverse;
}

@keyframes bottomToTop {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}
@media (max-width: 575px) {
  .Expander__trigger {
    padding: 1rem;
  }
  .Expander__body {
    padding: 1.5rem 1rem;
  }
}
@media (max-width: 500px) {
  .help-options {
    flex-wrap: wrap;
  }
  .option-box {
    width: 100%;
    max-width: 250px;
    margin: 0 auto 1rem;
  }
}
</style>

