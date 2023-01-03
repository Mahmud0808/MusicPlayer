new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      thumbPos: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Mekanın Sahibi",
          artist: "Norm Ender",
          cover: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/img/cover-1.jpg",
          source: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/mp3/music-1.mp3",
          url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
          favorited: false
        },
        {
          name: "Everybody Knows",
          artist: "Leonard Cohen",
          cover: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/img/cover-2.jpg",
          source: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/mp3/music-2.mp3",
          url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
          favorited: false
        },
        {
          name: "Extreme Ways",
          artist: "Moby",
          cover: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/img/cover-3.jpg",
          source: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/mp3/music-3.mp3",
          url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
          favorited: false
        },
        {
          name: "Butterflies",
          artist: "Sia",
          cover: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/img/cover-4.jpg",
          source: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/mp3/music-4.mp3",
          url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
          favorited: false
        },
        {
          name: "The Final Victory",
          artist: "Haggard",
          cover: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/img/cover-5.jpg",
          source: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/mp3/music-5.mp3",
          url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
          favorited: false
        },
        {
          name: "Genius ft. Sia, Diplo, Labrinth",
          artist: "LSD",
          cover: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/img/cover-6.jpg",
          source: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/mp3/music-6.mp3",
          url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
          favorited: false
        },
        {
          name: "The Comeback Kid",
          artist: "Lindi Ortega",
          cover: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/img/cover-7.jpg",
          source: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/mp3/music-7.mp3",
          url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
          favorited: false
        },
        {
          name: "Overdose",
          artist: "Grandson",
          cover: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/img/cover-8.jpg",
          source: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/mp3/music-8.mp3",
          url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
          favorited: false
        },
        {
          name: "Rag'n'Bone Man",
          artist: "Human",
          cover: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/img/cover-9.jpg",
          source: "https://raw.githubusercontent.com/Mahmud0808/MusicPlayer/main/mp3/music-9.mp3",
          url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.thumbPos = (width == 0 ? width : (width == 100 ? width : width - 1)) + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60) || 0;
      let dursec = Math.floor(this.audio.duration - durmin * 60) || 0;
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.thumbPos = (percentage == 0 ? percentage : (percentage == 100 ? percentage : percentage - 1)) + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      if (this.isTimerPlaying)
        this.audio.play();
    },
    clickProgress(e) {
      if (this.isTimerPlaying)
        this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.thumbPos = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function () {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});