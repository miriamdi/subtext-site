/**
 * PIPELINE INTEGRATION GUIDE
 * 
 * Clean Architecture: Interpretation → Transformation → UI
 * =========================================================
 * 
 * THREE ROLES:
 * 
 * 1. agent.js
 *    - INTERPRETATION LAYER (What is happening internally?)
 *    - Analyzes emotional tone from AUDIO FEATURES
 *    - Uses energy level + sentiment to classify emotion
 *    - Generates reflective observations about tone/delivery
 *    - Template-based: "Your voice carries intensity..."
 *    - Called by: pipeline.analyzeEmotionalTone()
 * 
 * 2. nvc.js
 *    - TRANSFORMATION LAYER (How to express it clearly?)
 *    - Processes RAW TEXT from user
 *    - Removes emotional language → clean observation
 *    - Detects feeling from keywords
 *    - Maps feeling → underlying need
 *    - Generates polite, actionable request
 *    - Supports EDITING with auto-update
 *    - Called by: pipeline.transformToNVC()
 * 
 * 3. pipeline.js
 *    - ORCHESTRATION LAYER (Coordinates both)
 *    - Stage 1: analyzeEmotionalTone() → agent.js
 *    - Stage 2: transformToNVC() → nvc.js
 *    - Manages data flow between stages
 *    - Exposes edit methods for UI
 *    - Called by: app.js
 * 
 * =========================================================
 * DATA FLOW
 * =========================================================
 * 
 * VOICE + TEXT INPUT
 *      ↓
 * [app.js] recordAudio() + textInput()
 *      ↓
 * [app.js] analyzeEmotion()
 *      ↓
 * [pipeline.js] process(emotion, audioFeatures, text)
 *      ↓
 * STAGE 1: INTERPRETATION
 * [agent.js] generateNVC()
 *      → Returns: observation, feeling, need, request (reflection-based)
 *      ↓
 * STAGE 2: TRANSFORMATION
 * [nvc.js] process(userText)
 *      → Returns: observation, feeling, need, request (structured, editable)
 *      ↓
 * [pipeline.js] Returns both stages
 *      ↓
 * [app.js] Displays NVC output
 *      ↓
 * USER EDITS FIELDS
 *      ↓
 * [app.js] editNVCObservation() / editNVCFeeling() / editNVCNeed()
 *      ↓
 * [pipeline.js] editObservation() / editFeeling() / editNeed()
 *      ↓
 * [nvc.js] updateRequest() - AUTO-RECALCULATES REQUEST
 *      ↓
 * [app.js] displayNVCResults() - UI UPDATES
 * 
 * =========================================================
 * USAGE IN CODE
 * =========================================================
 * 
 * // In app.js, already initialized:
 * this.pipeline = new SubtextPipeline();
 * 
 * // Full pipeline processing:
 * const result = this.pipeline.process(
 *     emotion,           // from emotionInference
 *     audioFeatures,     // from audioManager
 *     userText,          // from textInput
 *     userText
 * );
 * // result.stage1.data = agent's interpretation
 * // result.stage2.data = nvc's structure (editable)
 * 
 * // User edits (auto-updates request):
 * this.pipeline.editObservation("new observation");
 * this.pipeline.editFeeling("frustrated");
 * this.pipeline.editNeed("understanding");
 * 
 * // Get current NVC state:
 * const nvc = this.pipeline.getNVCOutput();
 * 
 * =========================================================
 * KEY FEATURES
 * =========================================================
 * 
 * ✓ Clean separation of concerns
 * ✓ agent.js stays focused on emotional analysis
 * ✓ nvc.js stays focused on NVC structure
 * ✓ pipeline.js coordinates both
 * ✓ User can edit observation, feeling, need
 * ✓ Request automatically updates on any edit
 * ✓ Modular and testable
 * ✓ Reusable in different contexts
 * 
 * =========================================================
 * SCRIPT LOAD ORDER (index.html)
 * =========================================================
 * 
 * <script src="audio.js"></script>
 * <script src="analysis.js"></script>
 * <script src="agent.js"></script>          ← Interpretation
 * <script src="nvc.js"></script>            ← Transformation
 * <script src="pipeline.js"></script>       ← Orchestration (needs above two)
 * <script src="translation.js"></script>
 * <script src="app.js"></script>            ← Uses pipeline
 * 
 */
