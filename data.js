const TRIP_DATA = {
  "food": [
    {
      "name": "山のピザ屋　ぷらてりーあ",
      "hours": "10:30～16:30",
      "tue": "×",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E5%B1%B1%E3%81%AE%E3%83%94%E3%82%B6%E5%B1%8B%E3%80%80%E3%81%B7%E3%82%89%E3%81%A6%E3%82%8A%E3%83%BC%E3%81%82",
      "photo": {
        "image": "https://www.ohk.co.jp/cgi-image/5957/5957_KGdJEMnrRqbkgGFlWayAyIdgenfTKsDmSnSSmRCLpaXcDoWwkt.jpg",
        "source": "https://www.ohk.co.jp/data/4534/pages/",
        "credit": "OHK 岡山放送",
        "alt": "山のピザ屋　ぷらてりーあの写真",
        "src": "assets/photos/place-01.jpg"
      }
    },
    {
      "name": "湯原ヨーグルト",
      "hours": "10:00～17:00",
      "tue": "〇",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E6%B9%AF%E5%8E%9F%E3%83%A8%E3%83%BC%E3%82%B0%E3%83%AB%E3%83%88",
      "photo": {
        "image": "https://yubara-yogurt.com/images/lineup.jpg",
        "source": "https://yubara-yogurt.com/",
        "credit": "湯原ヨーグルト 公式サイト",
        "alt": "湯原ヨーグルトの写真",
        "src": "assets/photos/place-02.jpg"
      }
    },
    {
      "name": "久本精肉店",
      "hours": "9:00～19:00",
      "tue": "〇",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E4%B9%85%E6%9C%AC%E7%B2%BE%E8%82%89%E5%BA%97",
      "photo": {
        "image": "https://www.maniwa.or.jp/upload/spot/3237/img_1.jpg",
        "source": "https://www.maniwa.or.jp/web/?c=spot-2&pk=3237",
        "credit": "真庭観光WEB",
        "alt": "久本精肉店の写真",
        "src": "assets/photos/place-03.jpg"
      }
    },
    {
      "name": "ほわっふる",
      "hours": "9:00～18:00",
      "tue": "〇",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E3%81%BB%E3%82%8F%E3%81%A3%E3%81%B5%E3%82%8B",
      "photo": {
        "image": "https://www.maniwa.or.jp/upload/spot/3720/img_1.jpg",
        "source": "https://www.maniwa.or.jp/web/?c=spot-2&pk=3720",
        "credit": "真庭観光WEB",
        "alt": "ほわっふるの写真",
        "src": "assets/photos/place-04.jpg"
      }
    }
  ],
  "spots": [
    {
      "name": "湯原温泉ミュージアム",
      "hours": "10:00～18:00",
      "tue": "×",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E6%B9%AF%E5%8E%9F%E6%B8%A9%E6%B3%89%E3%83%9F%E3%83%A5%E3%83%BC%E3%82%B8%E3%82%A2%E3%83%A0",
      "photo": {
        "image": "https://www.maniwa.or.jp/upload/spot/1497/img_1.jpg",
        "source": "https://www.maniwa.or.jp/web/?c=spot-2&pk=1497",
        "credit": "真庭観光WEB",
        "alt": "湯原温泉ミュージアムの写真",
        "src": "assets/photos/place-05.jpg"
      }
    },
    {
      "name": "はんざきセンター",
      "hours": "9:00～19:00",
      "tue": "〇",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E3%81%AF%E3%82%93%E3%81%96%E3%81%8D%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC",
      "photo": {
        "image": "https://www.maniwa.or.jp/upload/spot/2998/img_1.jpg",
        "source": "https://www.maniwa.or.jp/web/?c=spot-2&pk=2998",
        "credit": "真庭観光WEB",
        "alt": "はんざきセンターの写真",
        "src": "assets/photos/place-06.jpg"
      }
    },
    {
      "name": "はんざきアート広場",
      "hours": "7:00～21:00",
      "tue": "〇",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E6%B9%AF%E5%8E%9F%E6%B8%A9%E6%B3%89%20%E3%81%AF%E3%82%93%E3%81%96%E3%81%8D%E3%82%A2%E3%83%BC%E3%83%88%E5%BA%83%E5%A0%B4",
      "photo": {
        "image": "https://www.maniwa.or.jp/upload/spot/3734/img_1.jpg",
        "source": "https://www.maniwa.or.jp/web/?c=spot-2&pk=3734",
        "credit": "真庭観光WEB",
        "alt": "はんざきアート広場のはんざき足湯",
        "src": "assets/photos/place-07.jpg"
      }
    },
    {
      "name": "湯原ダム",
      "hours": "24時間",
      "tue": "〇",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E6%B9%AF%E5%8E%9F%E3%83%80%E3%83%A0",
      "photo": {
        "image": "https://www.pref.okayama.jp/uploaded/life/4163_3464555_img.jpg",
        "source": "https://www.pref.okayama.jp/page/detail-4163.html",
        "credit": "岡山県 湯原ダム管理事務所",
        "alt": "湯原ダムの写真",
        "src": "assets/photos/place-08.jpg"
      }
    },
    {
      "name": "下湯原温泉　ひまわり館",
      "hours": "9:00～17:00",
      "tue": "×",
      "wed": "〇（火曜祝日の翌日は×）",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E4%B8%8B%E6%B9%AF%E5%8E%9F%E6%B8%A9%E6%B3%89%E3%80%80%E3%81%B2%E3%81%BE%E3%82%8F%E3%82%8A%E9%A4%A8",
      "photo": {
        "image": "https://www.maniwa.or.jp/upload/spot/3312/img_1.jpg",
        "source": "https://www.maniwa.or.jp/web/?c=spot-2&pk=3312",
        "credit": "????WEB",
        "alt": "下湯原温泉　ひまわり館の写真",
        "src": "assets/photos/place-09.jpg"
      }
    },
    {
      "name": "広見酒店",
      "hours": "8:00～22:00",
      "tue": "〇",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E5%BA%83%E8%A6%8B%E9%85%92%E5%BA%97",
      "photo": {
        "image": "https://www.maniwa.or.jp/upload/spot/3291/img_1.jpg",
        "source": "https://www.maniwa.or.jp/web/?c=spot-2&pk=3291",
        "credit": "真庭観光WEB",
        "alt": "広見酒店の写真",
        "src": "assets/photos/place-10.jpg"
      }
    }
  ],
  "stay": [
    {
      "name": "ゆばらの宿　米屋",
      "hours": "不明",
      "tue": "不明",
      "wed": "不明",
      "type": "お宿",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E3%82%86%E3%81%B0%E3%82%89%E3%81%AE%E5%AE%BF%E3%80%80%E7%B1%B3%E5%B1%8B",
      "photo": {
        "image": "https://www.komeya.co.jp/wp-content/themes/komeya/img/index/mv-img-01.jpg",
        "source": "https://www.komeya.co.jp/",
        "credit": "ゆばらの宿 米屋 公式サイト",
        "alt": "ゆばらの宿　米屋の写真",
        "src": "assets/photos/place-11.jpg"
      }
    },
    {
      "name": "桧の湯",
      "hours": "不明",
      "tue": "不明",
      "wed": "不明",
      "type": "宿内温泉",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E3%82%86%E3%81%B0%E3%82%89%E3%81%AE%E5%AE%BF%E3%80%80%E7%B1%B3%E5%B1%8B",
      "photo": {
        "image": "https://www.komeya.co.jp/wp-content/uploads/2026/04/block-05-slider-01-1.jpg",
        "source": "https://www.komeya.co.jp/onsen/",
        "credit": "ゆばらの宿 米屋 公式サイト",
        "alt": "桧の湯の写真",
        "src": "assets/photos/place-12.jpg"
      }
    },
    {
      "name": "椿の湯",
      "hours": "不明",
      "tue": "不明",
      "wed": "不明",
      "type": "宿内温泉",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E3%82%86%E3%81%B0%E3%82%89%E3%81%AE%E5%AE%BF%E3%80%80%E7%B1%B3%E5%B1%8B",
      "photo": {
        "image": "https://www.komeya.co.jp/wp-content/uploads/2026/04/img-07.jpg",
        "source": "https://www.komeya.co.jp/onsen/",
        "credit": "ゆばらの宿 米屋 公式サイト",
        "alt": "椿の湯の写真",
        "src": "assets/photos/place-13.jpg"
      }
    },
    {
      "name": "炭籠の湯",
      "hours": "不明",
      "tue": "不明",
      "wed": "不明",
      "type": "宿内温泉",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E3%82%86%E3%81%B0%E3%82%89%E3%81%AE%E5%AE%BF%E3%80%80%E7%B1%B3%E5%B1%8B",
      "photo": {
        "image": "https://www.komeya.co.jp/wp-content/uploads/2026/04/block-01-slider-01.jpg",
        "source": "https://www.komeya.co.jp/onsen/",
        "credit": "ゆばらの宿 米屋 公式サイト",
        "alt": "炭籠の湯の写真",
        "src": "assets/photos/place-14.jpg"
      }
    },
    {
      "name": "鉄窯の湯",
      "hours": "不明",
      "tue": "不明",
      "wed": "不明",
      "type": "宿内温泉",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E3%82%86%E3%81%B0%E3%82%89%E3%81%AE%E5%AE%BF%E3%80%80%E7%B1%B3%E5%B1%8B",
      "photo": {
        "image": "https://www.komeya.co.jp/wp-content/uploads/2026/04/block-02-slider-01.jpg",
        "source": "https://www.komeya.co.jp/onsen/",
        "credit": "ゆばらの宿 米屋 公式サイト",
        "alt": "鉄窯の湯の写真",
        "src": "assets/photos/place-15.jpg"
      }
    }
  ],
  "onsen": [
    {
      "name": "砂湯",
      "hours": "24時間（清掃時間を除く）",
      "tue": "〇",
      "wed": "×",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E7%A0%82%E6%B9%AF",
      "photo": {
        "image": "https://www.maniwa.or.jp/upload/spot/8/img_1.jpg",
        "source": "https://www.maniwa.or.jp/web/?c=spot-2&pk=8",
        "credit": "真庭観光WEB",
        "alt": "砂湯の写真",
        "src": "assets/photos/place-16.jpg"
      }
    },
    {
      "name": "手湯足湯",
      "hours": "7:00～22:00",
      "tue": "〇",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E6%89%8B%E6%B9%AF%E8%B6%B3%E6%B9%AF",
      "photo": {
        "image": "https://www.maniwa.or.jp/upload/spot/3508/img_1.jpg",
        "source": "https://www.maniwa.or.jp/web/?c=spot-2&pk=3508",
        "credit": "真庭観光WEB",
        "alt": "手湯足湯の写真",
        "src": "assets/photos/place-17.jpg"
      }
    }
  ],
  "parking": [
    {
      "name": "真庭市営　湯原温泉駐車場",
      "hours": "24時間",
      "tue": "〇",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E6%B9%AF%E5%8E%9F%E6%B8%A9%E6%B3%89143-2%20%E5%B8%82%E5%96%B6%E9%A7%90%E8%BB%8A%E5%A0%B4",
      "photo": {
        "image": "https://www.arukikata.co.jp/wp-content/uploads/P8156050-thumb-730xauto-565261.jpg",
        "source": "https://www.arukikata.co.jp/tokuhain/252680/",
        "credit": "地球の歩き方 / mami",
        "alt": "真庭市営　湯原温泉駐車場の写真",
        "src": "assets/photos/place-18.jpg"
      }
    },
    {
      "name": "河川駐車場",
      "hours": "不明",
      "tue": "不明",
      "wed": "不明",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E6%B2%B3%E5%B7%9D%E9%A7%90%E8%BB%8A%E5%A0%B4",
      "photo": {
        "image": "https://www.net626.co.jp/temp/p-1.jpg",
        "source": "https://www.net626.co.jp/map1.htm",
        "credit": "プチホテルゆばらリゾート 公式サイト",
        "alt": "河川駐車場の写真",
        "src": "assets/photos/place-19.jpg"
      }
    }
  ],
  "katsuyama": [
    {
      "name": "手打ちそば　一心庵",
      "hours": "11:00～15:00頃（売り切れ次第終了）",
      "tue": "×",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E6%89%8B%E6%89%93%E3%81%A1%E3%81%9D%E3%81%B0%E3%80%80%E4%B8%80%E5%BF%83%E5%BA%B5",
      "photo": {
        "image": "https://www.maniwa.or.jp/upload/spot/3156/img_1.jpg",
        "source": "https://www.maniwa.or.jp/web/?c=spot-2&pk=3156",
        "credit": "真庭観光WEB",
        "alt": "手打ちそば　一心庵の写真",
        "src": "assets/photos/place-20.jpg"
      }
    },
    {
      "name": "御前酒蔵元",
      "hours": "10:00～17:00",
      "tue": "〇",
      "wed": "〇",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20%E5%BE%A1%E5%89%8D%E9%85%92%E8%94%B5%E5%85%83",
      "photo": {
        "image": "https://www.maniwa.or.jp/upload/spot/3009/img_1.jpg",
        "source": "https://www.maniwa.or.jp/web/?c=spot-2&pk=3009",
        "credit": "真庭観光WEB",
        "alt": "御前酒蔵元の写真",
        "src": "assets/photos/place-21.jpg"
      }
    },
    {
      "name": "gajumaru cheesecake",
      "hours": "不明",
      "tue": "不明",
      "wed": "不明",
      "map": "https://www.google.com/maps/search/?api=1&query=%E5%B2%A1%E5%B1%B1%E7%9C%8C%20%E7%9C%9F%E5%BA%AD%E5%B8%82%20gajumaru%20cheesecake",
      "photo": {
        "image": "https://www.atpress.ne.jp/releases/575928/LL_img_575928_1.jpg?format=webp&ts=1775166039",
        "source": "https://www.atpress.ne.jp/news/575928",
        "credit": "gajumaru cheesecake / @Press",
        "alt": "gajumaru cheesecakeの写真",
        "src": "assets/photos/place-22.webp"
      }
    }
  ]
};
