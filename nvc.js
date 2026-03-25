/**
 * nvc.js
 * Nonviolent Communication (NVC) Framework
 * Transforms emotional expressions into compassionate communication
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

    // ----------------- Initialization -----------------
    initializeMappings() {
        // Feelings
        this.EMOTION_KEYWORDS = {
            happy: ['happy', 'joyful', 'ecstatic', 'delighted', 'thrilled', 'excited', 'pleased', 'cheerful', 'wonderful', 'amazing', 'grateful', 'satisfied', 'proud', 'hopeful'],
            sad: ['sad', 'depressed', 'unhappy', 'miserable', 'heartbroken', 'grief', 'lonely', 'hurt', 'aching', 'disappointed', 'upset', 'despondent', 'melancholy', 'sorrowful', 'crying', 'cry', 'tears'],
            angry: ['angry', 'furious', 'enraged', 'livid', 'rage', 'mad', 'irritated', 'hate', 'hateful', 'disgusted', 'pissed'],
            frustrated: ['frustrated', 'annoyed', 'annoying', 'exasperated', 'fed up', 'impatient', 'stuck', 'blocked', 'stalled', 'struggling', "can't", 'cannot', 'unable', 'problem'],
            scared: ['scared', 'afraid', 'frightened', 'terror', 'terrified'],
            anxious: ['anxious', 'worry', 'worried', 'concern', 'nervous', 'apprehensive', 'uneasy', 'uncertain'],
            panicked: ['panicked', 'panic', 'alarmed'],
            overwhelmed: ['overwhelmed', 'stressed', 'burnt out', 'exhausted', 'scattered', 'confused', 'lost', 'frazzled', 'swamped', 'torn', 'helpless', 'powerless', 'desperate', "don't know", "don't understand", 'unclear'],
            calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content', 'satisfied', 'composed', 'centered', 'grounded', 'still', 'balanced', 'secure', 'stable']
        };

        // Emotion → Needs
        this.EMOTION_TO_NEEDS = {
            angry: ['respect', 'autonomy', 'order', 'fairness', 'integrity'],
            frustrated: ['progress', 'ease', 'autonomy', 'competence', 'accomplishment'],
            sad: ['connection', 'understanding', 'love', 'acceptance', 'belonging'],
            happy: ['joy', 'celebration', 'connection', 'growth', 'purpose'],
            scared: ['safety', 'security', 'trust', 'protection', 'predictability'],
            anxious: ['safety', 'security', 'predictability', 'trust', 'certainty'],
            panicked: ['safety', 'protection', 'security'],
            overwhelmed: ['rest', 'peace', 'ease', 'clarity', 'simplicity'],
            calm: ['peace', 'balance', 'ease', 'harmony', 'rest']
        };

        // Judgment words
        this.JUDGMENT_WORDS = ['always', 'never', 'constantly', 'forever', 'hate', 'hateful', 'disgusting', 'horrible', 'awful', 'terrible', 'stupid', 'dumb', 'idiot', 'incompetent', 'useless', 'lazy', 'selfish', 'inconsiderate', 'thoughtless', 'rude', 'mean', 'cruel', 'jerk', 'bastard', 'witch', 'impossible', 'unbearable', 'intolerable', 'smelly', 'stinky', 'stinks', 'reeks', 'disgusting'];

        // Emotional intensifiers
        this.EMOTIONAL_INTENSIFIERS = ['so', 'very', 'really', 'extremely', 'incredibly', 'terribly', 'awfully', 'absolutely', 'completely', 'totally', 'literally', 'horribly'];

        // Concrete objects/actions
        this.CONCRETE_OBJECTS = {
            report: true, trash: true, dishes: true, socks: true, clothes: true, toy: true, toys: true, mess: true, house: true, room: true, space: true,
            bed: true, table: true, floor: true, laundry: true,
            listen: true, talk: true, conversation: true, speak: true, share: true, discuss: true, explain: true, tell: true, inform: true, notify: true,
            plans: true, schedule: true, meeting: true, appointment: true, call: true, phone: true, text: true, message: true,
            help: true, support: true, understand: true, respect: true
        };

        // Request templates
        this.NEED_REQUEST_PATTERNS = {
            respect: 'Could you acknowledge my perspective?',
            autonomy: 'Could you give me space to decide?',
            progress: 'Could we work together on this?',
            ease: 'Could this be made easier?',
            connection: 'Could we spend more time together?',
            understanding: 'Could you help me understand?',
            safety: 'Could I feel more secure?',
            peace: 'I need some peace.'
        };

        // Pure emotion words
        this.PURE_EMOTION_WORDS = Object.values(this.EMOTION_KEYWORDS).flat();

        // Universal needs
        this.UNIVERSAL_NEEDS = ['autonomy','authenticity','affection','belonging','celebration','choice','clarity','closeness','comfort','commitment','compassion','competence','connection','consideration','consistency','contribution','cooperation','creativity','ease','emotional safety','encouragement','equality','esteem','exercise','fairness','faith','freedom','fun','grace','growth','harmony','health','hope','inclusion','independence','inspiration','integrity','interdependence','intimacy','joy','justice','kindness','knowledge','leisure','love','meaning','mutuality','movement','non-violence','nurturing','order','originality','peace','physical safety','play','pleasure','predictability','privacy','progress','protection','purpose','reassurance','recognition','rest','respect','self-care','self-knowledge','self-respect','sexuality','solitude','space','spontaneity','stability','structure','support','trust','truth','understanding','vision','warmth','welcome','wholeness'];

        // Action words
        this.ACTION_WORDS = ['do','doing','make','making','help','helping','give','giving','take','taking','listen','listening','talk','talking','speak','speaking','apologize','apologizing','change','changing','stop','stopping','start','starting','leave','leaving','go','going','come','coming'];
    }

    // ----------------- Validation -----------------
    isValidObservation(observation) {
        if (!observation || observation.trim().length < 3) return false;
        const lower = observation.toLowerCase();
        for (const marker of ['i feel','feel so','feel very','felt so']) if (lower.includes(marker)) return false;
        for (const keyword of ['hate','hateful','disgusting','terrible','horrible','awful','stupid','idiot']) if (lower.includes(keyword)) return false;
        return true;
    }

    isValidFeeling(feeling) {
        if (!feeling || feeling.trim() === '') return false;
        return this.PURE_EMOTION_WORDS.includes(feeling.toLowerCase());
    }

    isValidNeed(need) {
        if (!need || need.trim() === '') return false;
        const lowerNeed = need.toLowerCase();
        if (!this.UNIVERSAL_NEEDS.some(un => lowerNeed.includes(un))) return false;
        for (const action of this.ACTION_WORDS) if (lowerNeed.includes(action)) return false;
        return true;
    }

    isValidRequest(request) {
        if (!request || request.trim() === '') return false;
        const lowerRequest = request.toLowerCase();
        if (!['could','could you','would','would you','can','can you','will you','please','?'].some(ind => lowerRequest.includes(ind))) return false;
        if (request.trim().split(/\s+/).length < 3) return false;
        return true;
    }

    // ----------------- Core NVC -----------------
    extractObservation(text) {
        if (!text || text.trim() === '') return '';
        let observation = text.trim();
        for (const regex of [/\b(so|very|really|extremely|incredibly|terribly|awfully)\s+/gi, /\b(absolutely|completely|totally|literally)\s+/gi]) {
            observation = observation.replace(regex,'');
        }
        return observation.replace(/\s+/g,' ').trim();
    }

    detectFeeling(text) {
        if (!text) return '';
        const lowerText = text.toLowerCase();
        let detected = [];
        for (const [emotion, keywords] of Object.entries(this.EMOTION_KEYWORDS)) {
            for (const keyword of keywords) {
                if (new RegExp(`\\b${keyword}\\b`,'i').test(lowerText)) detected.push(emotion);
            }
        }
        if (detected.length === 0) return '';
        // Handle negations
        const negs = ['not','never','no','hardly'];
        for (const neg of negs) detected = detected.filter(e => !new RegExp(`\\b${neg}\\s+${e}\\b`,'i').test(lowerText));
        return detected[0] || '';
    }

    getPrimaryNeed(feeling) {
        if (!feeling) return '';
        const needs = this.EMOTION_TO_NEEDS[feeling] || [];
        if (!needs.length) return '';
        return needs[Math.floor(Math.random()*needs.length)];
    }

    getAllNeeds(feeling) {
        if (!feeling) return [];
        return this.EMOTION_TO_NEEDS[feeling] || [];
    }

    generateRequest(observation, feeling, need) {
        if (!feeling) return '';
        if (['happy','calm'].includes(feeling)) return '';
        const lowerObs = observation.toLowerCase();
        for (const keyword of Object.keys(this.CONCRETE_OBJECTS)) {
            if (lowerObs.includes(keyword)) {
                switch(keyword){
                    case 'report': return 'Could you please complete the report?';
                    case 'trash': return 'Could you please take out the trash?';
                    case 'dishes': return 'Could you please wash the dishes?';
                    case 'plans': if(lowerObs.includes('change')) return 'Could you please tell me when plans change?'; break;
                    case 'listen': return 'Could you please listen carefully?';
                    case 'phone': return 'Could you please put the phone away?';
                    case 'help': return 'Could you please help me with this?';
                }
            }
        }
        if (need && this.NEED_REQUEST_PATTERNS[need]) return this.NEED_REQUEST_PATTERNS[need];
        if (feeling && need) return `I'm feeling ${feeling} and need ${need}. Could you help me with that?`;
        return 'Could you support me with this?';
    }

    process(inputText) {
        this.originalInput = inputText;
        this.observation = this.extractObservation(inputText);
        this.feeling = this.detectFeeling(inputText);
        this.need = this.getPrimaryNeed(this.feeling);
        this.request = this.generateRequest(this.observation,this.feeling,this.need);
        return this.getOutput();
    }

    generateNVC(text) { return this.process(text); }

    // ----------------- Editing -----------------
    setObservation(obs) { this.observation=obs; this.request=this.generateRequest(this.observation,this.feeling,this.need);}
    setFeeling(feel){ if(Object.keys(this.EMOTION_KEYWORDS).includes(feel)){this.feeling=feel; this.need=this.getPrimaryNeed(feel); this.request=this.generateRequest(this.observation,this.feeling,this.need);} else console.warn(`Invalid feeling. Choose from: ${Object.keys(this.EMOTION_KEYWORDS).join(',')}`);}
    setNeed(need){ this.need=need; this.request=this.generateRequest(this.observation,this.feeling,this.need); }

    // ----------------- Output -----------------
    getOutput(){
        return {
            observation:this.isValidObservation(this.observation)?this.observation:'No clear observation',
            feeling:this.isValidFeeling(this.feeling)?this.feeling:'No clear feeling',
            need:this.isValidNeed(this.need)?this.need:'No clear need',
            request:this.isValidRequest(this.request)?this.request:'No clear request'
        };
    }

    getFormattedOutput(){ return this.getOutput(); }
    isComplete(){ return Boolean(this.observation && this.feeling && this.need && this.request); }
    reset(){ this.observation='';this.feeling='';this.need='';this.request='';this.originalInput='';}
    getAnalysis(){
        return {
            original:this.originalInput,
            observation:{text:this.observation,methodology:'Removed judgment words, emotional intensifiers, and interpretations'},
            feeling:{text:this.feeling,methodology:'Keyword matching from EMOTION_KEYWORDS database'},
            need:{text:this.need,reasoning:this.feeling?`Based on feeling "${this.feeling}" which typically indicates need for ${this.need}`:'No feeling detected, no need identified'},
            request:{text:this.request,methodology:'Generated from observation-specific keywords, then need-based templates'}
        };
    }
}

// ----------------- Export -----------------
if(typeof module!=='undefined' && module.exports){
    module.exports = NVCFramework;
} else {
    window.NVCFramework = NVCFramework;
}