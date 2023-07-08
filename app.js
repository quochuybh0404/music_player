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

      // Xử lý CD quay/dừng
      const cdThumbAnimate = cdThumb.animate([
        {transform: 'rotate(360deg)'}
      ], {
        duration: 10000, // 10 seconds
        iterations: Infinity
      })

      cdThumbAnimate.pause()

      // Xử lý phóng to/thu nhỏ CD
      document.onscroll = function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const newcdWidth = cdWidth - scrollTop
        cd.style.width = newcdWidth > 0 ? newcdWidth : 0
        cd.style.opacity = newcdWidth/cdWidth
      }
      // Xử lý khi click play
      playBtn.onclick = function() {
        if(_this.isPlaying) {
          audio.pause()
        } else {
          audio.play()

          const getItem = localStorage.getItem(PLAYER_STORAGE_KEY);
          if(getItem) {
            const object = JSON.parse(getItem)
            const savedLocation = object.currentTime
            audio.currentTime = savedLocation/100 * audio.duration
            audio.play()
          }
        }
      }

      // Khi bài hát được play
      audio.onplay = function() {
        _this.isPlaying = true
        player.classList.add('playing')
        cdThumbAnimate.play()
        _this.setConfig('musicIndex', _this.currentIndex)

        
      }

      // Khi bài hát bị pause
      audio.onpause = function() {
        _this.isPlaying = false
        player.classList.remove('playing')
        cdThumbAnimate.pause()
      }

      // Khi tiến độ bài hát thay đổi
      audio.ontimeupdate = function() {
        if (audio.duration) {
          // const progressPercent = Math.floor(audio.currentTime/audio.duration *100)
          // progress.value = progressPercent
          progress.value = audio.currentTime/audio.duration *100
          _this.setConfig('currentTime', progress.value)
        }
        
      }

      progress.onmousedown = function() {
        audio.ontimeupdate = null
      }

      progress.onmouseup = function() {
        audio.ontimeupdate = function() {
          if (audio.duration) {
            // const progressPercent = Math.floor(audio.currentTime/audio.duration *100)
            // progress.value = progressPercent
            progress.value = audio.currentTime/audio.duration *100
          }
          
        }
      }
      
      // Xử lý khi tua bài hát
      progress.onchange = function() {
        const seekTime = progress.value * audio.duration / 100
        audio.currentTime = seekTime

        // Sau khi tua thì tiếp tục hiển thời gian chạy
        audio.ontimeupdate = function() {
          if (audio.duration) {
            // const progressPercent = Math.floor(audio.currentTime/audio.duration *100)
            // progress.value = progressPercent
            progress.value = audio.currentTime/audio.duration *100
            _this.setConfig('currentTime', progress.value)
          }
        }
      }

      // Khi next bài hát
      nextBtn.onclick = function() {
        if(_this.isRandom) {
          _this.randomSong()
        } else {
          _this.nextSong()
          
        }
        audio.play()
        _this.render()
        _this.scrollToActiveSong()
      }

      prevBtn.onclick = function() {
        if(_this.isRandom) {
          _this.randomSong()
        } else {
        _this.prevSong()
        }
        audio.play()
        _this.render()
        _this.scrollToActiveSong()
      }

      // Xử lý bật/tắt random song
      randomBtn.onclick = function() {
        
        _this.isRandom = !_this.isRandom
        _this.setConfig('isRandom', _this.isRandom)
        randomBtn.classList.toggle('active', _this.isRandom) 
      }

      // Xử lý lặp lại một bài hát
      repeatBtn.onclick = function() {
        _this.isRepeat = !_this.isRepeat
        _this.setConfig('isRepeat', _this.isRepeat) 

        repeatBtn.classList.toggle('active', _this.isRepeat)
      }

      // Xử lý next song khi audio ended
      audio.onended = function() {
        if(_this.isRepeat) {
          audio.play()
          const getItem = localStorage.getItem(PLAYER_STORAGE_KEY);
          
        } else {
          nextBtn.click()
        }
      }

      // Lắng nghe hành vi click vào playlist
      playlist.onclick = function(e) {
        // Xử lý khi click vào bài hát
        const songNode = e.target.closest('.song:not(.active)')
        if (songNode && !e.target.closest('.option')) {
          // var getIndex =  songNode.getAttribute('data-index')  // --- Cách 1 ---

          var getIndex =  Number(songNode.dataset.index) // --- Cách 2 ---
          _this.currentIndex = getIndex
          _this.loadCurrentSong()
          _this.render()
          audio.play()
        }
      }
      
    },

    loadCurrentSong: function() {
      heading.textContent = this.currentSong.name
      cdThumb.style.backgroundImage = `${this.currentSong.image}`
      audio.src = this.currentSong.path
      
    },
    
    loadConfig: function() {
      this.isRandom = this.config.isRandom
      this.isRepeat = this.config.isRepeat
      // this.currentIndex = this.config.musicIndex
      // progress.value = this.config.currentTime
      
    },

        nextSong: function() {
      this.currentIndex++
      if(this.currentIndex >= this.songs.length) {
        this.currentIndex = 0
      }
      
      this.loadCurrentSong()
    },

    prevSong: function() {
      this.currentIndex--
      if(this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1
      }
      this.loadCurrentSong()
    },

    
    randomSong: function() {
      // Xử lý để khi click phát ngẫu nhiên sẽ ko bị lặp trúng bài vừa phát và ko lặp lại khi chưa hết danh sách bài hát
      // Chỉ lặp lại khi đã hết danh sách bài hát
      
      let randomIndex
      do {
        do {
          randomIndex = Math.floor(Math.random() * this.songs.length)  
        } while (randomIndex === this.currentIndex) 
        this.currentIndex = randomIndex
      } while (this.musicPlayed.includes(this.currentIndex))
  
      this.musicPlayed.push(this.currentIndex)
      this.loadCurrentSong()
      console.log(this.musicPlayed)
      if (this.musicPlayed.length === this.songs.length ) {
        this.musicPlayed = []
      }
      
    },

    scrollToActiveSong: function() {
      setTimeout(() => {
        $('.song.active').scrollIntoView({
          behavior: "smooth",
          block: "end", 
          
        })
      }, 200)
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
