const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')


const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
          name: "Tanjiro no Uta",
          singer: "Go Shiina, Nami Nakagawa",
          path: "music/tanjiro_no_uta.mp3",
          image: "image/Tanjiro_Nezuko.jpg"
        },
        {
          name: "Rengoku Theme",
          singer: "Ufotable",
          path: "music/rengoku.mp3",
          image:
            "image/Rengoku.jpg"
        },
        {
          name: "Uzui Tengen vs Gyutarou Theme",
          singer: "Ufotable",
          path:
            "music/tengen_gyutarou.mp3",
          image: "image/tengen vs gyutarou.jpg"
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
            "image/Zoe Hakuten.jpg"
        },
        {
          name: "Akeboshi (Opening demon slayer ss2)",
          singer: "LiSa",
          path: "music/akeboshi.mp3",
          image:
            "image/mugen train.jpg"
        },
        {
          name: "Kizuna No Kiseki (Opening demon slayer ss3)",
          singer: "Ufotable",
          path: "music/kizuna no kiseki.mp3",
          image:
            "image/demon slayer ss3.jpg"
        }
      ],
    render: function() {
        const htmls = this.songs.map(song => {
          return `<div class="song">
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
        $('.playlist').innerHTML = htmls.join('')
    }, // render ra view

    defineProperties: function() {
      Object.defineProperty(this, 'currentSong', {
        get: function() {
          return this.songs[this.currentIndex]
        }
      })
    },

    

    handleEvents: function() {
      const _this = this
      const cdWidth = cd.offsetWidth // 200px

      // Xử lý phóng to/thu nhỏ CD
      document.onscroll = function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const newcdWidth = cdWidth - scrollTop
        cd.style.width = newcdWidth > 0 ? newcdWidth : 0
        cd.style.opacity = newcdWidth/cdWidth
      }
      // Xử lý khi click play
      playBtn.onclick = function() {
        if (_this.isPlaying) {
          _this.isPlaying = false
          audio.pause()
          player.classList.remove('playing')
        } else {
          _this.isPlaying = true
          audio.play()
          player.classList.add('playing')
        }
      }     
    },

    loadCurrentSong: function() {
      heading.textContent = this.currentSong.name
      cdThumb.style.backgroundImage = `${this.currentSong.image}`
      audio.src = this.currentSong.path
      
    },

    start: function() {
        // Định nghĩa các thuộc tính
        this.defineProperties()

        // Lắng nghe / xử lý các sự kiện
        this.handleEvents()

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // Render playlist
        this.render()
 
    }
}

app.start()
