export const mapConfig = {
  global: {
    mapStyle: 'amap://styles/normal',
    zoom: 7,
    depth: 1,
    resizeEnable: false,
    scrollWheel: false
  }
}

export const mapStyles = {
  fillColor: '#cdedf9',
  fillHoverColor: '#429ee9',
  strokeColor: '#fff',
  areaNodeColors: [
    '#3366cc',
    '#dc3912',
    '#ff9900',
    '#109618',
    '#990099',
    '#0099c6',
    '#dd4477',
    '#66aa00'
  ],
  areaNodeStyle: {
    cursor: 'default',
    bubble: true,
    strokeColor: 'white',
    fillColor: null,
    strokeWeight: 2
  },
  subAreaNodeStyle: {
    cursor: 'default',
    bubble: true,
    strokeOpacity: 1,
    strokeWeight: 1,
    fillOpacity: 1,
    fillColor: '#cdedf9',
    fillHoverColor: '#429ee9',
    strokeColor: '#fff',
  },
  areaNodeLabelStyle: {
    'padding-left': '8px',
    'padding-right': '8px',
    'height': '14px',
    'line-height': '14px',
    'text-align': 'center',
    'font-size': '9px',
    'color': '#727272',
    'border': 'none',
    'background-color': 'rgba(0, 0, 0, 0)'
  }

}
