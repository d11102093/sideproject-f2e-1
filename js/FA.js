// delicaey
const hotDelicaeyImg = document.querySelectorAll('.hotDelicaey-contain li img')
const hotDelicaeyName = document.querySelectorAll('.hotDelicaey-contain p')
const hotDelicaeyAddress = document.querySelectorAll('.hotDelicaey-block span')

const hotDelicaeyContain = document.querySelector('.hotDelicaey-contain')

// Accommodation
const hotAccommodationImg = document.querySelectorAll(
  '.hotAccommodation-contain li img',
)
const hotAccommodationName = document.querySelectorAll(
  '.hotAccommodation-contain p',
)
const hotAccommodationAddress = document.querySelectorAll(
  '.hotAccommodation-block span',
)
const hotAccommodationContain = document.querySelector(
  '.hotAccommodation-contain',
)

axios
  .get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=10&$format=JSON
    `,
    {
      headers: getAuthorizationHeader(),
    },
  )
  .then(function (response) {
    let str = ''
    let img = ''
    response.data.forEach((item) => {
      // 檢查有無照片
      if (item.Picture.PictureUrl1 != undefined) {
        img = item.Picture.PictureUrl1
      } else {
        img = 'img/noImage.png'
      }

      str += `<li>
      <img src=${img} alt="noImg" />
      <p>${item.Name}</p>
      <div class="hotDelicaey-block">
        <i class="fas fa-map-marker-alt"></i><span>${item.Address}</span>
      </div>
    </li>`
    })
    hotDelicaeyContain.innerHTML = str
  })
  .catch(function (error) {
    console.log(error)
  })

axios
  .get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?$top=10&$format=JSON
    `,
    {
      headers: getAuthorizationHeader(),
    },
  )
  .then(function (response) {
    let str = ''
    let img = ''
    response.data.forEach((item) => {
      // 檢查有無照片
      if (item.Picture.PictureUrl1 != undefined) {
        img = item.Picture.PictureUrl1
      } else {
        img = 'img/noImage.png'
      }

      str += `<li>
        <img src=${img} alt="noImg" />
        <p>${item.Name}</p>
        <div class="hotAccommodation-block">
          <i class="fas fa-map-marker-alt"></i><span>${item.Address}</span>
        </div>
      </li>`
    })
    hotAccommodationContain.innerHTML = str
  })
  .catch(function (error) {
    console.log(error)
  })

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  // let AppID = '9d5eccb4-ca4a-4f97-b829-7fa73264f550'
  // let AppKey = '0oBJLHiS-raca-0HT6-omY8-K6imx7Q'
  let AppID = '9d5eccb4ca4a4f97b8297fa73264f550'
  let AppKey = '0oBJLHiSraca0HT6omY8K6imx7Q'
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString()
  let ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  let HMAC = ShaObj.getHMAC('B64')
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"'
  return { Authorization: Authorization, 'X-Date': GMTString }
}
