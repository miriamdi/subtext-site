/**
 * nvc.js
 * Nonviolent Communication (NVC) Framework
 * Transforms emotional expressions into compassionate communication
 * with editable components and automatic request generation
 */

class NVCFramework {
    constructor() {
        this.observation = '';
        this.feeling = '';
        this.need = '';
        this.request = '';
        this.originalInput = '';
        
        this.initializeMappings();
    }

    /**
     * Initialize all mappings and word lists
     */
    initializeMappings() {
        // Predefined feeling words
        this.FEELING_LIST = [
            'angry', 'frustrated', 'sad', 'overwhelmed', 'calm'
        ];

        // Expanded feeling detection keywords
        this.FEELING_KEYWORDS = {
            angry: ['angry', 'furious', 'enraged', 'livid', 'rage', 'mad', 'annoyed', 'irritated'],
            frustrated: ['frustrated', 'annoyed', 'exasperated', 'fed up', 'impatient', 'stuck'],
            sad: ['sad', 'depressed', 'unhappy', 'miserable', 'heartbroken', 'grief', 'lonely'],
            overwhelmed: ['overwhelmed', 'stressed', 'burnt out', 'exhausted', 'anxious', 'panicked'],
            calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content', 'satisfied']
        };

        // Feeling to need mapping
        this.NEED_MAP = {
            angry: 'order / respect',
            frustrated: 'progress / ease',
            sad: 'connection / comfort',
            overwhelmed: 'rest / clarity',
            calm: 'balance / harmony'
        };

        // Emotional/exaggerated words to filter out from observations
        this.EMOTIONAL_WORDS = [
            'always', 'never', 'everywhere', 'so', 'so angry', 'so sad', 'so frustrated',
            'extremely', 'absolutely', 'completely', 'totally', 'literally',
            'very', 'really', 'horribly', 'terribly', 'awfully',
            'furious', 'enraged', 'devastated', 'heartbroken', 'insane'
        ];

        // Request action templates based on observable patterns
        this.ACTION_TEMPLATES = {
            'socks': 'put the socks in the laundry basket',
            'clothes': 'put the clothes away',
            'dishes': 'wash the dishes or put them in the dishwasher',
            'mess': 'help clean up the space',
            'toys': 'put the toys away',
            'trash': 'take out the trash',
            'noise': 'please lower the volume',
            'lateness': 'arrive on time',
            'phone': 'put the phone away',
            'listening': 'listen to what I\'m saying',
            'time': 'spend more time together',
            'help': 'help with the tasks',
            'talk': 'have a conversation with me',
            'support': 'support me right now'
        };
    }

    /**
     * Detect feeling from input text using keyword matching
     * @param {string} text - Input text to analyze
     * @returns {string} - Detected feeling or empty string
     */
    detectFeeling(text) {
        const lowerText = text.toLowerCase();
        
        // Check each feeling and its associated keywords
        for (const [feeling, keywords] of Object.entries(this.FEELING_KEYWORDS)) {
            for (const keyword of keywords) {
                if (lowerText.includes(keyword)) {
                    return feeling;
                }
            }
        }
        
        return '';
    }

    /**
     * Extract observation by removing emotional/exaggerated words
     * @param {string} text - Raw input text
     * @returns {string} - Clean observation
     */
    extractObservation(text) {
        let observation = text.trim();

        // Remove emotional intensifiers and words
        this.EMOTIONAL_WORDS.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            observation = observation.replace(regex, '');
        });

        // Clean up extra spaces
        observation = observation.replace(/\s+/g, ' ').trim();

        // Capitalize first letter
        observation = observation.charAt(0).toUpperCase() + observation.slice(1);

        // Add period if missing
        if (observation && !observation.endsWith('.')) {
            observation += '.';
        }

        return observation;
    }

    /**
     * Get need based on feeling
     * @param {string} feeling - The detected or provided feeling
     * @returns {string} - The associated need
     */
    getNeed(feeling) {
        return this.NEED_MAP[feeling] || '';
    }

    /**
     * Generate a polite, actionable request from components
     * @param {string} observation - The extracted observation
     * @param {string} feeling - The detected feeling
     * @param {string} need - The associated need
     * @returns {string} - A polite, specific request
     */
    generateRequest(observation, feeling, need) {
        if (!observation) {
            return '';
        }

        const lowerObs = observation.toLowerCase();
        
        // Try to match observation to action templates
        for (const [keyword, action] of Object.entries(this.ACTION_TEMPLATES)) {
            if (lowerObs.includes(keyword)) {
                return `Could you please ${action}?`;
            }
        }

        // Generate generic request based on observation
        // Extract the main subject/object from observation
        const words = observation.replace(/[.!?]/g, '').split(' ');
        
        // Simple strategy: suggest addressing what was mentioned
        if (words.length > 0) {
            // Look for a noun that might be the key action item
            const lastNoun = words[words.length - 1];
            return `Could you please address the situation with ${lastNoun.toLowerCase()}?`;
        }

        return 'Could you please help me with this?';
    }

    /**
     * Process raw input and generate full NVC framework
     * @param {string} inputText - Raw user input
     * @returns {object} - Complete NVC framework object
     */
    process(inputText) {
        this.originalInput = inputText;
        
        // Extract observation (remove emotional language)
        this.observation = this.extractObservation(inputText);
        
        // If no observation extracted, set default message
        if (!this.observation || this.observation === '.') {
            this.observation = 'There is no observation of an event';
        }
        
        // Detect feeling
        this.feeling = this.detectFeeling(inputText);
        
        // Get need from feeling
        this.need = this.getNeed(this.feeling);
        
        // Generate request (will update automatically when others change)
        this.updateRequest();
        
        return this.getOutput();
    }

    /**
     * Update request whenever observation, feeling, or need changes
     * IMPORTANT: Call this after editing any field
     */
    updateRequest() {
        this.request = this.generateRequest(this.observation, this.feeling, this.need);
    }

    /**
     * Edit observation and update request
     * @param {string} newObservation - New observation text
     */
    setObservation(newObservation) {
        this.observation = newObservation;
        this.updateRequest();
    }

    /**
     * Edit feeling and update request
     * @param {string} newFeeling - New feeling from FEELING_LIST
     */
    setFeeling(newFeeling) {
        if (this.FEELING_LIST.includes(newFeeling)) {
            this.feeling = newFeeling;
            this.need = this.getNeed(newFeeling);
            this.updateRequest();
        } else {
            console.warn(`Invalid feeling. Choose from: ${this.FEELING_LIST.join(', ')}`);
        }
    }

    /**
     * Edit need and update request
     * @param {string} newNeed - New need description
     */
    setNeed(newNeed) {
        this.need = newNeed;
        this.updateRequest();
    }

    /**
     * Get current NVC framework output
     * @returns {object} - Current state of all NVC components
     */
    getOutput() {
        return {
            observation: this.observation,
            feeling: this.feeling,
            need: this.need,
            request: this.request
        };
    }

    /**
     * Get formatted output for display
     * @returns {object} - Formatted output with all details
     */
    getFormattedOutput() {
        return {
            observation: this.observation || '—',
            feeling: this.feeling || '—',
            need: this.need || '—',
            request: this.request || '—'
        };
    }

    /**
     * Validate all fields are complete
     * @returns {boolean} - True if all components are present
     */
    isComplete() {
        return Boolean(this.observation && this.feeling && this.need && this.request);
    }

    /**
     * Reset all values
     */
    reset() {
        this.observation = '';
        this.feeling = '';
        this.need = '';
        this.request = '';
        this.originalInput = '';
    }
}

// Example usage and demonstration
function demonstrateNVC() {
    const nvc = new NVCFramework();
    
    // Example 1: Basic processing
    console.log('=== Example 1: Basic NVC Processing ===');
    const input1 = "I see socks everywhere I'm so angry";
    const result1 = nvc.process(input1);
    console.log('Input:', input1);
    console.log('Output:', result1);
    console.log('');
    
    // Example 2: Editing components
    console.log('=== Example 2: Editing Components ===');
    nvc.setObservation('There are socks scattered around the room');
    console.log('After editing observation:', nvc.getOutput());
    console.log('');
    
    // Example 3: Changing feeling
    console.log('=== Example 3: Changing Feeling ===');
    nvc.setFeeling('frustrated');
    console.log('After changing feeling to frustrated:', nvc.getOutput());
    console.log('');
    
    // Example 4: Different input
    console.log('=== Example 4: Different Input ===');
    nvc.reset();
    const input2 = "You never listen to me when I'm trying to talk, I feel so sad";
    const result2 = nvc.process(input2);
    console.log('Input:', input2);
    console.log('Output:', result2);
    console.log('');
    
    // Example 5: Custom need
    console.log('=== Example 5: Custom Need ===');
    nvc.setNeed('understanding / presence');
    console.log('After custom need:', nvc.getOutput());
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NVCFramework;
}
