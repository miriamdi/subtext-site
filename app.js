/**
 * app.js
 * Main application controller
 * Handles UI interactions and orchestrates emotion analysis
 */

class SubtextApp {
    constructor() {
        this.recordingDuration = 0;
        this.timerInterval = null;
        this.audioFeatures = null;
        this.emotion = null;
        this.nvcResult = null;
        this.translationResult = null;
        this.analyzedText = null; // Text used for analysis (translated if needed)

        // Initialize the processing pipeline
        this.pipeline = new SubtextPipeline();

        this.initializeElements();
        this.attachEventListeners();
    }

    /**
     * Initialize DOM element references
     */
    initializeElements() {
        // Audio controls
        this.recordBtn = document.getElementById('recordBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.recordingTime = document.getElementById('recordingTime');
        this.recordingComplete = document.getElementById('recordingComplete');
        this.timer = document.getElementById('timer');

        // Text input
        this.textInput = document.getElementById('textInput');

        // Translation panel
        this.translationPanel = document.getElementById('translationPanel');
        this.detectedLanguage = document.getElementById('detectedLanguage');
        this.translatedTextDisplay = document.getElementById('translatedTextDisplay');

        // Analyze button
        this.analyzeBtn = document.getElementById('analyzeBtn');

        // Features panel
        this.featuresPanel = document.getElementById('featuresPanel');
        this.volumeFill = document.getElementById('volumeFill');
        this.volumeValue = document.getElementById('volumeValue');
        this.pitchFill = document.getElementById('pitchFill');
        this.pitchValue = document.getElementById('pitchValue');
        this.rateFill = document.getElementById('rateFill');
        this.rateValue = document.getElementById('rateValue');
        this.expressFill = document.getElementById('expressFill');
        this.expressValue = document.getElementById('expressValue');

        // Emotion panel
        this.emotionPanel = document.getElementById('emotionPanel');
        this.emotionPoint = document.getElementById('emotionPoint');
        this.valenceValue = document.getElementById('valenceValue');
        this.arousalValue = document.getElementById('arousalValue');

        // Results panel
        this.resultsPanel = document.getElementById('resultsPanel');
        this.nvcObservation = document.getElementById('nvcObservation');
        this.nvcFeeling = document.getElementById('nvcFeeling');
        this.nvcNeed = document.getElementById('nvcNeed');
        this.nvcRequest = document.getElementById('nvcRequest');

        // Clear button
        this.clearSection = document.getElementById('clearSection');
        this.clearBtn = document.getElementById('clearBtn');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        this.recordBtn.addEventListener('click', () => this.startRecording());
        this.stopBtn.addEventListener('click', () => this.stopRecording());
        this.analyzeBtn.addEventListener('click', () => this.analyzeEmotion());
        this.clearBtn.addEventListener('click', () => this.resetApp());

        // Attach listeners to editable NVC fields
        this.nvcObservation.addEventListener('blur', (e) => this.handleNVCFieldEdit(e));
        this.nvcFeeling.addEventListener('blur', (e) => this.handleNVCFieldEdit(e));
        this.nvcNeed.addEventListener('blur', (e) => this.handleNVCFieldEdit(e));

        // Also handle immediate updates while typing (optional)
        this.nvcObservation.addEventListener('input', (e) => this.handleNVCFieldInput(e));
        this.nvcFeeling.addEventListener('input', (e) => this.handleNVCFieldInput(e));
        this.nvcNeed.addEventListener('input', (e) => this.handleNVCFieldInput(e));
    }

    /**
     * Start recording audio
     */
    async startRecording() {
        const success = await audioManager.startRecording();

        if (success) {
            this.recordBtn.disabled = true;
            this.stopBtn.disabled = false;
            this.recordingTime.style.display = 'inline';
            this.recordingComplete.style.display = 'none';
            this.analyzeBtn.disabled = true;

            this.recordingDuration = 0;
            this.startTimer();

            // Set up speech recognition callback
            audioManager.onTextRecognized = (text, isInterim) => {
                this.updateTextFromSpeech(text, isInterim);
            };

            console.log('Recording started...');
        }
    }

    /**
     * Stop recording audio
     */
    stopRecording() {
        const audioData = audioManager.stopRecording();
        this.stopTimer();

        this.recordBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.recordingTime.style.display = 'none';
        this.recordingComplete.style.display = 'inline';
        this.analyzeBtn.disabled = false;

        // Extract features
        this.audioFeatures = audioManager.extractFeatures(audioData);
        this.displayAudioFeatures();

        // Clear callback
        audioManager.onTextRecognized = null;

        console.log('Recording stopped. Features:', this.audioFeatures);
    }

    /**
     * Update text input with recognized speech
     */
    updateTextFromSpeech(text, isInterim) {
        if (isInterim) {
            // Show interim (grayed out) - just display the final recognized text
            // The interim is shown with a visual indicator
            this.textInput.value = text;
            // Optional: add a subtle style to show it's still being recognized
            this.textInput.style.opacity = '0.8';
        } else {
            // Final result - keep it
            this.textInput.value = text;
            this.textInput.style.opacity = '1';
        }
    }

    /**
     * Start recording timer
     */
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.recordingDuration++;
            this.timer.textContent = audioManager.formatTime(this.recordingDuration);
        }, 1000);
    }

    /**
     * Stop recording timer
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    /**
     * Display audio features on UI
     */
    displayAudioFeatures() {
        if (!this.audioFeatures) return;

        const norm = emotionInference.normalizeFeatures(this.audioFeatures);

        // Volume
        this.volumeFill.style.width = (norm.volume * 100) + '%';
        this.volumeValue.textContent = (norm.volume * 100).toFixed(0) + '%';

        // Pitch
        this.pitchFill.style.width = (norm.pitch * 100) + '%';
        this.pitchValue.textContent = this.audioFeatures.pitch.toFixed(0) + ' Hz';

        // Speech Rate
        this.rateFill.style.width = (norm.speechRate * 100) + '%';
        this.rateValue.textContent = (norm.speechRate * 100).toFixed(0) + '%';

        // Expressiveness
        this.expressFill.style.width = (norm.expressiveness * 100) + '%';
        this.expressValue.textContent = (norm.expressiveness * 100).toFixed(0) + '%';

        this.featuresPanel.style.display = 'block';
    }

    /**
     * Analyze emotion from audio + text
     */
    async analyzeEmotion() {
        const text = this.textInput.value.trim();
        console.log('[APP-DEBUG] analyzeEmotion called with text:', text);

        // Require either audio or text
        if (!this.audioFeatures && text.length === 0) {
            alert('Please record audio or enter text (or both) before analyzing.');
            return;
        }

        // Disable button during processing
        this.analyzeBtn.disabled = true;
        this.analyzeBtn.textContent = '⏳ Translating & Analyzing...';

        try {
            console.log('[APP-DEBUG] Starting translation process...');
            
            // Translate text to English if needed
            let translationResult;
            try {
                translationResult = await translationManager.translateToEnglish(text);
                console.log('[APP-DEBUG] Translation promise resolved:', translationResult);
            } catch (translateError) {
                console.error('[APP-DEBUG] Translation error caught:', translateError);
                // Fallback: use original text
                translationResult = {
                    success: false,
                    original: text,
                    translated: text,
                    language: 'unknown',
                    isTranslated: false,
                    error: translateError.message
                };
            }
            
            this.translationResult = translationResult;
            this.analyzedText = this.translationResult.translated;

            console.log('[APP-DEBUG] Will analyze text:', this.analyzedText);
            console.log('[APP-DEBUG] Translation was:', this.translationResult.isTranslated);

            // Display translation if text was translated
            if (this.translationResult.isTranslated) {
                this.displayTranslation(this.translationResult);
            } else {
                this.translationPanel.style.display = 'none';
            }

            // Perform emotion inference using the English (translated) text
            console.log('[APP-DEBUG] Running emotion inference...');
            this.emotion = emotionInference.inferEmotion(this.audioFeatures, this.analyzedText);
            console.log('[APP-DEBUG] Emotion result:', this.emotion);

            // Generate NVC response using the pipeline
            // Pipeline Stage 1: Analyze emotional tone from audio
            // Pipeline Stage 2: Transform text to NVC structure
            console.log('[APP-DEBUG] Processing through pipeline...');
            const pipelineResult = this.pipeline.process(
                this.emotion,
                this.audioFeatures,
                this.analyzedText,
                this.analyzedText
            );
            
            this.nvcResult = pipelineResult.stage2.data;
            console.log('[APP-DEBUG] Pipeline complete:', pipelineResult);

            // Display results
            this.displayEmotionState();
            this.displayNVCResults();
            this.displayClearButton();
        } catch (error) {
            console.error('[APP-DEBUG] Overall error:', error);
            alert('Error during analysis. Please try again.');
        } finally {
            // Re-enable button
            this.analyzeBtn.disabled = false;
            this.analyzeBtn.textContent = '✨ Analyze & Interpret';
        }
    }

    /**
     * Display translation information
     */
    displayTranslation(translationResult) {
        if (!translationResult.isTranslated) {
            this.translationPanel.style.display = 'none';
            console.log('[App] No translation needed');
            return;
        }

        const langName = translationManager.getLanguageName(translationResult.language);
        
        this.detectedLanguage.textContent = langName;
        this.translatedTextDisplay.textContent = translationResult.translated;
        this.translationPanel.style.display = 'block';

        console.log('[App] Translation displayed:', {
            original: translationResult.original,
            translated: translationResult.translated,
            language: translationResult.language,
            languageName: langName
        });
    }

    /**
     * Display emotion state on 2D plane
     */
    displayEmotionState() {
        const { valence, arousal } = this.emotion;

        // Position on 2D plane (300x300, centered at 150,150)
        const x = 150 + (valence * 150); // valence: -1 to 1 → 0 to 300
        const y = 150 - (arousal * 150); // arousal: 0 to 1 → 150 to 0 (inverted for display)

        this.emotionPoint.style.left = x + 'px';
        this.emotionPoint.style.top = y + 'px';

        // Display values
        const valenceLabel = valence > 0 ? 'Positive' : valence < 0 ? 'Negative' : 'Neutral';
        const arousalLabel = arousal > 0.6 ? 'High Energy' : arousal < 0.4 ? 'Low Energy' : 'Balanced';

        this.valenceValue.textContent = `${valenceLabel} (${(valence * 100).toFixed(0)})`;
        this.arousalValue.textContent = `${arousalLabel} (${(arousal * 100).toFixed(0)})`;

        this.emotionPanel.style.display = 'block';

        console.log('Emotion State:', {
            valence: valence.toFixed(2),
            arousal: arousal.toFixed(2)
        });
    }

    /**
     * Display NVC results
     */
    displayNVCResults() {
        const nvc = this.nvcResult;

        this.nvcObservation.textContent = nvc.observation;
        this.nvcFeeling.textContent = nvc.feeling;
        this.nvcNeed.textContent = nvc.need;
        this.nvcRequest.textContent = nvc.request;

        this.resultsPanel.style.display = 'block';

        console.log('NVC Generated:', nvc);
    }

    /**
     * User edits observation - request auto-updates
     */
    editNVCObservation(newObservation) {
        console.log('[App] User editing observation:', newObservation);
        const updated = this.pipeline.editObservation(newObservation);
        this.nvcResult = updated;
        this.displayNVCResults();
    }

    /**
     * User edits feeling - need and request auto-update
     */
    editNVCFeeling(newFeeling) {
        console.log('[App] User editing feeling:', newFeeling);
        const updated = this.pipeline.editFeeling(newFeeling);
        this.nvcResult = updated;
        this.displayNVCResults();
    }

    /**
     * User edits need - request auto-updates
     */
    editNVCNeed(newNeed) {
        console.log('[App] User editing need:', newNeed);
        const updated = this.pipeline.editNeed(newNeed);
        this.nvcResult = updated;
        this.displayNVCResults();
    }

    /**
     * Handle NVC field blur event - calls appropriate edit method
     */
    handleNVCFieldEdit(event) {
        const field = event.target.getAttribute('data-field');
        const newValue = event.target.textContent.trim();

        if (!newValue) return; // Don't update if empty

        console.log('[App] NVC field edited:', field, newValue);

        if (field === 'observation') {
            this.editNVCObservation(newValue);
        } else if (field === 'feeling') {
            this.editNVCFeeling(newValue);
        } else if (field === 'need') {
            this.editNVCNeed(newValue);
        }
    }

    /**
     * Handle NVC field input event - live updates while typing
     */
    handleNVCFieldInput(event) {
        const field = event.target.getAttribute('data-field');
        const newValue = event.target.textContent.trim();

        if (!newValue) return;

        // For feeling field, only update if it's a valid feeling
        if (field === 'feeling') {
            if (!this.pipeline.nvc.FEELING_LIST.includes(newValue.toLowerCase())) {
                return; // Don't update if not a valid feeling
            }
        }

        console.log('[App] NVC field live update:', field);
        
        // Update immediately without waiting for blur
        if (field === 'observation') {
            this.editNVCObservation(newValue);
        } else if (field === 'feeling') {
            this.editNVCFeeling(newValue);
        } else if (field === 'need') {
            this.editNVCNeed(newValue);
        }
    }

    /**
     * Show clear/reset button
     */
    displayClearButton() {
        this.clearSection.style.display = 'block';
    }

    /**
     * Reset app to initial state
     */
    resetApp() {
        // Clear inputs
        this.textInput.value = '';
        this.textInput.style.opacity = '1';

        // Hide panels
        this.featuresPanel.style.display = 'none';
        this.emotionPanel.style.display = 'none';
        this.resultsPanel.style.display = 'none';
        this.translationPanel.style.display = 'none';
        this.clearSection.style.display = 'none';
        this.recordingComplete.style.display = 'none';
        this.recordingTime.style.display = 'none';

        // Reset state
        this.audioFeatures = null;
        this.emotion = null;
        this.nvcResult = null;
        this.translationResult = null;
        this.analyzedText = null;

        // Reset pipeline
        this.pipeline.reset();

        // Clear speech recognition callback
        audioManager.onTextRecognized = null;

        // Reset buttons
        this.recordBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.analyzeBtn.disabled = false;

        console.log('App reset');
    }
}

/**
 * Initialize app when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Subtext App Initializing...');
    const app = new SubtextApp();
    console.log('Subtext App Ready!');

    // For debugging: expose app globally
    window.subtextApp = app;
    window.audioManager = audioManager;
    window.emotionInference = emotionInference;
    window.nvcAgent = nvcAgent;
});

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
    audioManager.cleanup();
});
