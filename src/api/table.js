
const list = {
  '餐饮':
    [
      { city: '广州市', district: '番禺区', name: '长隆酒店(广州长隆野生动物世界店)', location: '番禺区番禺大道长隆旅游度假区内 ', type: '豪华型（5星）', amount: 1500, score: 'success' },
      { city: '广州市', district: '天河区', name: '美豪丽致酒店(广州五羊新城店)', location: '越秀区五羊新城寺右新马路93号 ', type: '高档型（4星）', amount: 261, score: 'success' },
      { city: '广州市', district: '番禺区', name: '维也纳酒店(广州汉溪长隆地铁站店)', location: '番禺区大石植村工业四路15号 ', type: '高档型（4星）', amount: 200, score: 'danger' },
      { city: '广州市', district: '白云区', name: '广州公爵酒店(新白云国际机场二店)', location: '白云区人和镇矮岗大路口东三巷11号 ', type: '舒适型（3星）', amount: 90, score: 'danger' },
      { city: '广州市', district: '花都区', name: '碧桂园空港凤凰酒店(广州新白云机场店)', location: '花都区机场大道北花安中路1号 ', type: '豪华型（5星）', amount: 284, score: 'warning' },
      { city: '广州市', district: '荔湾区', name: '广州白天鹅宾馆', location: '荔湾区沙面南街1号 ', type: '豪华型（5星）', amount: 520, score: 'success' },
      { city: '广州市', district: '花都区', name: '桔子水晶广州白云机场酒店', location: '花都区迎宾大道163号 ', type: '高档型（4星）', amount: 109, score: 'warning' },
      { city: '广州市', district: '番禺区', name: '维多利亚公寓(广州南站店)', location: '番禺区石壁街石洲中路138号奥园越时代大厦 ', type: '舒适型（3星）', amount: 128, score: 'success' },
      { city: '广州市', district: '花都区', name: '广州白云机场桔子水晶酒店', location: '花都区迎宾大道163号', type: '高档型（4星）', amount: 109, score: 'success' },
      { city: '广州市', district: '花都区', name: '广州白云机场铂尔曼大酒店', location: '花都区空港酒店路1号 ', type: '豪华型（5星）', amount: 578, score: 'success' },
      { city: '广州市', district: '从化区', name: '广州碧泉空中温泉大酒店', location: '从化区温泉镇温泉东路76号 ', type: '豪华型（5星）', amount: 321, score: 'success' },
      { city: '广州市', district: '天河区', name: '广州粤海喜来登酒店', location: '天河区天河路208号 ', type: '豪华型（5星）', amount: 445, score: 'success' },
      { city: '广州市', district: '越秀区', name: '广州白云宾馆', location: '越秀区环市东路367号 ', type: '豪华型（5星）', amount: 588, score: 'success' },
      { city: '广州市', district: '白云区', name: '广州白云机场航湾澳斯特精选酒店', location: '白云区白云国际机场南工作区空港三路与横二路交汇 ', type: '高档型（4星）', amount: 120, score: 'success' },
      { city: '广州市', district: '天河区', name: '广州四季酒店', location: '天河区珠江新城珠江西路5号  ', type: '豪华型（5星）', amount: 344, score: 'success' },
      { city: '广州市', district: '天河区', name: '广州丽柏国际酒店', location: '天河区龙口东横街28号中辉广场 ', type: '高档型（4星）', amount: 340, score: 'success' },
      { city: '广州市', district: '越秀区', name: '星伦国际公寓(广州北京路店)', location: '越秀区东沙角路16号 ', type: '高档型（4星）', amount: 98, score: 'success' },
      { city: '广州市', district: '白云区', name: '壹加壹精品酒店(广州新白云国际机场店)', location: '白云区人和镇矮岗北街东六巷2号 ', type: '经济型（2星）', amount: 78, score: 'success' },
      { city: '广州市', district: '番禺区', name: '广州长隆熊猫酒店', location: '番禺区番禺大道长隆旅游度假区内 ', type: '豪华型（5星）', amount: 1500, score: 'success' },
      { city: '广州市', district: '天河区', name: '广州珠江新城希尔顿欢朋酒店', location: '天河区黄埔大道西495号 ', type: '高档型（4星）', amount: 223, score: 'success' }
    ],
  '网吧': [
    { city: '广州市', district: ' 海珠区', name: ' 蓝星网吧', location: '  赤岗路24号' },
    { city: '广州市', district: ' 天河区', name: ' 大显身手网咖', location: '  中山大道11号' },
    { city: '广州市', district: ' 花都区', name: ' 创世纪网络会所', location: ' 丰盛街2-38' },
    { city: '广州市', district: ' 增城区', name: ' 大威电竞网咖', location: '  夏街大道23号' },
    { city: '广州市', district: ' 花都区', name: ' 新友域网络网吧', location: ' 凤华路17-1号' },
    { city: '广州市', district: ' 增城区', name: ' 海日网咖', location: '  新塘镇解放北路115号地王广场' },
    { city: '广州市', district: ' 海珠区', name: ' 禧年华网咖', location: ' 基立下道北街29号-2' },
    { city: '广州市', district: ' 海珠区', name: ' 弘宇网咖', location: '  侨兴路16' },
    { city: '广州市', district: ' 海珠区', name: ' 侨俊网咖', location: '  工业大道石溪村蚝壳洲东街6号' },
    { city: '广州市', district: ' 海珠区', name: ' 梦胜都网吧', location: ' 泉塘路23-2' },
    { city: '广州市', district: ' 越秀区', name: ' 兴云居网吧', location: ' 麓苑路1号' },
    { city: '广州市', district: ' 天河区', name: ' 捷宇网吧', location: '  石牌东路87号3层' },
    { city: '广州市', district: ' 海珠区', name: ' 众捷网咖', location: '  宝岗大道332号2层' },
    { city: '广州市', district: ' 天河区', name: ' 艳艳网吧', location: '  中山大道182号A栋101-102之9' },
    { city: '广州市', district: ' 越秀区', name: ' 较场网咖', location: '  东华西路189号2层' },
    { city: '广州市', district: ' 天河区', name: ' 天一网吧', location: '  天一新村东莞庄路120号天一广场2层' },
    { city: '广州市', district: ' 天河区', name: ' 阳光网咖', location: '  员村南街167号附近' },
    { city: '广州市', district: ' 海珠区', name: ' 飞宇网咖', location: '  万寿路61号' },
    { city: '广州市', district: ' 海珠区', name: ' 拓天网吧', location: '  工业大道北43号' },
    { city: '广州市', district: ' 增城区', name: ' 风速网咖', location: '  沙园路12号2层' },

  ]
}

export function getDemoList(city, type) {
  let data = null
  if (city === '广州市') {
    if (list[type]) {
      data = list[type]
    }
  }
  return Promise.resolve({ data: data })
}
