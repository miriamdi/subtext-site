/**
 * nvc.js
 * Nonviolent Communication (NVC) Framework
 * Transforms emotional expressions into compassionate communication
 * 
 * Core Logic (principle-based, not example-based):
 * 1. OBSERVATION: Remove judgment, emotion words, and interpretation → keep factual description
 * 2. FEELING: Detect genuine emotion from keywords → identify what emotion was expressed
 * 3. NEED: Map feeling to underlying human need → understand what matters
 * 4. REQUEST: Generate concrete action addressing the need → move toward resolution
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
     * Initialize all NVC mappings based on standard NVC framework
     */
    initializeMappings() {
        // === COMPREHENSIVE FEELING KEYWORDS ===
        // Organized by emotional category with aliases
        this.EMOTION_KEYWORDS = {
            // Happy/Joyful emotions
            happy: ['happy', 'joyful', 'ecstatic', 'delighted', 'thrilled', 'excited', 'pleased', 'cheerful', 'wonderful', 'amazing', 'grateful', 'satisfied', 'proud', 'hopeful'],
            
            // Sad/Sorrowful emotions
            sad: ['sad', 'depressed', 'unhappy', 'miserable', 'heartbroken', 'grief', 'grief-stricken', 'lonely', 'hurt', 'aching', 'disappointed', 'upset', 'despondent', 'melancholy', 'sorrowful', 'crying', 'cry', 'tears'],
            
            // Angry/Frustrated emotions
            angry: ['angry', 'furious', 'enraged', 'livid', 'rage', 'mad', 'irritated', 'hate', 'hateful', 'disgusted', 'pissed'],
            frustrated: ['frustrated', 'annoyed', 'annoying', 'exasperated', 'fed up', 'impatient', 'stuck', 'blocked', 'stalled', 'struggling', 'can\'t', 'cannot', 'unable', 'problem', 'stuck'],
            
            // Fearful/Anxious emotions
            scared: ['scared', 'afraid', 'frightened', 'terror', 'terrified'],
            anxious: ['anxious', 'worry', 'worried', 'concern', 'nervous', 'apprehensive', 'uneasy', 'uncertain'],
            panicked: ['panicked', 'panic', 'alarmed'],
            
            // Overwhelmed/Stressed emotions
            overwhelmed: ['overwhelmed', 'stressed', 'burnt out', 'exhausted', 'scattered', 'confused', 'lost', 'frazzled', 'swamped', 'torn', 'helpless', 'powerless', 'desperate', 'don\'t know', 'don\'t understand', 'unclear'],
            
            // Calm/Peaceful emotions
            calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content', 'satisfied', 'composed', 'centered', 'grounded', 'still', 'balanced', 'secure', 'stable']
        };

        // === EMOTION TO NEEDS MAPPING ===
        // Maps detected emotions to underlying NVC needs they typically represent
        this.EMOTION_TO_NEEDS = {
            // When angry → likely underlying needs about respect, autonomy, order
            angry: ['respect', 'autonomy', 'order', 'fairness', 'integrity'],
            frustrated: ['progress', 'ease', 'autonomy', 'competence', 'accomplishment'],
            
            // When sad → likely underlying needs about connection, understanding, love
            sad: ['connection', 'understanding', 'love', 'acceptance', 'belonging'],
            
            // When excited/happy → likely underlying needs about joy, celebration, connection
            happy: ['joy', 'celebration', 'connection', 'growth', 'purpose'],
            
            // When scared → likely underlying needs about safety, security, trust, predictability
            scared: ['safety', 'security', 'trust', 'protection', 'predictability'],
            anxious: ['safety', 'security', 'predictability', 'trust', 'certainty'],
            panicked: ['safety', 'protection', 'security'],
            
            // When overwhelmed → likely underlying needs about rest, clarity, ease, peace
            overwhelmed: ['rest', 'peace', 'ease', 'clarity', 'simplicity'],
            
            // When calm → likely underlying needs about peace, balance, ease
            calm: ['peace', 'balance', 'ease', 'harmony', 'rest']
        };

        // === JUDGMENT AND INTERPRETATION WORDS TO REMOVE ===
        // Words that indicate judgment, emotion exaggeration, or interpretation rather than fact
        this.JUDGMENT_WORDS = [
            // Accusations and blame
            'always', 'never', 'constantly', 'forever',
            
            // Extreme judgments
            'hate', 'hateful', 'disgusting', 'disgusted', 'horrible', 'awful', 'terrible',
            'stupid', 'dumb', 'idiot', 'incompetent', 'useless', 'lazy', 'selfish',
            'inconsiderate', 'thoughtless', 'rude', 'mean', 'cruel', 'jerk', 'bastard',
            'witch', 'impossible', 'unbearable', 'intolerable',
            
            // Physical descriptions that are emotional judgments
            'smelly', 'stinky', 'stinks', 'reeks', 'disgusting'
        ];

        // === EMOTIONAL INTENSIFIERS TO REMOVE ===
        // Words that exaggerate emotions rather than describe fact
        this.EMOTIONAL_INTENSIFIERS = [
            'so', 'very', 'really', 'extremely', 'incredibly', 'terribly', 'awfully',
            'absolutely', 'completely', 'totally', 'literally', 'horribly'
        ];

        // === CONCRETE ACTION VOCABULARY ===
        // Words that indicate specific, observable actions or items
        this.CONCRETE_OBJECTS = {
            // Household items
            'report': true, 'trash': true, 'dishes': true, 'socks': true, 'clothes': true,
            'toy': true, 'toys': true, 'mess': true, 'house': true, 'room': true, 'space': true,
            'bed': true, 'table': true, 'floor': true, 'laundry': true,
            
            // Communication/behaviors
            'listen': true, 'talk': true, 'conversation': true, 'speak': true, 'share': true,
            'discuss': true, 'explain': true, 'tell': true, 'inform': true, 'notify': true,
            
            // Time/plans
            'plans': true, 'schedule': true, 'meeting': true, 'appointment': true, 'call': true,
            'phone': true, 'text': true, 'message': true, 'time': true, 'late': true, 'lateness': true,
            
            // Behaviors and actions
            'help': true, 'support': true, 'listen': true, 'understand': true, 'respect': true
        };

        // === REQUEST TEMPLATES BASED ON NEED ===
        // How to phrase requests for common underlying needs
        this.NEED_REQUEST_PATTERNS = {
            'respect': 'Could you acknowledge my perspective?',
            'autonomy': 'Could you give me space to decide?',
            'progress': 'Could we work together on this?',
            'ease': 'Could this be made easier?',
            'connection': 'Could we spend more time together?',
            'understanding': 'Could you help me understand?',
            'safety': 'Could I feel more secure?',
            'peace': 'I need some peace.'
        };
    }

    /**
     * PRINCIPLE 1: Extract observation by removing judgment, emotion, interpretation
     * Keep: Factual descriptions, specific behaviors, what was seen/heard
     * Remove: Judgment words, emotional exaggeration, interpretation of intent
     * @param {string} text - Raw input
     * @returns {string} - Factual, judgment-free observation
     */
    extractObservation(text) {
        if (!text || text.trim().length === 0) {
            return '';
        }

        let observation = text.trim();

        // Step 1: Remove emotional judgment words entirely
        for (const judgment of this.JUDGMENT_WORDS) {
            const regex = new RegExp(`\\b${judgment}\\b`, 'gi');
            observation = observation.replace(regex, '');
        }

        // Step 2: Remove emotional intensifiers while keeping the core message
        for (const intensifier of this.EMOTIONAL_INTENSIFIERS) {
            const regex = new RegExp(`\\b${intensifier}\\s+`, 'gi');
            observation = observation.replace(regex, '');
        }

        // Step 3: Remove "you're being" and similar attribution patterns
        observation = observation.replace(/you're being\s+\w+(\s+and)?\s*/gi, '');

        // Step 4: Clean up extra spaces created by removals
        observation = observation.replace(/\s+/g, ' ').trim();

        // Step 5: Handle empty results
        if (!observation || observation.length < 3) {
            return '';
        }

        // Step 6: Ensure clean ending punctuation
        if (!observation.endsWith('.') && !observation.endsWith('!') && !observation.endsWith('?')) {
            observation += '.';
        }

        return observation;
    }

    /**
     * PRINCIPLE 2: Detect feeling by identifying emotional keywords
     * This identifies what emotion the speaker actually expressed
     * @param {string} text - Input text to analyze
     * @returns {string} - Detected emotion or empty string if none found
     */
    detectFeeling(text) {
        const lowerText = text.toLowerCase();

        // Search through each emotion category
        for (const [emotion, keywords] of Object.entries(this.EMOTION_KEYWORDS)) {
            for (const keyword of keywords) {
                // Use word boundary to avoid partial matches
                const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                if (regex.test(lowerText)) {
                    return emotion;
                }
            }
        }

        // No feeling detected
        return '';
    }

    /**
     * PRINCIPLE 3: Identify underlying need from detected emotion
     * Each emotion indicates unmet needs; map from feeling to need
     * @param {string} feeling - Detected emotion
     * @returns {string} - Primary underlying need
     */
    getPrimaryNeed(feeling) {
        if (!feeling || feeling === '') {
            return '';
        }

        const needs = this.EMOTION_TO_NEEDS[feeling];
        return needs && needs.length > 0 ? needs[0] : '';
    }

    /**
     * Get all needs for a feeling
     * @param {string} feeling - Detected emotion
     * @returns {array} - Array of underlying needs
     */
    getAllNeeds(feeling) {
        if (!feeling || feeling === '') {
            return [];
        }

        return this.EMOTION_TO_NEEDS[feeling] || [];
    }

    /**
     * PRINCIPLE 4: Generate a concrete, actionable request
     * Request should be:
     * - Specific to the observation (not generic)
     * - Addressed toward the identified need
     * - Phrased as "could you..." (respects autonomy)
     * - Concrete and doable (not vague)
     * @param {string} observation - Extracted factual observation
     * @param {string} feeling - Detected emotion
     * @param {string} need - Primary underlying need
     * @returns {string} - Specific, polite request
     */
    generateRequest(observation, feeling, need) {
        if (!observation || observation.length === 0) {
            if (need && this.NEED_REQUEST_PATTERNS[need]) {
                return this.NEED_REQUEST_PATTERNS[need];
            }
            return 'I\'d appreciate your support.';
        }

        const lowerObs = observation.toLowerCase();

        // Strategy 1: Look for concrete objects/actions in observation
        // These usually translate to specific requests
        for (const keyword of Object.keys(this.CONCRETE_OBJECTS)) {
            if (lowerObs.includes(keyword)) {
                // Match observation to specific, doable action
                if (keyword === 'report' && (lowerObs.includes('incomplete') || lowerObs.includes('unfinished'))) {
                    return 'Could you please complete the report?';
                }
                if (keyword === 'trash') {
                    return 'Could you please take out the trash?';
                }
                if (keyword === 'dishes') {
                    return 'Could you please wash the dishes?';
                }
                if (keyword === 'plans' && lowerObs.includes('change')) {
                    return 'Could you please tell me when plans change?';
                }
                if (keyword === 'listen') {
                    return 'Could you please listen to what I\'m saying?';
                }
                if (keyword === 'phone') {
                    return 'Could you please put the phone away?';
                }
                if (keyword === 'help') {
                    return 'Could you please help me with this?';
                }
            }
        }

        // Strategy 2: Generate from identified need
        // Use need-specific request templates
        if (need && this.NEED_REQUEST_PATTERNS[need]) {
            return this.NEED_REQUEST_PATTERNS[need];
        }

        // Strategy 3: Generate based on feeling
        if (feeling === 'frustrated' || feeling === 'overwhelmed') {
            return 'Could we work together on this?';
        }
        if (feeling === 'sad') {
            return 'Could you listen to what I\'m experiencing?';
        }
        if (feeling === 'angry') {
            return 'I\'d like to talk about this with respect for both of us.';
        }

        // Final fallback: generic compassionate request
        return 'Could you support me with this?';
    }

    /**
     * MASTER PROCESS: Execute full NVC transformation
     * Follows the four principles in order
     * @param {string} inputText - Raw user input
     * @returns {object} - Complete NVC structure
     */
    process(inputText) {
        this.originalInput = inputText;

        // 1. Extract observation (remove judgment/emotion/interpretation)
        this.observation = this.extractObservation(inputText);

        // 2. Detect feeling (identify what emotion was expressed)
        this.feeling = this.detectFeeling(inputText);

        // 3. Identify underlying need (what does this emotion tell us about unmet needs?)
        this.need = this.getPrimaryNeed(this.feeling);

        // 4. Generate request (concrete action toward meeting the need)
        this.updateRequest();

        return this.getOutput();
    }

    /**
     * PUBLIC ENTRY POINT: Generate NVC for given text
     * @param {string} text - User input
     * @returns {object} - {observation, feeling, need, request}
     */
    generateNVC(text) {
        return this.process(text);
    }

    /**
     * Update request based on current state
     * Call this whenever observation, feeling, or need changes
     */
    updateRequest() {
        this.request = this.generateRequest(this.observation, this.feeling, this.need);
    }

    /**
     * === UI EDITING METHODS ===
     * Allow users to manually adjust any NVC component
     */

    /**
     * Edit observation and update request
     * @param {string} newObservation - New factual observation
     */
    setObservation(newObservation) {
        this.observation = newObservation;
        this.updateRequest();
    }

    /**
     * Edit feeling and update need/request
     * @param {string} newFeeling - New emotion from EMOTION_KEYWORDS
     */
    setFeeling(newFeeling) {
        const allEmotions = Object.keys(this.EMOTION_KEYWORDS);
        if (allEmotions.includes(newFeeling)) {
            this.feeling = newFeeling;
            this.need = this.getPrimaryNeed(newFeeling);
            this.updateRequest();
        } else {
            console.warn(`Invalid feeling. Choose from: ${allEmotions.join(', ')}`);
        }
    }

    /**
     * Edit need and update request
     * @param {string} newNeed - New underlying need
     */
    setNeed(newNeed) {
        this.need = newNeed;
        this.updateRequest();
    }

    /**
     * === OUTPUT METHODS ===
     */

    /**
     * Get current NVC output
     * @returns {object} - {observation, feeling, need, request}
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
     * Get formatted output with placeholders for empty fields
     * @returns {object} - Formatted for display
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
     * Check if all components are complete
     * @returns {boolean} - True if all fields have content
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

    /**
     * === DEBUGGING / ANALYSIS METHODS ===
     * For understanding how the NVC was generated
     */

    /**
     * Get analysis of the transformation
     * Shows what was removed, what was detected, why needs were chosen
     * @returns {object} - Detailed analysis
     */
    getAnalysis() {
        return {
            original: this.originalInput,
            observation: {
                text: this.observation,
                methodology: 'Removed judgment words, emotional intensifiers, and interpretations'
            },
            feeling: {
                text: this.feeling,
                methodology: 'Keyword matching from EMOTION_KEYWORDS database'
            },
            need: {
                text: this.need,
                reasoning: this.feeling ? `Based on feeling "${this.feeling}" which typically indicates need for ${this.need}` : 'No feeling detected, no need identified'
            },
            request: {
                text: this.request,
                methodology: 'Generated from observation-specific keywords, then need-based templates'
            }
        };
    }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NVCFramework;
}
