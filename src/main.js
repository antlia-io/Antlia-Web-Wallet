"use strict"
/**
 * Main module
 * @module main
 */
import { main } from "scripts/boot"
import Vue from "vue"
import BootstrapVue from "bootstrap-vue"
import VueCarousel from "vue-carousel"


Vue.use(BootstrapVue,VueCarousel)
// run
main()
