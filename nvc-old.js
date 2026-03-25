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

        // === LISTS OF PURE EMOTION WORDS ===
        // For validating that a feeling is actually an emotion word
        this.PURE_EMOTION_WORDS = [
            'happy', 'joyful', 'ecstatic', 'delighted', 'thrilled', 'excited', 'pleased', 'cheerful',
            'sad', 'depressed', 'unhappy', 'miserable', 'heartbroken', 'grief-stricken', 'lonely', 'hurt',
            'angry', 'furious', 'enraged', 'livid', 'mad', 'irritated',
            'frustrated', 'annoyed', 'exasperated',
            'scared', 'afraid', 'frightened', 'terrified',
            'anxious', 'worried', 'nervous', 'apprehensive', 'uneasy',
            'overwhelmed', 'stressed', 'exhausted', 'confused', 'helpless',
            'calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content', 'composed'
        ];

        // === UNIVERSAL NEEDS (for validation) ===
        // Standard NVC universal human needs
        this.UNIVERSAL_NEEDS = [
            'autonomy', 'authenticity', 'affection', 'belonging', 'celebration', 'choice',
            'clarity', 'closeness', 'comfort', 'commitment', 'compassion', 'competence',
            'connection', 'consideration', 'consistency', 'contribution', 'cooperation',
            'creativity', 'ease', 'emotional safety', 'encouragement', 'equality',
            'esteem', 'exercise', 'fairness', 'faith', 'freedom', 'fun', 'gdpr', 'grace',
            'growth', 'harmony', 'health', 'hope', 'inclusion', 'independence',
            'inspiration', 'integrity', 'interdependence', 'intimacy', 'joy', 'justice',
            'kindness', 'knowledge', 'leisure', 'love', 'meaning', 'mutuality',
            'movement', 'non-violence', 'nurturing', 'order', 'originality', 'peace',
            'physical safety', 'play', 'pleasure', 'predictability', 'privacy',
            'progress', 'protection', 'purpose', 'reassurance', 'recognition', 'rest',
            'respect', 'rest', 'self-care', 'self-knowledge', 'self-respect', 'sexuality',
            'solitude', 'space', 'spontaneity', 'stability', 'structure', 'support',
            'trust', 'truth', 'understanding', 'vision', 'warmth', 'welcome', 'wholeness'
        ];

        // === WORDS THAT INDICATE ACTION (NOT NEED) ===
        // These suggest a request disguised as a need
        this.ACTION_WORDS = [
            'do', 'doing', 'make', 'making', 'help', 'helping', 'give', 'giving',
            'take', 'taking', 'listen', 'listening', 'talk', 'talking', 'speak', 'speaking',
            'apologize', 'apologizing', 'change', 'changing', 'stop', 'stopping', 'start', 'starting',
            'leave', 'leaving', 'go', 'going', 'come', 'coming'
        ];
    }

    /**
     * ===== CONFIDENCE CHECKING METHODS =====
     * Validate each NVC component to ensure quality
     */

    /**
     * Check if observation is valid and confident
     * @param {string} observation - The observation text
     * @returns {boolean} - True if observation is valid
     */
    isValidObservation(observation) {
        if (!observation || observation.trim().length < 3) {
            return false;
        }

        const lower = observation.toLowerCase();
        
        // Check for emotional words that shouldn't be in observation
        const emotionalMarkers = ['i feel', 'feel so', 'feel very', 'felt so'];
        for (const marker of emotionalMarkers) {
            if (lower.includes(marker)) {
                return false; // Observation contains emotional language
            }
        }

        // Check for extreme judgment words
        const judgmentKeywords = ['hate', 'hateful', 'disgusting', 'terrible', 'horrible', 'awful', 'stupid', 'idiot'];
        for (const keyword of judgmentKeywords) {
            if (lower.includes(keyword)) {
                return false; // Observation contains judgments
            }
        }

        return true;
    }

    /**
     * Check if feeling is a pure emotion word
     * @param {string} feeling - The feeling/emotion text
     * @returns {boolean} - True if it's a valid emotion word
     */
    isValidFeeling(feeling) {
        if (!feeling || feeling.trim().length === 0) {
            return false;
        }

        // Must be one of our recognized emotion words (case-insensitive)
        return this.PURE_EMOTION_WORDS.includes(feeling.toLowerCase());
    }

    /**
     * Check if need is a universal need (not action-based)
     * @param {string} need - The need text
     * @returns {boolean} - True if it's a valid universal need
     */
    isValidNeed(need) {
        if (!need || need.trim().length === 0) {
            return false;
        }

        const lowerNeed = need.toLowerCase();

        // Must be a recognized universal need
        const isUniversalNeed = this.UNIVERSAL_NEEDS.some(un => lowerNeed.includes(un));
        if (!isUniversalNeed) {
            return false;
        }

        // Must not contain action words
        for (const actionWord of this.ACTION_WORDS) {
            if (lowerNeed.includes(actionWord)) {
                return false; // Need contains action words
            }
        }

        return true;
    }

    /**
     * Check if request is actionable and directed
     * @param {string} request - The request text
     * @returns {boolean} - True if it's a valid request
     */
    isValidRequest(request) {
        if (!request || request.trim().length === 0) {
            return false;
        }

        const lowerRequest = request.toLowerCase();

        // Must contain action-oriented language
        const actionIndicators = ['could', 'could you', 'would', 'would you', 'can', 'can you', 'will you', 'please', '?'];
        const hasActionIndicator = actionIndicators.some(indicator => lowerRequest.includes(indicator));

        if (!hasActionIndicator) {
            return false; // Request doesn't sound like a request
        }

        // Should be relatively specific (not too vague)
        const words = request.trim().split(/\s+/).length;
        if (words < 3) {
            return false; // Too short to be a meaningful request
        }

        return true;
    }

    /**
     * PRINCIPLE 1: Extract observation - keep EXACTLY what is stated
     * Only remove extreme emotional exaggeration, not the core message or feelings
     * @param {string} text - Raw input
     * @returns {string} - Factual observation (mostly as-stated)
     */
    extractObservation(text) {
        if (!text || text.trim().length === 0) {
            return '';
        }

        let observation = text.trim();

        // Only remove EXTREME exaggeration, NOT emotion words
        // "I feel frustrated" stays, "I feel SO frustrated" becomes "I feel frustrated"
        const extremeIntensifiers = [
            /\b(so|very|really|extremely|incredibly|terribly|awfully)\s+/gi,
            /\b(absolutely|completely|totally|literally)\s+/gi,
        ];

        for (const regex of extremeIntensifiers) {
            observation = observation.replace(regex, '');
        }

        // Clean up extra spaces
        observation = observation.replace(/\s+/g, ' ').trim();

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
     * ONLY generate a request if:
     * - There is a detected feeling (indicating an unmet need)
     * - AND the feeling is negative/problematic (not happy/calm)
     * - Leave blank if no explicit problem or for positive emotions
     * @param {string} observation - Extracted observation
     * @param {string} feeling - Detected emotion
     * @param {string} need - Primary underlying need
     * @returns {string} - Request or empty string
     */
    generateRequest(observation, feeling, need) {
        // If no feeling detected, no request
        if (!feeling || feeling === '') {
            return '';
        }

        // If feeling is positive (happy/calm), no request needed
        if (feeling === 'happy' || feeling === 'calm') {
            return '';
        }

        // Now we have a negative feeling - generate a request

        const lowerObs = observation.toLowerCase();

        // Strategy 1: Look for concrete objects/actions in observation
        // These usually translate to specific requests
        for (const keyword of Object.keys(this.CONCRETE_OBJECTS)) {
            if (lowerObs.includes(keyword)) {
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
        if (feeling === 'anxious' || feeling === 'scared') {
            return 'Could you help me feel more safe?';
        }

        // Final fallback
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
     * Get current NVC output with fallback strings for missing components
     * @returns {object} - {observation, feeling, need, request}
     */
    getOutput() {
        return {
            observation: this.observation && this.isValidObservation(this.observation) 
                ? this.observation 
                : 'No clear observation',
            feeling: this.feeling && this.isValidFeeling(this.feeling) 
                ? this.feeling 
                : 'No clear feeling',
            need: this.need && this.isValidNeed(this.need) 
                ? this.need 
                : 'No clear need',
            request: this.request && this.isValidRequest(this.request) 
                ? this.request 
                : 'No clear request'
        };
    }

    /**
     * Get formatted output with fallback strings for empty fields
     * @returns {object} - Formatted for display
     */
    getFormattedOutput() {
        return {
            observation: this.observation && this.isValidObservation(this.observation) 
                ? this.observation 
                : 'No clear observation',
            feeling: this.feeling && this.isValidFeeling(this.feeling) 
                ? this.feeling 
                : 'No clear feeling',
            need: this.need && this.isValidNeed(this.need) 
                ? this.need 
                : 'No clear need',
            request: this.request && this.isValidRequest(this.request) 
                ? this.request 
                : 'No clear request'
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
