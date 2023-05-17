<template>
    <b-card
      no-body
      class="card-browser-states"
    >
      <b-card-header>
        <div>
          <b-card-title>Client Attachments</b-card-title>
        </div>
     <!--   <feather-icon
          icon="MoreVerticalIcon"
          size="18"
          class="cursor-pointer"
        />-->
      </b-card-header>
  
      <!-- body -->
      <b-card-body>
       
        <div
          v-for="(browser,index) in browserData"
          :key="browser.browserImg"
          class="browser-states"
        >
          <b-media no-body>
            <b-img
              :src="browser.browserImg"
              alt="browser img"
              class="mr-1"
              height="30"
            />
            <h6 class="align-self-center my-auto">
              {{ browser.name }}
            </h6>
          </b-media>
       <!-- <div class="d-flex align-items-center">
            <span class="font-weight-bold text-body-heading mr-1">{{ browser.usage }}</span>
            <vue-apex-charts
              type="radialBar"
              height="30"
              width="30"
              :options="chartData[index].options"
              :series="chartData[index].series"
            />
          </div>
        -->
        </div>
      </b-card-body>
      <!--/ body -->
    </b-card>
  </template>
  
  <script>
  import {
    BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BMedia, BImg,
  } from 'bootstrap-vue'
  import VueApexCharts from 'vue-apexcharts'
  import { $themeColors } from '@themeConfig'
  /* eslint-disable global-require */
  const $trackBgColor = '#e9ecef'
  export default {
    components: {
      BCard,
      BCardHeader,
      BCardTitle,
      BCardText,
      BCardBody,
      BMedia,
      BImg,
      VueApexCharts,
    },
    props:{
        title:{
            type: String,
      required: true,
        }
    },
    data() {
      return {
        chartData: [],
        chartClone: {},
        chartColor: [$themeColors.primary, $themeColors.warning, $themeColors.secondary, $themeColors.info, $themeColors.danger],
        chartSeries: [54.4, 6.1, 14.6, 4.2, 8],
        browserData: [
          {
            browserImg: require('@/assets/images/icons/pdf.png'),
            name: 'Address proof',
           // usage: '54.4%',
          },
          {
            browserImg: require('@/assets/images/icons/doc.png'),
            name: 'Identity ',
           // usage: '6.1%',
          },
          {
            browserImg: require('@/assets/images/icons/sketch.png'),
            name: 'Details',
           // usage: '14.6%',
          },
          {
            browserImg:  require('@/assets/images/icons/pdf.png'),
            name: 'Concerns',
           // usage: '4.2%',
          },
          {
            browserImg: require('@/assets/images/icons/doc.png'),
            name: 'Requirements',
           // usage: '8.4%',
          },
        ],
        chart: {
          series: [65],
          options: {
            grid: {
              show: false,
              padding: {
                left: -15,
                right: -15,
                top: -12,
                bottom: -15,
              },
            },
            colors: [$themeColors.primary],
            plotOptions: {
              radialBar: {
                hollow: {
                  size: '22%',
                },
                track: {
                  background: $trackBgColor,
                },
                dataLabels: {
                  showOn: 'always',
                  name: {
                    show: false,
                  },
                  value: {
                    show: false,
                  },
                },
              },
            },
            stroke: {
              lineCap: 'round',
            },
          },
        },
      }
    },
    created() {
      for (let i = 0; i < this.browserData.length; i += 1) {
        const chartClone = JSON.parse(JSON.stringify(this.chart))
        chartClone.options.colors[0] = this.chartColor[i]
        chartClone.series[0] = this.chartSeries[i]
        this.chartData.push(chartClone)
      }
    },
   
 
  }
  </script>
  