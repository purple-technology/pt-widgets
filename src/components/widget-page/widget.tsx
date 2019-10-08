import {Component, Element, Listen, Prop, Watch, State, h} from '@stencil/core'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import classNames from 'classnames/dedupe'
import axios from 'axios'
import Debounce from 'debounce-decorator'

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


@Component({
  tag: 'pt-widget-page',
  styleUrl: 'widget.styl',
  //shadow: true,
})
export class Widget {

  @Element() private el: HTMLElement
  @Prop() class: string
  @Prop() strategy: string
  @Prop() height: string
  @Prop() chartId: string

  @State() width: number
  // @State() height: number
  @State() dailyGains: [{date: string, gain: number}?] = []
  @State() monthlyGains: [{date: string, gain: number}?] = []
  @State() name: string
  @State() currency: [string?] = []
  @State() gain: number
  @State() openPl: number
  @State() capitalGuard: number
  @State() minimalDeposit: object = {}

  @State() performanceFee: number
  @State() managementFee: number
  @State() depositCommission: number

  @Watch('strategy')
  validateName(newValue: string) {
    if (typeof newValue === null) { throw new Error('`strategy` is required') }
  }

  @Listen('resize', {target: 'window'})
  @Debounce(1000)
  handleWindowResize() {
    //this.calculateSize()
  }

  componentDidLoad() {
    console.info('did load')
    //this.calculateSize()
    this.chartId = 'chart' + makeid(5)
    this.getData()
  }

  componentDidRender() {
    console.info('did render')
    this.generateChart()
  }
  
  calculateSize() {
    const w:HTMLElement = this.el.querySelector('.sparkline--container')
    console.log(w.offsetWidth, w.offsetHeight)
    this.width = w.offsetWidth
    // this.height = w.offsetHeight
  }

  getData() {
    axios({
      method: 'get',
      url: `https://api.purple-trading.com/strategies/${this.strategy}`
    })
    .then((response) => {
      const {
        name,
        currency,
        gainsSum,
        openPlSum,
        dailyGains,
        monthlyGains,
        minimalDeposit,
        capitalGuard,
        performanceFee,
        managementFee,
        depositCommission
      } = response.data
      this.name = name
      this.currency = currency
      this.gain = gainsSum
      this.openPl = openPlSum
      this.dailyGains = dailyGains
      this.monthlyGains = monthlyGains
      this.minimalDeposit = minimalDeposit
      this.capitalGuard = capitalGuard
      
      this.performanceFee = performanceFee
      this.managementFee = managementFee
      this.depositCommission = depositCommission
      
      this.generateChart()
    })
    
  }

  generateChart() {
    /*
    const comp = this
    const options = {
      width: this.width,
      //height: this.height,

      fetch(entry) {
        return entry.gain
      },

      onmousemove(event, datapoint) {
        const svg = findClosest(event.target, 'svg')
        const tooltip = svg.nextElementSibling

        const pos = comp.data.map(i => { return i.date }).indexOf(datapoint.date)
        const firstHalf = pos < comp.data.length / 2
        // const date = (new Date(datapoint.date)).toUTCString().replace(/^.*?, (.*?) \d{2}:\d{2}:\d{2}.*?$/, '$1')
    
    
        tooltip.style.visibility = 'visible'
        tooltip.textContent = `${(datapoint.gain * 100).toFixed(2)} %`
        tooltip.style.top = `${event.offsetY}px`
        if (firstHalf) {
          tooltip.style.left = `${event.offsetX + 20}px`
          tooltip.style.right = 'unset'
        }
        else {
          tooltip.style.left = 'unset'
          tooltip.style.right = `${comp.width - event.offsetX + 20}px`

        }
      },
    
      onmouseout() {
        const svg = findClosest(event.target, 'svg')
        const tooltip = svg.nextElementSibling
    
        tooltip.style.visibility = 'hidden'
      }
    }
    const svgEl = this.el.querySelector('.sparkline')
    svgEl.innerHTML = ''
    console.log(svgEl)
    sparkline.sparkline(svgEl, this.data, options)

    */


    let chart = am4core.create(this.chartId, am4charts.XYChart)
    chart.responsive.enabled = true
    //let interfaceColors = new am4core.InterfaceColorSet()

    //chart.data = data
    // the following line makes value axes to be arranged vertically.
    chart.leftAxesContainer.layout = 'vertical'
    
    // uncomment this line if you want to change order of axes
    //chart.bottomAxesContainer.reverseOrder = true
    
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0
    dateAxis.renderer.ticks.template.length = 8
    dateAxis.renderer.ticks.template.strokeOpacity = 0.1
    dateAxis.renderer.grid.template.disabled = true
    dateAxis.renderer.ticks.template.disabled = false
    dateAxis.renderer.ticks.template.strokeOpacity = 0.2
    
    var dateAxis2 = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis2.renderer.grid.template.location = 0
    //dateAxis2.renderer.minGridDistance = 40
    dateAxis2.renderer.labels.template.disabled = true
    dateAxis2.renderer.grid.template.disabled = true
    dateAxis2.renderer.tooltip.disabled = true
    
    // these two lines makes the axis to be initially zoomed-in
    //dateAxis.start = 0.7
    //dateAxis.keepSelection = true
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip.disabled = true
    valueAxis.zIndex = 1
    valueAxis.renderer.baseGrid.disabled = true
    
    // Set up axis
    valueAxis.renderer.inside = true
    valueAxis.height = am4core.percent(60)
    valueAxis.renderer.labels.template.verticalCenter = 'bottom'
    valueAxis.renderer.labels.template.padding(2,2,2,2)
    //valueAxis.renderer.maxLabelPosition = 0.95
    valueAxis.renderer.fontSize = '0.8em'
    
    // uncomment these lines to fill plot area of this axis with some color
    //valueAxis.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground')
    //valueAxis.renderer.gridContainer.background.fillOpacity = 0.05
    
    
    let series = chart.series.push(new am4charts.LineSeries())
    series.data = this.dailyGains.map(i => {
      i.gain = Number((i.gain * 10).toFixed(2))
      return i
    })
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'gain'
    series.tooltipText = '{valueY.value}'
    series.name = 'Series 1'
    series.fill = am4core.color('#53be7f')
    series.stroke = am4core.color('#53be7f')
    series.fillOpacity = 0.1
    series.strokeWidth = 2
    series.tooltipText = 'Gain: [bold]{valueY}[/]%'
    series.tooltip.background.fill = am4core.color('#efefef')
    
    let range = valueAxis.createSeriesRange(series)
    range.value = 0
    range.endValue = -99999
    range.contents.stroke = am4core.color('#da0835')
    range.contents.fill = am4core.color('#da0835')
    range.contents.fillOpacity = 0.1
    range.contents.tooltip.background.fill = am4core.color('#efefef')
    
    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis2.tooltip.disabled = true
    
    // this makes gap between panels
    valueAxis2.marginTop = 30
    valueAxis2.renderer.baseGrid.disabled = true
    valueAxis2.renderer.inside = true
    valueAxis2.height = am4core.percent(40)
    valueAxis2.zIndex = 3
    valueAxis2.renderer.labels.template.verticalCenter = 'bottom'
    valueAxis2.renderer.labels.template.padding(2,2,2,2)
    //valueAxis2.renderer.maxLabelPosition = 0.95
    valueAxis2.renderer.fontSize = '0.8em'
    
    // uncomment these lines to fill plot area of this axis with some color
    // valueAxis2.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground')
    // valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05
    
    let series2 = chart.series.push(new am4charts.ColumnSeries())
    series2.data = this.monthlyGains.map(i => {
      i.gain = Number((i.gain * 10).toFixed(2))
      return i
    })
    //series2.columns.template.width = am4core.percent(50)
    series2.dataFields.dateX = 'date'
    series2.dataFields.valueY = 'gain'
    series2.yAxis = valueAxis2
    series2.xAxis = dateAxis2
    series2.tooltipText = '{valueY.value}'
    series2.name = 'Series 2'
    series2.fill = am4core.color('#94d8bd')
    series2.fillOpacity = .6
    series2.strokeWidth = 0
    series2.tooltipText = `{dateX.formatDate('MMMM')}\nGain: [bold]{valueY}[/]%`
    
    series2.columns.template.adapter.add('fill', function(_, target) {
      if (target.dataItem && (target.dataItem['valueY'] < 0)) {
        return am4core.color('#da0835')
      }
      else {
        return am4core.color('#53be7f')
      }
    })
    
    chart.cursor = new am4charts.XYCursor()
    chart.cursor.xAxis = dateAxis
    
    /*
    let scrollbarX = new am4charts.XYChartScrollbar()
    scrollbarX.series.push(series)
    scrollbarX.marginBottom = 20
    chart.scrollbarX = scrollbarX
    */
  }

  render() {
    console.info('render')
    const className = classNames(
      'pt-widget-page',
      {
        'my-class': true,
      },
      //this.class && this.class.replace('hydrated', '')
    )
    return <div class={className}>
      <div class="widget--numbers">
        <div class="row small">
          <div class="cell">
            <strong class="widget--numbers--header">Performance Fee</strong>
            <em class="widget--numbers--value">{this.performanceFee * 100} <span>%</span></em>
          </div>
          <div class="cell">
            <strong class="widget--numbers--header">Management Fee</strong>
            <em class="widget--numbers--value">{this.managementFee * 100} <span>%</span></em>
          </div>
          <div class="cell">
            <strong class="widget--numbers--header">Front Fee</strong>
            <em class="widget--numbers--value">{this.depositCommission * 100} <span>%</span></em>
          </div>
        </div>
        <div class="row big">
          <div class="cell main">
            <strong class="widget--numbers--header">Gain</strong>
            <em class="widget--numbers--value">{this.gain} <span>%</span></em>
          </div>
          <div class="cell">
            <strong class="widget--numbers--header">OpenPL</strong>
            <em class="widget--numbers--value">{this.openPl} <span>%</span></em>
          </div>
          <div class="cell">
            <strong class="widget--numbers--header">Min. Deposit</strong>
            {this.currency.map(c =>
              <em class="widget--numbers--value">{this.minimalDeposit[c]} <span>{c}</span></em>
            )}
          </div>
          <div class="cell">
            <strong class="widget--numbers--header">CapitalGuard</strong>
            <em class="widget--numbers--value">{this.capitalGuard * 100} <span>%</span></em>
          </div>
        </div>
      </div>
      <div id={this.chartId} class='chartdiv'></div>

    </div>
  }
  
}
