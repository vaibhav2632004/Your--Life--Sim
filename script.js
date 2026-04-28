function gameApp() {
  return {
    age: 0,
    isDrawerOpen: false, 
    
    eventLog: [
      { id: 1, text: '<i class="fa-solid fa-baby text-gray-500 mr-2"></i> You were born in Mexico.' },
      { id: 2, text: 'Your name is Jack Misano.' },
      { id: 3, text: 'You are a male.' },
      { id: 4, text: '<i class="fa-solid fa-house text-gray-500 mr-2"></i> You were born into an average family.' }
    ],

    // REORDERED STATS: Crucial stats are now at the top!
    detailedStats: [
      { name: 'Health',       icon: '<i class="fa-solid fa-heart-pulse"></i>',   value: 86 },
      { name: 'Strength',     icon: '<i class="fa-solid fa-dumbbell"></i>',      value: 45 },
      { name: 'Mood',         icon: '<i class="fa-solid fa-masks-theater"></i>', value: 80 },
      { name: 'Intelligence', icon: '<i class="fa-solid fa-brain"></i>',         value: 75 },
      { name: 'Discipline',   icon: '<i class="fa-solid fa-stopwatch"></i>',     value: 50 },
      { name: 'Karma',        icon: '<i class="fa-solid fa-yin-yang"></i>',      value: 60 },
      { name: 'Fame',         icon: '<i class="fa-solid fa-star"></i>',          value: 12 }
    ],

    getRingColor(value) {
      if (value > 50) return '#4ade80'; // Green
      if (value > 25) return '#fbbf24'; // Orange
      return '#f87171';                 // Red
    },
    
    advanceYear() {
      this.age++;
      
      this.eventLog.push({ 
        id: Date.now(), 
        text: `<i class="fa-solid fa-cake-candles text-gray-500 mr-2"></i> Age ${this.age} – Another year has passed.` 
      });

      this.detailedStats.forEach(stat => {
        let change = Math.floor(Math.random() * 15) - 7; 
        stat.value = Math.max(0, Math.min(100, stat.value + change)); 
      });

      this.$nextTick(() => {
        const container = this.$refs.logScroll;
        container.scrollTop = container.scrollHeight;
      });
    }
  };
}