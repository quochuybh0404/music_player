const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'DEMON_SLAYER'

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    musicPlayed : [0],
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
      {
        name: "Tanjiro no Uta",
        singer: "Go Shiina, Nami Nakagawa",
        path: "music/tanjiro_no_uta.mp3",
        image: "image/Tanjiro_Nezuko.jpg"
      },
      {
        name: "Akeboshi (Opening demon slayer ss2)",
        singer: "LiSa",
        path: "music/akeboshi.mp3",
        image:
          "image/mugen train.jpg"
      },
      {
        name: "Rengoku Theme",
        singer: "Ufotable",
        path: "music/rengoku.mp3",
        image:
          "image/Rengoku.jpg"
      },
      {
        name: "Akaza vs Rengoku Theme",
        singer: "Ufotable",
        path: "music/rengoku_vs_akaza.mp3",
        image:
          "image/rengoku vs akaza.jpg"
      },
      {
        name: "Akaza vs Rengoku Final Battle Theme",
        singer: "Ufotable",
        path: "music/kyojuro_rengoku_vs_akaza_sunrise.mp3",
        image:
          "image/rengoku vs akaza 2.jpg"
      },
      {
        name: "Rengoku's Death",
        singer: "Ufotable",
        path: "music/rengoku_lastest_ost.mp3",
        image:
          "image/rengoku last smile.jpg"
          
      },
      {
        name: "Uzui Tengen vs Gyutarou Theme",
        singer: "Ufotable",
        path:
          "music/tengen_gyutarou.mp3",
        image: "image/tengen vs gyutarou.jpg"
      },
      {
        name: "Asa Ga Kuru (Ending demon slayer ss2 entertainment district)",
        singer: "Aimer",
        path: "music/asa ga kuru.mp3",
        image:
          "image/entertainment disctrict.jpg"
      },
      {
        name: "Kizuna No Kiseki (Opening demon slayer ss3)",
        singer: "Ufotable",
        path: "music/kizuna no kiseki.mp3",
        image:
          "image/demon slayer ss3.jpg"
      },
      {
        name: "Mitsuri Theme",
        singer: "Ufotable",
        path: "music/mitsuri.mp3",
        image:
          "image/Mitsuri.jpg" 
      },
      {
        name: "Zo Hakuten Theme",
        singer: "Ufotable",
        path: "music/zohakuten.mp3",
        image:
          "image/Hakuten.jpg"
      },
      
    ],
    setConfig: function(key, value) {
      this.config[key] = value
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
          return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index=${index}>
          <div class="thumb" style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>`      
        })
        playlist.innerHTML = htmls.join('')
    }, // render ra view

    defineProperties: function() {
      Object.defineProperty(this, 'currentSong', {
        get: function() {
          return this.songs[this.currentIndex]
        }
      })
    },



    loadCurrentSong: function() {
    
      // heading.textContent = this.currentSong.name
      // cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`
      // audio.src = this.currentSong.path

        console.log(this.currentSong)

    },

    
    

    start: function() {
        // Gắn cấu hình từ config vào ứng dụng
        // this.loadConfig()

        // Định nghĩa các thuộc tính
        // this.defineProperties()

        // Lắng nghe / xử lý các sự kiện
        // this.handleEvents()

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // Render playlist
        // this.render()

        // Hiển thị trạng thái ban đầu của button repeat & random
        // randomBtn.classList.toggle('active', this.isRandom) 
        // repeatBtn.classList.toggle('active', this.isRepeat)

        // this.musicPlayed[0] = this.config.musicIndex       
        
        // this.playFromSavedPosition()
    }
}
app.start()
