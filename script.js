function gameApp() {
  return {
    age: 0,
    
    // Starting Logs with FontAwesome icons
    eventLog: [
      { id: 1, text: '<i class="fa-solid fa-baby text-gray-500 mr-2"></i> You were born in Mexico.' },
      { id: 2, text: 'Your name is Jack Misano.' },
      { id: 3, text: 'You are a male.' },
      { id: 4, text: '<i class="fa-solid fa-house text-gray-500 mr-2"></i> You were born into an average family.' }
    ],

    // Stats updated to use FontAwesome instead of emojis
    stats: [
      { name: 'Happiness', icon: '<i class="fa-solid fa-face-smile text-green-600"></i>', value: 64, colorClass: 'bg-[#5CB85C]' },
      { name: 'Health',    icon: '<i class="fa-solid fa-heart-pulse text-red-500"></i>', value: 86, colorClass: 'bg-[#5CB85C]' },
      { name: 'Smarts',    icon: '<i class="fa-solid fa-lightbulb text-yellow-500"></i>', value: 79, colorClass: 'bg-[#5CB85C]' },
      { name: 'Looks',     icon: '<i class="fa-solid fa-fire text-orange-500"></i>', value: 40, colorClass: 'bg-[#F0AD4E]' }
    ],
    
    advanceYear() {
      this.age++;
      
      this.eventLog.push({ 
        id: Date.now(), 
        text: `<i class="fa-solid fa-cake-candles text-gray-500 mr-2"></i> Age ${this.age} – Another year has passed.` 
      });

      this.stats.forEach(stat => {
        let change = Math.floor(Math.random() * 11) - 5; 
        stat.value = Math.max(0, Math.min(100, stat.value + change)); 
        
        if (stat.value > 50) stat.colorClass = 'bg-[#5CB85C]';
        else if (stat.value > 25) stat.colorClass = 'bg-[#F0AD4E]';
        else stat.colorClass = 'bg-[#D9534F]';
      });

      this.$nextTick(() => {
        const container = this.$refs.logScroll;
        container.scrollTop = container.scrollHeight;
      });
    }
  };
}