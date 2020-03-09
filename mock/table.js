const checklist = [
  { city: '广州市', district: '番禺区', name: '长隆酒店(广州长隆野生动物世界店)', location: '番禺区番禺大道长隆旅游度假区内 ', type: '豪华型（5星）', amount: 1500 },
  { city: '广州市', district: '天河区', name: '美豪丽致酒店(广州五羊新城店)', location: '越秀区五羊新城寺右新马路93号 ', type: '高档型（4星）', amount: 261 },
  { city: '广州市', district: '番禺区', name: '维也纳酒店(广州汉溪长隆地铁站店)', location: '番禺区大石植村工业四路15号 ', type: '高档型（4星）', amount: 200 },
  { city: '广州市', district: '白云区', name: '广州公爵酒店(新白云国际机场二店)', location: '白云区人和镇矮岗大路口东三巷11号 ', type: '舒适型（3星）', amount: 90 },
  { city: '广州市', district: '花都区', name: '碧桂园空港凤凰酒店(广州新白云机场店)', location: '花都区机场大道北花安中路1号 ', type: '豪华型（5星）', amount: 284 },
  { city: '广州市', district: '荔湾区', name: '广州白天鹅宾馆', location: '荔湾区沙面南街1号 ', type: '豪华型（5星）', amount: 520 },
  { city: '广州市', district: '花都区', name: '桔子水晶广州白云机场酒店', location: '花都区迎宾大道163号 ', type: '高档型（4星）', amount: 109 },
  { city: '广州市', district: '番禺区', name: '维多利亚公寓(广州南站店)', location: '番禺区石壁街石洲中路138号奥园越时代大厦 ', type: '舒适型（3星）', amount: 128 },
  { city: '广州市', district: '花都区', name: '广州白云机场桔子水晶酒店', location: '花都区迎宾大道163号', type: '高档型（4星）', amount: 109 },
  { city: '广州市', district: '花都区', name: '广州白云机场铂尔曼大酒店', location: '花都区空港酒店路1号 ', type: '豪华型（5星）', amount: 578 },
  { city: '广州市', district: '从化区', name: '广州碧泉空中温泉大酒店', location: '从化区温泉镇温泉东路76号 ', type: '豪华型（5星）', amount: 321 },
  { city: '广州市', district: '天河区', name: '广州粤海喜来登酒店', location: '天河区天河路208号 ', type: '豪华型（5星）', amount: 445 },
  { city: '广州市', district: '越秀区', name: '广州白云宾馆', location: '越秀区环市东路367号 ', type: '豪华型（5星）', amount: 588 },
  { city: '广州市', district: '白云区', name: '广州白云机场航湾澳斯特精选酒店', location: '白云区白云国际机场南工作区空港三路与横二路交汇 ', type: '高档型（4星）', amount: 120 },
  { city: '广州市', district: '天河区', name: '广州四季酒店', location: '天河区珠江新城珠江西路5号  ', type: '豪华型（5星）', amount: 344 },
  { city: '广州市', district: '天河区', name: '广州丽柏国际酒店', location: '天河区龙口东横街28号中辉广场 ', type: '高档型（4星）', amount: 340 },
  { city: '广州市', district: '越秀区', name: '星伦国际公寓(广州北京路店)', location: '越秀区东沙角路16号 ', type: '高档型（4星）', amount: 98 },
  { city: '广州市', district: '白云区', name: '壹加壹精品酒店(广州新白云国际机场店)', location: '白云区人和镇矮岗北街东六巷2号 ', type: '经济型（2星）', amount: 78 },
  { city: '广州市', district: '番禺区', name: '广州长隆熊猫酒店', location: '番禺区番禺大道长隆旅游度假区内 ', type: '豪华型（5星）', amount: 1500 },
  { city: '广州市', district: '天河区', name: '广州珠江新城希尔顿欢朋酒店', location: '天河区黄埔大道西495号 ', type: '高档型（4星）', amount: 223 }
]

export default [
  {
    url: '/checklist',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          items: checklist
        }
      }
    }
  }
]
