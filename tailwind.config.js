const {nextui} = require('@nextui-org/theme');
import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
],
  theme: {
    extend: {
      keyframes: {
        skew:{
          '90': '45deg'
        },
        openmenu: {
          '0%': { transform: 'translateX(-80);' },
          '100%': { transform: 'translateX(0);' },
        },
        closemenu:{
          '0%': { transform: 'translateX(0);' },
          '100%': { transform: 'translateX(-80);' },
        }
      },
      animation:{
        openan:'open forwards 2s linear',
        closean: 'close forwards 2s linear'
      },
      fontFamily:{
          Inter:["Inter", 'sans-serif']
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
        light: {
            colors: {
                // main background
                input: '#FAFAFA',
                background1:'#FFFFFF',
                background2:'#F0F0F0',// important texts
                foreground: '#1E2023',
                primary: {
                    1: '#FAFAFA',
                    2: '#999999',
                    3: '#E0E0E0',},},},
                    
        dark: {
            colors: {
                // main background
                input: '#000',
                background1: '#151719' ,
                background2: '#191B1D',// important texts
                foreground: '#F0F0F0',
                primary: {
                    1:'#111315',
                    2: '#999999',
                    3: '#1E2023',},},},},}),nextui()],
}
