// Programmatically open the reference guide and select a feeling/need
// Usage: openReferenceGuide('feelings', 'happy') or openReferenceGuide('needs', 'connection')
window.openReferenceGuide = function(tab, word) {
    const referenceModal = document.getElementById('referenceModal');
    const referenceTabBtns = document.querySelectorAll('.reference-tab-btn');
    const sections = document.querySelectorAll('.reference-section');
    // Open modal
    referenceModal.style.display = 'flex';
    // Switch tab
    referenceTabBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === tab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    sections.forEach(sec => {
        if (sec.id === tab + 'Tab') {
            sec.classList.add('active');
        } else {
            sec.classList.remove('active');
        }
    });
    // Highlight the word if provided
    if (word) {
        setTimeout(() => {
            let selector = '';
            if (tab === 'feelings') {
                selector = `#feelingsContainer [data-selectable][data-word='${word.toLowerCase()}']`;
            } else if (tab === 'needs') {
                selector = `#needsContainer [data-selectable][data-word='${word.toLowerCase()}']`;
            }
            const el = document.querySelector(selector);
            if (el) {
                el.classList.add('selected-reference-item');
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Remove highlight after a short time
                setTimeout(() => el.classList.remove('selected-reference-item'), 2000);
            }
        }, 200); // Wait for DOM to update if needed
    }
};
// Shared initialization for the reference modal (tabs, close, search, etc.)
function initializeReferenceModalFeatures() {
    const referenceModal = document.getElementById('referenceModal');
    const closeReferenceBtn = document.getElementById('closeReference');
    const referenceTabBtns = document.querySelectorAll('.reference-tab-btn');
    const feelingsSearch = document.getElementById('feelingsSearch');
    const needsSearch = document.getElementById('needsSearch');

    // Tab switching
    referenceTabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all
            referenceTabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.reference-section').forEach(sec => sec.classList.remove('active'));
            // Add active to selected
            btn.classList.add('active');
            const tab = btn.getAttribute('data-tab');
            document.getElementById(tab + 'Tab').classList.add('active');
        });
    });

    // Close modal
    if (closeReferenceBtn && referenceModal) {
        closeReferenceBtn.addEventListener('click', () => {
            referenceModal.style.display = 'none';
        });
        referenceModal.addEventListener('click', (e) => {
            if (e.target === referenceModal) {
                referenceModal.style.display = 'none';
            }
        });
    }

    // Search inputs (optional: add filtering logic here if needed)
    // ...
}
// No dynamic injection; modal is present in main page only
/**
 * reference.js
 * NVC Reference Database
 * Provides explanations for NVC components (Observation, Feeling, Need, Request)
 * and comprehensive reference tables for Needs and Feelings organized by category
 */

class NVCReference {
    constructor() {
        this.initializeDatabase();
    }

    /**
     * Initialize all reference data
     */
    initializeDatabase() {
        // NVC Component Explanations
        this.COMPONENT_EXPLANATIONS = {
            observation: {
                title: 'Observation',
                icon: '👁️',
                description: 'What did you actually see or hear, without judgment?',
                details: 'An observation is a factual, objective description of what happened. It describes specific behaviors or events without adding interpretation, evaluation, or emotional language. For example, instead of "You always ignore me," an observation would be "When I speak, I notice you look at your phone."',
                why: 'Observations help create understanding because they stick to what actually happened, making it easier for others to understand your experience without getting defensive.',
                example_bad: 'You\'re being inconsiderate.',
                example_good: 'You didn\'t respond when I asked about the party.'
            },
            feeling: {
                title: 'Feeling',
                icon: '❤️',
                description: 'What emotion(s) came up for you?',
                details: 'A feeling is a genuine emotional response to what you observed. It\'s the internal experience that arose in response to a situation. Authentic feelings are usually one word: happy, sad, angry, frustrated, scared, etc. This is different from thoughts that start with "I feel like..." or "I feel that..."',
                why: 'Expressing feelings creates empathy and connection. When people understand what you\'re genuinely feeling, they can respond with compassion rather than defensiveness.',
                example_bad: 'I feel like you don\'t care about me.',
                example_good: 'I feel hurt and disappointed.'
            },
            need: {
                title: 'Need',
                icon: '🎯',
                description: 'What need or value was important for you in this situation?',
                details: 'A need is a universal human value or requirement that matters to you. Needs are deeper than wants or requests. Common needs include connection, respect, autonomy, safety, growth, and peace. Understanding your need helps explain why something matters, and often the other person can find ways to meet that need.',
                why: 'Needs reveal what truly matters to you. When you focus on needs rather than blame or demands, people are more likely to want to help you because you\'re speaking to something meaningful.',
                example_bad: 'I need you to always listen to me.',
                example_good: 'I need to feel heard and valued in our conversations.'
            },
            request: {
                title: 'Request',
                icon: '🙏',
                description: 'What specific, concrete action would help?',
                details: 'A request is a specific, doable action that the other person could take that would help meet your need. Good requests are clear, achievable within a reasonable timeframe, and phrased as "could you..." or "would you be willing to..." rather than demands. A request respects the other person\'s autonomy—they can say yes or no.',
                why: 'Requests give the other person something concrete they can do. Instead of complaining about problems, you\'re offering a path forward that respects their choice and agency.',
                example_bad: 'You need to respect me more.',
                example_good: 'Could you please put your phone away when we\'re talking?'
            }
        };

        // Comprehensive Feelings Database organized by category
        this.FEELINGS_BY_CATEGORY = {
            happy: {
                title: '😊 Happy / Joyful',
                description: 'Positive emotions characterized by pleasure, contentment, and well-being',
                feelings: [
                    { word: 'happy', definition: 'Experiencing joy, contentment, or satisfaction' },
                    { word: 'joyful', definition: 'Full of or feeling great joy; delighted' },
                    { word: 'ecstatic', definition: 'In a state of overwhelming happiness or exhilaration' },
                    { word: 'delighted', definition: 'Pleased or amused; taking pleasure in something' },
                    { word: 'thrilled', definition: 'Feeling intense excitement or pleasure' },
                    { word: 'excited', definition: 'Energized and enthusiastic about something' },
                    { word: 'pleased', definition: 'Feeling or showing satisfaction or contentment' },
                    { word: 'cheerful', definition: 'Feeling or inducing happiness and optimism' },
                    { word: 'wonderful', definition: 'Causing feelings of admiration and awe' },
                    { word: 'amazing', definition: 'Surprising or impressive in a positive way' },
                    { word: 'grateful', definition: 'Feeling or showing appreciation' },
                    { word: 'satisfied', definition: 'Feeling content because a need or desire has been met' },
                    { word: 'proud', definition: 'Feeling pride in an achievement or accomplishment' },
                    { word: 'hopeful', definition: 'Feeling optimism about the future' }
                ]
            },
            sad: {
                title: '😢 Sad / Sorrowful',
                description: 'Emotions related to loss, disappointment, and emotional pain',
                feelings: [
                    { word: 'sad', definition: 'Feeling sorrow or unhappiness' },
                    { word: 'depressed', definition: 'Feeling persistently unhappy and hopeless' },
                    { word: 'unhappy', definition: 'Not happy; experiencing dissatisfaction or sadness' },
                    { word: 'miserable', definition: 'In a deeply unhappy state; wretchedly unhappy' },
                    { word: 'heartbroken', definition: 'Overwhelmed by sorrow, especially from loss in love' },
                    { word: 'grief', definition: 'Deep sorrow, especially after a loss' },
                    { word: 'lonely', definition: 'Affected by a lack of friends or company; isolated' },
                    { word: 'hurt', definition: 'Feeling pain or injury, especially emotional' },
                    { word: 'aching', definition: 'Experiencing a dull, persistent emotional pain' },
                    { word: 'disappointed', definition: 'Feeling let down when hopes or expectations are not met' },
                    { word: 'upset', definition: 'Emotionally distressed or agitated' },
                    { word: 'despondent', definition: 'In low spirits; despairing' },
                    { word: 'melancholy', definition: 'A pensive or reflective sadness, often with beauty' },
                    { word: 'sorrowful', definition: 'Feeling, expressing, or accompanied by sorrow' }
                ]
            },
            angry: {
                title: '😠 Angry / Frustrated',
                description: 'Strong negative emotions based on perceived wrongdoing or obstacles',
                feelings: [
                    { word: 'angry', definition: 'Feeling strong displeasure and hostility' },
                    { word: 'furious', definition: 'Extremely angry; in a rage' },
                    { word: 'enraged', definition: 'Affected by intense anger; infuriated' },
                    { word: 'livid', definition: 'Furiously angry; in a state of rage' },
                    { word: 'mad', definition: 'Angry or annoyed' },
                    { word: 'irritated', definition: 'Annoyed or impatient; easily angered' },
                    { word: 'frustrated', definition: 'Feeling annoyed or dissatisfied due to blocked goals' },
                    { word: 'annoyed', definition: 'Slightly angry or irritated' },
                    { word: 'exasperated', definition: 'Annoyed to the point of anger' },
                    { word: 'resentful', definition: 'Feeling bitterness about perceived unfair treatment' },
                    { word: 'indignant', definition: 'Angry at something considered unjust or offensive' },
                    { word: 'outraged', definition: 'Deeply angered by offensive or morally wrong actions' },
                    { word: 'hostile', definition: 'Showing unfriendliness or opposition' },
                    { word: 'bitter', definition: 'Angry and feeling wronged; resentful' }
                ]
            },
            fearful: {
                title: '😨 Fearful / Anxious',
                description: 'Emotions based on threat, uncertainty, and worry about what might happen',
                feelings: [
                    { word: 'scared', definition: 'Feeling fear or being frightened' },
                    { word: 'afraid', definition: 'Feeling fear or apprehension' },
                    { word: 'anxious', definition: 'Experiencing worry or unease about something uncertain' },
                    { word: 'nervous', definition: 'Apprehensive or uneasy; lacking confidence' },
                    { word: 'worried', definition: 'Feeling troubled or concerned about something' },
                    { word: 'panicked', definition: 'Affected by sudden overwhelming fear' },
                    { word: 'terrified', definition: 'Filled with extreme fear; very frightened' },
                    { word: 'dread', definition: 'Anticipating or fearing something bad will happen' },
                    { word: 'alarmed', definition: 'Worried or frightened about a situation' },
                    { word: 'paranoid', definition: 'Extremely suspicious; fearing hidden dangers' },
                    { word: 'insecure', definition: 'Not confident about oneself; lacking self-assurance' },
                    { word: 'vulnerable', definition: 'Exposed to emotional hurt; feeling unsafe' },
                    { word: 'apprehensive', definition: 'Anxious or fearful that something bad might happen' },
                    { word: 'uncertain', definition: 'Not knowing what will happen; lacking confidence' }
                ]
            },
            overwhelmed: {
                title: '😵 Overwhelmed / Stressed',
                description: 'Emotions from feeling unable to cope with demands or complexity',
                feelings: [
                    { word: 'overwhelmed', definition: 'Overcome with emotion or unable to cope' },
                    { word: 'stressed', definition: 'Under mental or emotional strain' },
                    { word: 'burnt out', definition: 'Exhausted from prolonged stress or overwork' },
                    { word: 'exhausted', definition: 'Very tired; completely drained of energy' },
                    { word: 'scattered', definition: 'Unable to focus; thoughts all over the place' },
                    { word: 'confused', definition: 'Unable to understand or think clearly' },
                    { word: 'lost', definition: 'Feeling uncertain about direction or purpose' },
                    { word: 'disoriented', definition: 'Unable to find one\'s bearings; confused about situation' },
                    { word: 'frazzled', definition: 'Extremely tired and stressed out' },
                    { word: 'swamped', definition: 'Overwhelmed with too much to do or handle' },
                    { word: 'torn', definition: 'Pulled in different directions; conflicted' },
                    { word: 'helpless', definition: 'Unable to help oneself; lacking power to do something' },
                    { word: 'powerless', definition: 'Lacking the ability or strength to do something' },
                    { word: 'desperate', definition: 'Feeling hopeless and in urgent need of help' }
                ]
            },
            calm: {
                title: '🧘 Calm / Peaceful',
                description: 'Positive emotional states of tranquility, stability, and inner peace',
                feelings: [
                    { word: 'calm', definition: 'Free from agitation; peaceful and tranquil' },
                    { word: 'peaceful', definition: 'Free from war, conflict, or disturbance' },
                    { word: 'relaxed', definition: 'Free from tension; at ease' },
                    { word: 'serene', definition: 'Calm, peaceful, and untroubled' },
                    { word: 'tranquil', definition: 'Free from disturbance; calm' },
                    { word: 'content', definition: 'Satisfied and not wanting more; at peace' },
                    { word: 'composed', definition: 'Calm and in control of emotions' },
                    { word: 'centered', definition: 'Emotionally balanced and grounded' },
                    { word: 'grounded', definition: 'Feeling stable, secure, and connected to the present' },
                    { word: 'still', definition: 'Peacefully quiet; mentally undisturbed' },
                    { word: 'at ease', definition: 'Free from worry or difficulty; comfortable' },
                    { word: 'balanced', definition: 'Emotionally stable and proportionate' },
                    { word: 'secure', definition: 'Feeling safe and confident' },
                    { word: 'stable', definition: 'Not changing or fluctuating; steady and reliable' }
                ]
            }
        };

        // Comprehensive Needs Database organized by category
        this.NEEDS_BY_CATEGORY = {
            connection: {
                category: 'Connection for Relationships',
                icon: '🤝',
                description: 'Needs related to closeness, belonging, and meaningful relationships',
                needs: [
                    { name: 'connection', definition: 'Being close to others; feeling part of a community' },
                    { name: 'intimacy', definition: 'Deep emotional or physical closeness with others' },
                    { name: 'belonging', definition: 'Feeling accepted and part of a group' },
                    { name: 'love', definition: 'Giving and receiving affection and care' },
                    { name: 'acceptance', definition: 'Being welcomed and valued as you are' },
                    { name: 'understanding', definition: 'Being heard and comprehended by others' },
                    { name: 'community', definition: 'Being part of a group with shared values' },
                    { name: 'touch', definition: 'Physical contact and affection' },
                    { name: 'friendship', definition: 'Bonds of companionship and mutual care' },
                    { name: 'inclusion', definition: 'Being included and involved in group activities' }
                ]
            },
            autonomy: {
                category: 'Autonomy & Independence',
                icon: '🦁',
                description: 'Needs related to freedom, self-direction, and personal agency',
                needs: [
                    { name: 'autonomy', definition: 'Freedom to make your own choices and decisions' },
                    { name: 'independence', definition: 'Ability to manage yourself without dependence on others' },
                    { name: 'freedom', definition: 'Liberty to act according to your own will' },
                    { name: 'choice', definition: 'Ability to select from options without being forced' },
                    { name: 'control', definition: 'Power to influence your own life and circumstances' },
                    { name: 'self-expression', definition: 'Ability to share your thoughts, feelings, and identity' },
                    { name: 'creativity', definition: 'Freedom to generate and explore new ideas' },
                    { name: 'self-determination', definition: 'Ability to determine your own course of action' },
                    { name: 'space', definition: 'Physical and emotional room for yourself' },
                    { name: 'challenge', definition: 'Opportunity to test your abilities and grow' }
                ]
            },
            rest: {
                category: 'Rest & Restoration',
                icon: '😴',
                description: 'Needs related to recovery, peace, and freedom from demand',
                needs: [
                    { name: 'rest', definition: 'Time to relax and recover from activity or stress' },
                    { name: 'peace', definition: 'Quietness and freedom from conflict or disturbance' },
                    { name: 'quiet', definition: 'Absence of noise; calm silence' },
                    { name: 'ease', definition: 'Freedom from pain, discomfort, or difficulty' },
                    { name: 'relaxation', definition: 'State of mental and physical ease' },
                    { name: 'sleep', definition: 'Natural state of rest to restore energy' },
                    { name: 'solitude', definition: 'Time alone with yourself' },
                    { name: 'breathing room', definition: 'Space to pause and not be overwhelmed' },
                    { name: 'simplicity', definition: 'Freedom from unnecessary complexity' },
                    { name: 'leisure', definition: 'Free time for enjoyment and relaxation' }
                ]
            },
            safety: {
                category: 'Safety & Security',
                icon: '🛡️',
                description: 'Needs related to protection, stability, and feeling secure',
                needs: [
                    { name: 'safety', definition: 'Freedom from physical or emotional danger' },
                    { name: 'security', definition: 'Feeling confident and protected from harm' },
                    { name: 'stability', definition: 'Consistency and predictability in life' },
                    { name: 'trust', definition: 'Confidence that others will keep your needs in mind' },
                    { name: 'reliability', definition: 'Dependence on consistency from others' },
                    { name: 'protection', definition: 'Defense against harm or threat' },
                    { name: 'order', definition: 'Clarity and organization in your environment' },
                    { name: 'predictability', definition: 'Ability to anticipate what will happen' },
                    { name: 'honesty', definition: 'Truthfulness and authenticity in relationships' },
                    { name: 'integrity', definition: 'Alignment between words and actions' }
                ]
            },
            respect: {
                category: 'Respect & Recognition',
                icon: '👑',
                description: 'Needs related to being valued, honored, and acknowledged',
                needs: [
                    { name: 'respect', definition: 'Being valued and honored for who you are' },
                    { name: 'recognition', definition: 'Being acknowledged and appreciated for efforts' },
                    { name: 'appreciation', definition: 'Gratitude and acknowledgment from others' },
                    { name: 'acknowledgment', definition: 'Being recognized and seen by others' },
                    { name: 'validation', definition: 'Confirmation that your feelings and needs matter' },
                    { name: 'esteem', definition: 'Being held in high regard; self-worth' },
                    { name: 'dignity', definition: 'Being treated with honor and worthiness' },
                    { name: 'fairness', definition: 'Just and impartial treatment' },
                    { name: 'equality', definition: 'Being treated as equally important' },
                    { name: 'admiration', definition: 'Being viewed with wonder and approval' }
                ]
            },
            growth: {
                category: 'Growth & Learning',
                icon: '🌱',
                description: 'Needs related to development, learning, and self-improvement',
                needs: [
                    { name: 'growth', definition: 'Development and positive change over time' },
                    { name: 'learning', definition: 'Gaining knowledge and new skills' },
                    { name: 'progress', definition: 'Moving forward toward goals and improvement' },
                    { name: 'development', definition: 'Personal evolution and maturation' },
                    { name: 'accomplishment', definition: 'Achieving goals and completing tasks' },
                    { name: 'competence', definition: 'Ability to do things well and effectively' },
                    { name: 'mastery', definition: 'Expertise and skill in an area' },
                    { name: 'purpose', definition: 'A sense of meaning and direction in life' },
                    { name: 'contribution', definition: 'Making a meaningful difference' },
                    { name: 'exploration', definition: 'Freedom to discover and investigate' }
                ]
            },
            joy: {
                category: 'Joy & Celebration',
                icon: '🎉',
                description: 'Needs related to pleasure, delight, and positive experiences',
                needs: [
                    { name: 'joy', definition: 'Feeling of great pleasure and happiness' },
                    { name: 'celebration', definition: 'Acknowledgment and enjoyment of special moments' },
                    { name: 'play', definition: 'Engaging in activities purely for enjoyment' },
                    { name: 'fun', definition: 'Enjoyment and amusement' },
                    { name: 'pleasure', definition: 'Agreeable feelings and sensations' },
                    { name: 'laughter', definition: 'Expression of joy and humor' },
                    { name: 'delight', definition: 'High degree of pleasure and satisfaction' },
                    { name: 'beauty', definition: 'Appreciation of aesthetics and harmony' },
                    { name: 'inspiration', definition: 'Feeling moved to create or act' },
                    { name: 'awe', definition: 'Wonder and amazement at something profound' }
                ]
            },
            health: {
                category: 'Health & Well-being',
                icon: '💪',
                description: 'Needs related to physical, mental, and emotional health',
                needs: [
                    { name: 'health', definition: 'Physical and mental well-being' },
                    { name: 'nourishment', definition: 'Proper nutrition and care for body' },
                    { name: 'movement', definition: 'Physical activity and exercise' },
                    { name: 'vitality', definition: 'Energy and liveliness' },
                    { name: 'healing', definition: 'Recovery and mending from illness or hurt' },
                    { name: 'well-being', definition: 'State of being comfortable and healthy' },
                    { name: 'balance', definition: 'Equilibrium between different life areas' },
                    { name: 'harmony', definition: 'Smooth functioning of all parts' },
                    { name: 'wholeness', definition: 'Integration of all parts into a unified whole' },
                    { name: 'sustenance', definition: 'What keeps you going physically and emotionally' }
                ]
            }
        };
    }

    /**
     * Get explanation for an NVC component
     * @param {string} component - 'observation', 'feeling', 'need', or 'request'
     * @returns {object} - Explanation data
     */
    getComponentExplanation(component) {
        return this.COMPONENT_EXPLANATIONS[component.toLowerCase()] || null;
    }

    /**
     * Get all feelings organized by category
     * @returns {object} - Feelings by category
     */
    getFeelingsByCategory() {
        return this.FEELINGS_BY_CATEGORY;
    }

    /**
     * Get all needs organized by category
     * @returns {object} - Needs by category
     */
    getNeedsByCategory() {
        return this.NEEDS_BY_CATEGORY;
    }

    /**
     * Search feelings by keyword
     * @param {string} keyword - Search term
     * @returns {array} - Matching feelings with categories
     */
    searchFeelings(keyword) {
        const results = [];
        const lowerKeyword = keyword.toLowerCase();

        for (const [categoryKey, categoryData] of Object.entries(this.FEELINGS_BY_CATEGORY)) {
            const matchingFeelings = categoryData.feelings.filter(
                f => f.word.includes(lowerKeyword) || f.definition.toLowerCase().includes(lowerKeyword)
            );
            if (matchingFeelings.length > 0) {
                results.push({
                    category: categoryData.title,
                    feelings: matchingFeelings
                });
            }
        }
        return results;
    }

    /**
     * Search needs by keyword
     * @param {string} keyword - Search term
     * @returns {array} - Matching needs with categories
     */
    searchNeeds(keyword) {
        const results = [];
        const lowerKeyword = keyword.toLowerCase();

        for (const [categoryKey, categoryData] of Object.entries(this.NEEDS_BY_CATEGORY)) {
            const matchingNeeds = categoryData.needs.filter(
                n => n.name.includes(lowerKeyword) || n.definition.toLowerCase().includes(lowerKeyword)
            );
            if (matchingNeeds.length > 0) {
                results.push({
                    category: categoryData.category,
                    icon: categoryData.icon,
                    needs: matchingNeeds
                });
            }
        }
        return results;
    }

    /**
     * Get a specific feeling's details
     * @param {string} feeling - The feeling word
     * @returns {object} - Feeling data with category
     */
    getFeelingDetails(feeling) {
        const lowerFeeling = feeling.toLowerCase();
        for (const [categoryKey, categoryData] of Object.entries(this.FEELINGS_BY_CATEGORY)) {
            const found = categoryData.feelings.find(f => f.word === lowerFeeling);
            if (found) {
                return {
                    ...found,
                    category: categoryData.title,
                    description: categoryData.description
                };
            }
        }
        return null;
    }

    /**
     * Get a specific need's details
     * @param {string} need - The need name (or part of it)
     * @returns {object} - Need data with category
     */
    getNeedDetails(need) {
        const lowerNeed = need.toLowerCase();
        for (const [categoryKey, categoryData] of Object.entries(this.NEEDS_BY_CATEGORY)) {
            const found = categoryData.needs.find(n => n.name.toLowerCase().includes(lowerNeed));
            if (found) {
                return {
                    ...found,
                    category: categoryData.category,
                    icon: categoryData.icon,
                    description: categoryData.description
                };
            }
        }
        return null;
    }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NVCReference;
}
