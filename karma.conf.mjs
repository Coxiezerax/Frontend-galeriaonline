
import { defineConfig } from 'karma'

export default defineConfig({
  frameworks: ['jasmine', 'vite'],
  
  files: [
    { pattern: 'tests/**/*.spec.jsx', type: 'module', watched: true }
  ],
  
  preprocessors: {
    'tests/**/*.spec.jsx': ['vite']
  },
  
  
  plugins: [
    'karma-jasmine',
    'karma-vite',
    'karma-chrome-launcher',
    'karma-jasmine-html-reporter',
    'karma-coverage'
  ],
  
  reporters: ['progress', 'kjhtml', 'coverage'],
  
  coverageReporter: {
    dir: 'coverage',
    reporters: [
      { type: 'html' },
      { type: 'text-summary' }
    ]
  },
  
  browsers: ['ChromeHeadless'],
  singleRun: false,
  autoWatch: true,
  
  client: {
    clearContext: false,
    jasmine: {
      random: false
    }
  }
})











