function gameApp() {
  return {
    currentScreen: 'splash', 
    age: 0,
    isDrawerOpen: false, 
    isLeftMenuOpen: false,
    activeDepartment: null, // NEW: Tracks if Career, Wealth, etc. is open
    
    activeModal: null, 
    tempFirstName: '',      
    tempLastName: '',      

    // NEW: Loads archived lives from your browser's local storage
    archivedLives: JSON.parse(localStorage.getItem('archivedLives') || '[]'),

    character: {
      name: 'Jack Misano',
      gender: 'Male',
      country: 'Mexico',
      countryFlag: '🇲🇽', 
      appearance: 'Fair',
      talent: 'Sports',
      personality: 'Adjust Levels',
      family: 'Average Family',
      emoji: '👨🏼',
      balance: 0,
      father: '',
      mother: '',
      birthday: '',
      diseases: []
    },

    options: {
      genders: [
        { label: 'Male', emoji: '👨' },
        { label: 'Female', emoji: '👩' }
      ],
      countries: [
        { label: 'Mexico', emoji: '🇲🇽' },
        { label: 'USA', emoji: '🇺🇸' },
        { label: 'Brazil', emoji: '🇧🇷' },
        { label: 'Japan', emoji: '🇯🇵' },
        { label: 'Italy', emoji: '🇮🇹' },
        { label: 'India', emoji: '🇮🇳' },
        { label: 'UK', emoji: '🇬🇧' },
        { label: 'France', emoji: '🇫🇷' },
        { label: 'Nigeria', emoji: '🇳🇬' }
      ],
      appearances: [
        { label: 'Pale', emoji: '🧑🏻', modifier: '🏻' },
        { label: 'Fair', emoji: '🧑🏼', modifier: '🏼' },
        { label: 'Tan',  emoji: '🧑🏽', modifier: '🏽' },
        { label: 'Dark', emoji: '🧑🏾', modifier: '🏾' },
        { label: 'Deep', emoji: '🧑🏿', modifier: '🏿' }
      ],
      talents: [
        { label: 'None', emoji: '🤷' },
        { label: 'Sports', emoji: '⚽' },
        { label: 'Music', emoji: '🎸' },
        { label: 'Acting', emoji: '🎭' },
        { label: 'Coding', emoji: '💻' }
      ],
      families: [
        { label: 'Wealthy Family', emoji: '🏰', min: 1000000, max: 10000000 },
        { label: 'Average Family', emoji: '🏠', min: 10000, max: 100000 },
        { label: 'Poor Family', emoji: '⛺', min: 100, max: 1000 },
        { label: 'Orphanage', emoji: '🏢', min: 0, max: 0 }
      ]
    },

    eventLog: [], 

    detailedStats: [
      { name: 'Health',       icon: '<i class="fa-solid fa-heart-pulse"></i>',   value: 100 },
      { name: 'Strength',     icon: '<i class="fa-solid fa-dumbbell"></i>',      value: 100 },
      { name: 'Mood',         icon: '<i class="fa-solid fa-masks-theater"></i>', value: 100 },
      { name: 'Intelligence', icon: '<i class="fa-solid fa-brain"></i>',         value: 100 },
      { name: 'Discipline',   icon: '<i class="fa-solid fa-stopwatch"></i>',     value: 100 },
      { name: 'Karma',        icon: '<i class="fa-solid fa-yin-yang"></i>',      value: 100 },
      { name: 'Fame',         icon: '<i class="fa-solid fa-star"></i>',          value: 100 }
    ],

    initApp() {
      setTimeout(() => {
        this.currentScreen = 'mainMenu';
      }, 2500);
    },

    // NEW: Saves the current game to local storage and goes to main menu
    saveAndNewLife() {
      this.archivedLives.push({
          name: this.character.name,
          emoji: this.character.emoji,
          age: this.age,
          date: new Date().toLocaleDateString()
      });
      localStorage.setItem('archivedLives', JSON.stringify(this.archivedLives));
      
      this.isLeftMenuOpen = false;
      this.currentScreen = 'mainMenu';
    },

    getCurrentStatus() {
      if (this.age <= 3) {
        if (this.character.family === 'Wealthy Family') return 'Wealthy Infant';
        if (this.character.family === 'Poor Family') return 'Poor Infant';
        if (this.character.family === 'Orphanage') return 'Orphaned Infant';
        return 'Infant';
      }
      if (this.age >= 4 && this.age <= 11) return 'Primary School';
      if (this.age >= 12 && this.age <= 14) return 'Middle School';
      if (this.age >= 15 && this.age <= 18) return 'High School';
      return 'Unemployed'; 
    },

    formatMoney(amount, country) {
      if (amount === 0) return country === 'India' ? '₹0' : '$0';
      
      if (country === 'India') {
         let inr = amount * 80; 
         if (inr >= 10000000) return `₹${(inr / 10000000).toFixed(1).replace('.0', '')} Crore`;
         if (inr >= 100000) return `₹${(inr / 100000).toFixed(1).replace('.0', '')} Lakh`;
         return `₹${inr.toLocaleString('en-IN')}`;
      } else {
         if (amount >= 1000000000000) return `$${(amount / 1000000000000).toFixed(1).replace('.0', '')} Trillion`;
         if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1).replace('.0', '')} Billion`;
         if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1).replace('.0', '')} Million`;
         return `$${amount.toLocaleString('en-US')}`;
      }
    },

    getModalSubheading() {
      const subheadings = {
        name: 'What should your name be?',
        gender: 'Select your gender identity',
        country: 'Choose your origin',
        appearance: 'Select your physical appearance',
        talent: 'Discover your hidden talent',
        personality: 'Set your starting attributes',
        family: 'Choose your family background',
        profile: 'Your Personal Details'
      };
      return subheadings[this.activeModal] || '';
    },

    openModal(type) {
      this.activeModal = type;
      if (type === 'name') {
        const parts = this.character.name.split(' ');
        this.tempFirstName = parts[0] || '';
        this.tempLastName = parts.slice(1).join(' ') || '';
      }
    },

    saveName() {
      if(this.tempFirstName.trim() || this.tempLastName.trim()) {
        this.character.name = `${this.tempFirstName.trim()} ${this.tempLastName.trim()}`.trim();
      }
      this.activeModal = null; 
    },

    // UPDATED: Dynamically changes the emoji base depending on the exact age!
    updateAvatar() {
      let base = '🧑'; 
      
      if (this.age <= 3) {
        base = '👶'; // Baby
      } else if (this.age >= 4 && this.age <= 12) {
        base = this.character.gender === 'Female' ? '👧' : '👦'; // Child
      } else if (this.age >= 13 && this.age <= 59) {
        base = this.character.gender === 'Female' ? '👩' : '👨'; // Adult
      } else if (this.age >= 60) {
        base = this.character.gender === 'Female' ? '👵' : '👴'; // Elder
      }

      const appearanceObj = this.options.appearances.find(a => a.label === this.character.appearance);
      const tone = appearanceObj ? appearanceObj.modifier : '🏼';
      
      this.character.emoji = base + tone;
    },

    selectOption(category, label, emoji) {
      this.character[category] = label; 
      
      if (category === 'gender' || category === 'appearance') {
        this.updateAvatar(); 
      }
      if (category === 'country') {
        this.character.countryFlag = emoji;
      }

      this.activeModal = null; 
    },

    getActiveList() {
      if (this.activeModal === 'gender') return this.options.genders;
      if (this.activeModal === 'country') return this.options.countries;
      if (this.activeModal === 'appearance') return this.options.appearances;
      if (this.activeModal === 'talent') return this.options.talents;
      if (this.activeModal === 'family') return this.options.families;
      return [];
    },

    getRingColor(value) {
      if (value > 50) return '#4ade80'; 
      if (value > 25) return '#fbbf24'; 
      return '#f87171';                 
    },

    randomizeCharacter() {
      const r = (arr) => arr[Math.floor(Math.random() * arr.length)];
      
      this.character.gender = r(this.options.genders).label;
      this.character.appearance = r(this.options.appearances).label;
      this.character.talent = r(this.options.talents).label;
      this.character.family = r(this.options.families).label;

      let rndCountry = r(this.options.countries);
      this.character.country = rndCountry.label;
      this.character.countryFlag = rndCountry.emoji; 

      const firstNames = ['Jack', 'Emma', 'Liam', 'Sophia', 'Lucas', 'Mia'];
      const lastNames = ['Misano', 'Stone', 'Neeson', 'Loren', 'Silva', 'Chen'];
      this.character.name = r(firstNames) + ' ' + r(lastNames);

      this.detailedStats.forEach(stat => {
        stat.value = Math.floor(Math.random() * 61) + 40; 
      });

      this.updateAvatar(); 
    },

    startGame() {
      this.currentScreen = 'game'; 
      this.age = 0; // Ensures age is 0 when starting a fresh life
      
      const lastName = this.character.name.split(' ').slice(1).join(' ') || 'Unknown';
      const maleNames = ['John', 'Michael', 'David', 'James', 'Robert'];
      const femaleNames = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth'];
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

      this.character.father = maleNames[Math.floor(Math.random() * maleNames.length)] + ' ' + lastName;
      this.character.mother = femaleNames[Math.floor(Math.random() * femaleNames.length)] + ' ' + lastName;
      this.character.birthday = months[Math.floor(Math.random() * 12)] + ' ' + (Math.floor(Math.random() * 28) + 1);
      this.character.diseases = [];

      const familyOpt = this.options.families.find(f => f.label === this.character.family);
      if (familyOpt) {
          this.character.balance = Math.floor(Math.random() * (familyOpt.max - familyOpt.min + 1)) + familyOpt.min;
      }
      
      this.updateAvatar(); // Ensure avatar starts as a baby!

      this.eventLog = [
        { id: 'start', type: 'divider', text: 'BORN' },
        { id: 1, type: 'event', text: `<i class="fa-solid fa-baby text-gray-400 mr-2"></i> You were born in ${this.character.country}.` },
        { id: 2, type: 'event', text: `Your name is ${this.character.name}.` },
        { id: 3, type: 'event', text: `<i class="fa-solid fa-venus-mars text-gray-400 mr-2"></i> You are a ${this.character.gender.toLowerCase()}.` },
        { id: 4, type: 'event', text: `<i class="fa-solid fa-house text-gray-400 mr-2"></i> You were born into an ${this.character.family.toLowerCase()}.` }
      ];
    },
    
    advanceYear() {
      this.age++;
      this.updateAvatar(); // Updates visual age if threshold is crossed!
      
      let newYearLogs = [
        { id: Date.now(), type: 'divider', text: `AGE ${this.age}` },
        { id: Date.now() + 1, type: 'event', text: `<i class="fa-solid fa-cake-candles text-gray-400 mr-2"></i> You celebrated your birthday.` }
      ];

      this.eventLog = [...newYearLogs, ...this.eventLog];

      this.detailedStats.forEach(stat => {
        let change = Math.floor(Math.random() * 15) - 7; 
        stat.value = Math.max(0, Math.min(100, stat.value + change)); 
      });

      this.$nextTick(() => {
        const container = this.$refs.logScroll;
        container.scrollTop = 0; 
      });
    },

    previousYear() {
      if (this.age > 0) {
        this.age--;
        this.updateAvatar(); // Reverts visual age if going backwards!
        
        const targetText = this.age === 0 ? 'BORN' : `AGE ${this.age}`;
        const targetIndex = this.eventLog.findIndex(log => log.text === targetText);
        
        if (targetIndex !== -1) {
          this.eventLog = this.eventLog.slice(targetIndex);
        }

        this.detailedStats.forEach(stat => {
          let change = Math.floor(Math.random() * 15) - 7; 
          stat.value = Math.max(0, Math.min(100, stat.value + change)); 
        });

        this.$nextTick(() => {
          const container = this.$refs.logScroll;
          container.scrollTop = 0; 
        });
      }
    }
  };
}