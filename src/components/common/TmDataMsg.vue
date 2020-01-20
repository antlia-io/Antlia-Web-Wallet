<template>
  <div class="tm-data-msg">
    <div class="icon-div">
     <div class="tm-data-msg__icon">
      <i :class="spinnerClass" class="material-icons">{{ icon }}</i>
    </div>
    </div>
    <div class="tm-data-msg__text">
     
      <h2 class="tm-data-msg__title">
        <slot name="title">
          {{ title }}
        </slot>
      </h2>
      <h3 class="tm-data-msg__subtitle">
        <slot name="subtitle">
          {{ subtitle }}
        </slot>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: `tm-data-msg`,
  props: {
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    spinnerClass({ spin } = this) {
      return spin ? `fa-spin` : ``
    }
  }
}
</script>

<style>
#signModal .tm-data-msg {
  background: transparent;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 0.25rem;
}
#signModal .icon-div,
#signModal .tm-data-msg__text{
  width: 100%;
}
.tm-data-msg {
  background: #2c3255;
  padding: 4rem;
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
}
#modal-propose .tm-data-msg,
#modal-deposit .tm-data-msg,
#delegation-modal .tm-data-msg,
#undelegation-modal .tm-data-msg,
#modal-withdraw-rewards .tm-data-msg,
#send-modal  .tm-data-msg {
  background: transparent;
  padding: 5rem;
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
}
#modal-propose .inclusion-step,
#modal-deposit .inclusion-step,
#delegation-modal  .inclusion-step,
#undelegation-modal  .inclusion-step,
#modal-withdraw-rewards  .inclusion-step,
#send-modal  .inclusion-step {
  border-left: 8px solid #ffc107;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
#modal-propose .success-step,
#modal-deposit .success-step,
#delegation-modal .success-step,
#undelegation-modal .success-step,
#modal-withdraw-rewards .success-step,
#send-modal  .success-step {
  border-left: 8px solid #23b681;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
#send-modal .tm-data-msg__icon {
  width: 50px;
  height: 100%;
  /* border: 5px solid #c7c7c7; */
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  
}
#modal-propose .tm-data-msg__icon i.material-icons,
#modal-deposit .tm-data-msg__icon i.material-icons,
#delegation-modal .tm-data-msg__icon i.material-icons,
#undelegation-modal .tm-data-msg__icon i.material-icons,
#modal-withdraw-rewards .tm-data-msg__icon i.material-icons,
#send-modal .tm-data-msg__icon i.material-icons {
background: #ffc230;
color: white
}
#modal-propose .success-step .tm-data-msg__icon i.material-icons,
#modal-deposit .success-step .tm-data-msg__icon i.material-icons,
#delegation-modal .success-step .tm-data-msg__icon i.material-icons,
#undelegation-modal .success-step .tm-data-msg__icon i.material-icons,
#modal-withdraw-rewards .success-step .tm-data-msg__icon i.material-icons,
#send-modal .success-step .tm-data-msg__icon i.material-icons {
background: #23b861;
color: white
}
#modal-propose .tm-data-msg__title,
#modal-deposit .tm-data-msg__title,
#delegation-modal .tm-data-msg__title,
#undelegation-modal .tm-data-msg__title,
#modal-withdraw-rewards .tm-data-msg__title,
 #send-modal .tm-data-msg__title {
  font-weight: 600;
  color: #000847;
  font-size: var(--h2);
  text-align: left;
  text-transform: unset;
  margin: 0 0 1rem;
}
#send-modal .tm-data-msg__text {
    padding: 0 1rem;
}
#signModal .tm-data-msg__icon {
  width: 100%;
  max-width: 50px;
  height: 50px;
  border: 5px solid #c7c7c7;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2rem;
}
#signModal .tm-data-msg__icon i.material-icons {
  background: transparent;
  color: var(--link);
  font-size: 2rem;
  font-weight: 600;
  }
 #signModal .tm-data-msg__title {
  font-weight: 600;
  color: #000847;
  font-size: var(--h2);
  text-align: center;
  text-transform: capitalize;
}

.tm-data-msg__icon {
  margin-right: 1.5rem;
}

.tm-data-msg__icon i.material-icons {
  font-size: 2rem;
  color: var(--txt);
  background: #ffc107;
  padding: 0.5rem;
  border-radius: 50%;
}

.tm-data-msg__title {
  font-weight: 400;
  color: white;
  font-size: var(--h2);
}

.tm-data-msg__subtitle {
  color: #848688;
  font-size: 1rem;
}

@media screen and (max-width: 767px) {
  .tm-data-msg {
    padding: 2rem 1rem;
  }
}

@media screen and (max-width: 1023px) {
  .tm-data-msg {
    display: block;
    padding: 2rem;
    margin-bottom: 3rem
  }

  .tm-data-msg__icon {
    margin-bottom: 1rem;
  }

  #signverify .tm-data-msg__icon {
    margin-left: 1.5rem;
  }
}
</style>
