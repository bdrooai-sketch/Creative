# ElektroLab - Volledige Code

Upload deze 6 bestanden naar je GitHub repository. Maak voor elk bestand een nieuw bestand aan met de exacte naam.

---

## 1. `index.html`

```html
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elektronica Leren - Interactieve Simulator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="app-container">
        <nav class="sidebar">
            <div class="logo">
                <span class="logo-icon">⚡</span>
                <h1>ElektroLab</h1>
            </div>
            <ul class="nav-menu">
                <li class="nav-item active" data-lesson="intro">
                    <span class="nav-icon">🏠</span>
                    <span>Introductie</span>
                </li>
                <li class="nav-item" data-lesson="basics">
                    <span class="nav-icon">💡</span>
                    <span>Spanning & Stroom</span>
                </li>
                <li class="nav-item" data-lesson="ohm">
                    <span class="nav-icon">Ω</span>
                    <span>Wet van Ohm</span>
                </li>
                <li class="nav-item" data-lesson="led">
                    <span class="nav-icon">🔴</span>
                    <span>LED Circuits</span>
                </li>
                <li class="nav-item" data-lesson="series-parallel">
                    <span class="nav-icon">🔗</span>
                    <span>Serie & Parallel</span>
                </li>
                <li class="nav-item" data-lesson="capacitor">
                    <span class="nav-icon">⚡</span>
                    <span>Condensatoren</span>
                </li>
                <li class="nav-item" data-lesson="builder">
                    <span class="nav-icon">🔧</span>
                    <span>Circuit Builder</span>
                </li>
            </ul>
            <div class="progress-section">
                <h3>Voortgang</h3>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
                <span class="progress-text" id="progress-text">0% voltooid</span>
            </div>
        </nav>

        <main class="main-content">
            <section class="lesson" id="lesson-intro" style="display: block;">
                <div class="lesson-header">
                    <h2>Welkom bij ElektroLab!</h2>
                    <p class="subtitle">Leer elektronica op een visuele en interactieve manier</p>
                </div>
                <div class="lesson-content">
                    <div class="intro-cards">
                        <div class="intro-card">
                            <div class="card-icon">📚</div>
                            <h3>Leer de Basis</h3>
                            <p>Begin met spanning, stroom en weerstand - de fundamenten van elektronica.</p>
                        </div>
                        <div class="intro-card">
                            <div class="card-icon">🎮</div>
                            <h3>Interactieve Simulaties</h3>
                            <p>Experimenteer met virtuele circuits en zie direct wat er gebeurt.</p>
                        </div>
                        <div class="intro-card">
                            <div class="card-icon">🎬</div>
                            <h3>Visuele Animaties</h3>
                            <p>Zie hoe elektronen bewegen en begrijp hoe circuits werken.</p>
                        </div>
                        <div class="intro-card">
                            <div class="card-icon">🔧</div>
                            <h3>Bouw Je Eigen Circuits</h3>
                            <p>Gebruik de circuit builder om je eigen creaties te maken.</p>
                        </div>
                    </div>
                    <div class="start-section">
                        <button class="start-button" onclick="navigateToLesson('basics')">
                            Start met Leren →
                        </button>
                    </div>
                    <div class="intro-animation">
                        <canvas id="intro-canvas" width="600" height="300"></canvas>
                    </div>
                </div>
            </section>

            <section class="lesson" id="lesson-basics">
                <div class="lesson-header">
                    <h2>Les 1: Spanning, Stroom en Weerstand</h2>
                    <p class="subtitle">De drie fundamentele concepten van elektronica</p>
                </div>
                <div class="lesson-content">
                    <div class="concept-section">
                        <div class="concept-card">
                            <h3>⚡ Spanning (Voltage)</h3>
                            <p>Spanning is de "druk" die elektronen door een circuit duwt. Denk aan water in een buis - hoe hoger het waterreservoir, hoe meer druk.</p>
                            <div class="unit-badge">Eenheid: Volt (V)</div>
                        </div>
                        <div class="concept-card">
                            <h3>💧 Stroom (Current)</h3>
                            <p>Stroom is de hoeveelheid elektronen die per seconde door een draad stroomt. Zoals de hoeveelheid water die door een buis stroomt.</p>
                            <div class="unit-badge">Eenheid: Ampère (A)</div>
                        </div>
                        <div class="concept-card">
                            <h3>🚧 Weerstand (Resistance)</h3>
                            <p>Weerstand is hoe moeilijk het is voor stroom om te vloeien. Zoals een smalle buis die de waterstroom beperkt.</p>
                            <div class="unit-badge">Eenheid: Ohm (Ω)</div>
                        </div>
                    </div>

                    <div class="simulation-section">
                        <h3>🎬 Water-Elektriciteit Analogie</h3>
                        <p>Klik op de knoppen om te zien hoe spanning en weerstand de stroomsterkte beïnvloeden.</p>
                        <div class="simulation-container">
                            <canvas id="water-canvas" width="700" height="400"></canvas>
                            <div class="simulation-controls">
                                <div class="control-group">
                                    <label>Spanning (Waterhoogte)</label>
                                    <input type="range" id="voltage-slider" min="1" max="12" value="6">
                                    <span id="voltage-value">6V</span>
                                </div>
                                <div class="control-group">
                                    <label>Weerstand (Buisdiameter)</label>
                                    <input type="range" id="resistance-slider" min="100" max="1000" value="500">
                                    <span id="resistance-value">500Ω</span>
                                </div>
                                <div class="result-display">
                                    <span>Stroom: </span>
                                    <span id="current-value" class="highlight">12mA</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="electron-flow-section">
                        <h3>🔬 Elektronenstroom Visualisatie</h3>
                        <p>Zie hoe elektronen (blauwe bolletjes) door een circuit bewegen.</p>
                        <canvas id="electron-canvas" width="700" height="300"></canvas>
                        <div class="electron-controls">
                            <button id="electron-play" class="control-btn">▶ Start</button>
                            <button id="electron-pause" class="control-btn">⏸ Pauze</button>
                            <button id="electron-speed-up" class="control-btn">⏩ Sneller</button>
                            <button id="electron-slow-down" class="control-btn">⏪ Langzamer</button>
                        </div>
                    </div>

                    <button class="next-lesson-btn" onclick="navigateToLesson('ohm')">
                        Volgende Les: Wet van Ohm →
                    </button>
                </div>
            </section>

            <section class="lesson" id="lesson-ohm">
                <div class="lesson-header">
                    <h2>Les 2: De Wet van Ohm</h2>
                    <p class="subtitle">V = I × R - De belangrijkste formule in elektronica</p>
                </div>
                <div class="lesson-content">
                    <div class="formula-display">
                        <div class="formula-card main-formula">
                            <div class="formula">V = I × R</div>
                            <div class="formula-explanation">
                                <span class="var">V</span> = Spanning (Volt)
                                <span class="var">I</span> = Stroom (Ampère)
                                <span class="var">R</span> = Weerstand (Ohm)
                            </div>
                        </div>
                        <div class="formula-variants">
                            <div class="formula-card small">
                                <div class="formula">I = V ÷ R</div>
                                <p>Bereken stroom</p>
                            </div>
                            <div class="formula-card small">
                                <div class="formula">R = V ÷ I</div>
                                <p>Bereken weerstand</p>
                            </div>
                        </div>
                    </div>

                    <div class="ohm-triangle">
                        <h3>🔺 De Ohm Driehoek</h3>
                        <p>Klik op wat je wilt berekenen!</p>
                        <div class="triangle-container">
                            <svg id="ohm-triangle-svg" viewBox="0 0 200 180">
                                <polygon points="100,10 10,170 190,170" fill="none" stroke="#4ecdc4" stroke-width="3"/>
                                <line x1="10" y1="120" x2="190" y2="120" stroke="#4ecdc4" stroke-width="2"/>
                                <text x="100" y="70" text-anchor="middle" class="triangle-text" id="tri-v">V</text>
                                <text x="55" y="150" text-anchor="middle" class="triangle-text" id="tri-i">I</text>
                                <text x="145" y="150" text-anchor="middle" class="triangle-text" id="tri-r">R</text>
                                <circle cx="100" cy="55" r="25" fill="transparent" class="clickable-area" data-calc="v"/>
                                <circle cx="55" cy="140" r="25" fill="transparent" class="clickable-area" data-calc="i"/>
                                <circle cx="145" cy="140" r="25" fill="transparent" class="clickable-area" data-calc="r"/>
                            </svg>
                            <div class="triangle-result" id="triangle-result">
                                Klik op V, I of R om de formule te zien
                            </div>
                        </div>
                    </div>

                    <div class="ohm-calculator">
                        <h3>🧮 Interactieve Calculator</h3>
                        <div class="calculator-grid">
                            <div class="calc-input">
                                <label>Spanning (V)</label>
                                <input type="number" id="calc-voltage" placeholder="Volt" step="0.1">
                            </div>
                            <div class="calc-input">
                                <label>Stroom (mA)</label>
                                <input type="number" id="calc-current" placeholder="milliAmpère" step="0.1">
                            </div>
                            <div class="calc-input">
                                <label>Weerstand (Ω)</label>
                                <input type="number" id="calc-resistance" placeholder="Ohm" step="1">
                            </div>
                        </div>
                        <div class="calc-buttons">
                            <button onclick="calculateOhm('v')">Bereken V</button>
                            <button onclick="calculateOhm('i')">Bereken I</button>
                            <button onclick="calculateOhm('r')">Bereken R</button>
                        </div>
                        <div class="calc-result" id="ohm-calc-result"></div>
                    </div>

                    <div class="interactive-circuit">
                        <h3>🔌 Live Circuit Simulator</h3>
                        <p>Pas de spanning en weerstand aan en zie de stroom veranderen!</p>
                        <canvas id="ohm-circuit-canvas" width="700" height="350"></canvas>
                        <div class="circuit-controls">
                            <div class="control-group">
                                <label>Batterij Spanning</label>
                                <input type="range" id="ohm-voltage" min="1" max="24" value="9">
                                <span id="ohm-voltage-display">9V</span>
                            </div>
                            <div class="control-group">
                                <label>Weerstand</label>
                                <input type="range" id="ohm-resistance" min="100" max="10000" value="1000" step="100">
                                <span id="ohm-resistance-display">1kΩ</span>
                            </div>
                            <div class="live-results">
                                <div class="result-item">
                                    <span class="label">Stroom:</span>
                                    <span class="value" id="ohm-current-display">9mA</span>
                                </div>
                                <div class="result-item">
                                    <span class="label">Vermogen:</span>
                                    <span class="value" id="ohm-power-display">81mW</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="next-lesson-btn" onclick="navigateToLesson('led')">
                        Volgende Les: LED Circuits →
                    </button>
                </div>
            </section>

            <section class="lesson" id="lesson-led">
                <div class="lesson-header">
                    <h2>Les 3: LED Circuits</h2>
                    <p class="subtitle">Leer hoe je een LED veilig laat branden</p>
                </div>
                <div class="lesson-content">
                    <div class="led-intro">
                        <div class="led-info-card">
                            <h3>💡 Wat is een LED?</h3>
                            <p>LED staat voor <strong>Light Emitting Diode</strong> (lichtgevende diode). Een LED laat stroom maar in één richting door en produceert licht.</p>
                            <div class="led-symbol">
                                <svg viewBox="0 0 100 60">
                                    <line x1="10" y1="30" x2="30" y2="30" stroke="#fff" stroke-width="2"/>
                                    <polygon points="30,15 30,45 60,30" fill="none" stroke="#fff" stroke-width="2"/>
                                    <line x1="60" y1="15" x2="60" y2="45" stroke="#fff" stroke-width="2"/>
                                    <line x1="60" y1="30" x2="90" y2="30" stroke="#fff" stroke-width="2"/>
                                    <line x1="45" y1="10" x2="55" y2="0" stroke="#ff6b6b" stroke-width="2"/>
                                    <polygon points="55,0 50,5 55,5" fill="#ff6b6b"/>
                                    <line x1="55" y1="15" x2="65" y2="5" stroke="#ff6b6b" stroke-width="2"/>
                                    <polygon points="65,5 60,10 65,10" fill="#ff6b6b"/>
                                </svg>
                                <span>LED Symbool</span>
                            </div>
                        </div>
                        <div class="led-warning-card">
                            <h3>⚠️ Waarschuwing!</h3>
                            <p>Een LED heeft altijd een <strong>voorschakelweerstand</strong> nodig! Zonder weerstand gaat er te veel stroom door de LED en brandt deze door.</p>
                        </div>
                    </div>

                    <div class="led-calculator-section">
                        <h3>🧮 LED Voorschakelweerstand Calculator</h3>
                        <div class="led-formula">
                            <div class="formula">R = (V<sub>bron</sub> - V<sub>LED</sub>) ÷ I<sub>LED</sub></div>
                        </div>
                        <div class="led-calc-grid">
                            <div class="led-calc-input">
                                <label>Bronspanning (V)</label>
                                <input type="number" id="led-source-voltage" value="9" step="0.1">
                            </div>
                            <div class="led-calc-input">
                                <label>LED Kleur</label>
                                <select id="led-color">
                                    <option value="1.8" data-color="#ff0000">Rood (1.8V)</option>
                                    <option value="2.0" data-color="#ffaa00">Oranje (2.0V)</option>
                                    <option value="2.1" data-color="#ffff00">Geel (2.1V)</option>
                                    <option value="2.2" data-color="#00ff00">Groen (2.2V)</option>
                                    <option value="3.2" data-color="#0088ff">Blauw (3.2V)</option>
                                    <option value="3.2" data-color="#ffffff">Wit (3.2V)</option>
                                </select>
                            </div>
                            <div class="led-calc-input">
                                <label>LED Stroom (mA)</label>
                                <input type="number" id="led-current" value="20" step="1">
                            </div>
                        </div>
                        <div class="led-calc-result">
                            <span>Benodigde weerstand: </span>
                            <span id="led-resistor-result" class="highlight">360Ω</span>
                            <span class="nearest-value" id="led-nearest-value">(gebruik 390Ω)</span>
                        </div>
                    </div>

                    <div class="led-simulator">
                        <h3>🔴 Interactieve LED Simulator</h3>
                        <p>Pas de spanning en weerstand aan. Let op wanneer de LED doorbrandt!</p>
                        <canvas id="led-canvas" width="700" height="400"></canvas>
                        <div class="led-controls">
                            <div class="control-group">
                                <label>Spanning</label>
                                <input type="range" id="led-voltage-slider" min="0" max="12" value="5" step="0.5">
                                <span id="led-voltage-display">5V</span>
                            </div>
                            <div class="control-group">
                                <label>Weerstand</label>
                                <input type="range" id="led-resistance-slider" min="0" max="1000" value="220" step="10">
                                <span id="led-resistance-display">220Ω</span>
                            </div>
                        </div>
                        <div class="led-status" id="led-status">
                            <div class="status-item">Stroom: <span id="led-current-display">14.5mA</span></div>
                            <div class="status-item">LED Status: <span id="led-health">Gezond ✓</span></div>
                        </div>
                    </div>

                    <button class="next-lesson-btn" onclick="navigateToLesson('series-parallel')">
                        Volgende Les: Serie & Parallel →
                    </button>
                </div>
            </section>

            <section class="lesson" id="lesson-series-parallel">
                <div class="lesson-header">
                    <h2>Les 4: Serie en Parallel Schakelingen</h2>
                    <p class="subtitle">Twee manieren om componenten te verbinden</p>
                </div>
                <div class="lesson-content">
                    <div class="comparison-section">
                        <div class="comparison-card series">
                            <h3>Serie Schakeling</h3>
                            <div class="circuit-diagram">
                                <canvas id="series-diagram" width="300" height="150"></canvas>
                            </div>
                            <ul class="circuit-properties">
                                <li>Stroom is <strong>overal gelijk</strong></li>
                                <li>Spanning wordt <strong>verdeeld</strong></li>
                                <li>R<sub>totaal</sub> = R₁ + R₂ + R₃</li>
                                <li>Als één component faalt, stopt alles</li>
                            </ul>
                        </div>
                        <div class="comparison-card parallel">
                            <h3>Parallel Schakeling</h3>
                            <div class="circuit-diagram">
                                <canvas id="parallel-diagram" width="300" height="150"></canvas>
                            </div>
                            <ul class="circuit-properties">
                                <li>Spanning is <strong>overal gelijk</strong></li>
                                <li>Stroom wordt <strong>verdeeld</strong></li>
                                <li>1/R<sub>totaal</sub> = 1/R₁ + 1/R₂ + 1/R₃</li>
                                <li>Andere componenten werken door</li>
                            </ul>
                        </div>
                    </div>

                    <div class="series-parallel-simulator">
                        <h3>🔌 Interactieve Simulator</h3>
                        <div class="simulator-tabs">
                            <button class="tab-btn active" data-tab="series-sim">Serie</button>
                            <button class="tab-btn" data-tab="parallel-sim">Parallel</button>
                        </div>

                        <div class="tab-content active" id="series-sim">
                            <canvas id="series-canvas" width="700" height="350"></canvas>
                            <div class="series-controls">
                                <div class="resistor-inputs">
                                    <div class="control-group">
                                        <label>R₁</label>
                                        <input type="range" id="series-r1" min="100" max="1000" value="200">
                                        <span id="series-r1-val">200Ω</span>
                                    </div>
                                    <div class="control-group">
                                        <label>R₂</label>
                                        <input type="range" id="series-r2" min="100" max="1000" value="300">
                                        <span id="series-r2-val">300Ω</span>
                                    </div>
                                    <div class="control-group">
                                        <label>R₃</label>
                                        <input type="range" id="series-r3" min="100" max="1000" value="500">
                                        <span id="series-r3-val">500Ω</span>
                                    </div>
                                </div>
                                <div class="series-results">
                                    <div class="result-box">
                                        <span class="label">Totale Weerstand:</span>
                                        <span class="value" id="series-total-r">1000Ω</span>
                                    </div>
                                    <div class="result-box">
                                        <span class="label">Stroom (bij 9V):</span>
                                        <span class="value" id="series-current">9mA</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-content" id="parallel-sim">
                            <canvas id="parallel-canvas" width="700" height="350"></canvas>
                            <div class="parallel-controls">
                                <div class="resistor-inputs">
                                    <div class="control-group">
                                        <label>R₁</label>
                                        <input type="range" id="parallel-r1" min="100" max="1000" value="200">
                                        <span id="parallel-r1-val">200Ω</span>
                                    </div>
                                    <div class="control-group">
                                        <label>R₂</label>
                                        <input type="range" id="parallel-r2" min="100" max="1000" value="300">
                                        <span id="parallel-r2-val">300Ω</span>
                                    </div>
                                    <div class="control-group">
                                        <label>R₃</label>
                                        <input type="range" id="parallel-r3" min="100" max="1000" value="500">
                                        <span id="parallel-r3-val">500Ω</span>
                                    </div>
                                </div>
                                <div class="parallel-results">
                                    <div class="result-box">
                                        <span class="label">Totale Weerstand:</span>
                                        <span class="value" id="parallel-total-r">96.8Ω</span>
                                    </div>
                                    <div class="result-box">
                                        <span class="label">Totale Stroom (bij 9V):</span>
                                        <span class="value" id="parallel-current">93mA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="next-lesson-btn" onclick="navigateToLesson('capacitor')">
                        Volgende Les: Condensatoren →
                    </button>
                </div>
            </section>

            <section class="lesson" id="lesson-capacitor">
                <div class="lesson-header">
                    <h2>Les 5: Condensatoren</h2>
                    <p class="subtitle">Energie opslaan en vrijgeven</p>
                </div>
                <div class="lesson-content">
                    <div class="capacitor-intro">
                        <div class="cap-info-card">
                            <h3>🔋 Wat is een Condensator?</h3>
                            <p>Een condensator slaat elektrische energie op in een elektrisch veld. Het bestaat uit twee geleidende platen gescheiden door een isolator.</p>
                            <div class="cap-symbol">
                                <svg viewBox="0 0 100 60">
                                    <line x1="10" y1="30" x2="40" y2="30" stroke="#fff" stroke-width="2"/>
                                    <line x1="40" y1="10" x2="40" y2="50" stroke="#fff" stroke-width="3"/>
                                    <line x1="55" y1="10" x2="55" y2="50" stroke="#fff" stroke-width="3"/>
                                    <line x1="55" y1="30" x2="90" y2="30" stroke="#fff" stroke-width="2"/>
                                </svg>
                                <span>Condensator Symbool</span>
                            </div>
                            <div class="unit-badge">Eenheid: Farad (F), meestal µF of pF</div>
                        </div>
                        <div class="cap-analogy-card">
                            <h3>🚰 Water Analogie</h3>
                            <p>Denk aan een condensator als een waterreservoir met een elastisch membraan. Het kan water (lading) opslaan en later weer afgeven.</p>
                        </div>
                    </div>

                    <div class="capacitor-charging">
                        <h3>⚡ Laad- en Ontlaadcurve</h3>
                        <p>Een condensator laadt en ontlaadt niet instant - het volgt een exponentiële curve.</p>
                        <div class="charge-formula">
                            <div class="formula">τ = R × C</div>
                            <p>τ (tau) = tijdconstante - tijd om 63% te laden/ontladen</p>
                        </div>
                        <canvas id="charge-curve-canvas" width="700" height="300"></canvas>
                        <div class="charge-controls">
                            <div class="control-group">
                                <label>Weerstand (kΩ)</label>
                                <input type="range" id="cap-resistance" min="1" max="100" value="10">
                                <span id="cap-r-display">10kΩ</span>
                            </div>
                            <div class="control-group">
                                <label>Capaciteit (µF)</label>
                                <input type="range" id="cap-capacitance" min="1" max="1000" value="100">
                                <span id="cap-c-display">100µF</span>
                            </div>
                            <div class="tau-display">
                                <span>Tijdconstante τ = </span>
                                <span id="tau-value" class="highlight">1.0s</span>
                            </div>
                        </div>
                    </div>

                    <div class="capacitor-simulator">
                        <h3>🔌 Condensator Simulator</h3>
                        <p>Druk op "Laden" en "Ontladen" om het effect te zien!</p>
                        <canvas id="capacitor-canvas" width="700" height="400"></canvas>
                        <div class="cap-sim-controls">
                            <button id="cap-charge-btn" class="cap-btn charge">⚡ Laden</button>
                            <button id="cap-discharge-btn" class="cap-btn discharge">💨 Ontladen</button>
                            <button id="cap-reset-btn" class="cap-btn reset">🔄 Reset</button>
                        </div>
                        <div class="cap-status">
                            <div class="voltage-meter">
                                <span>Condensator Spanning:</span>
                                <div class="meter-bar">
                                    <div class="meter-fill" id="cap-voltage-fill"></div>
                                </div>
                                <span id="cap-voltage-val">0.0V</span>
                            </div>
                            <div class="charge-percent">
                                <span>Geladen:</span>
                                <span id="cap-charge-percent">0%</span>
                            </div>
                        </div>
                    </div>

                    <button class="next-lesson-btn" onclick="navigateToLesson('builder')">
                        Volgende: Circuit Builder →
                    </button>
                </div>
            </section>

            <section class="lesson" id="lesson-builder">
                <div class="lesson-header">
                    <h2>Circuit Builder</h2>
                    <p class="subtitle">Bouw je eigen circuits!</p>
                </div>
                <div class="lesson-content">
                    <div class="builder-container">
                        <div class="component-palette">
                            <h3>Componenten</h3>
                            <div class="component-list">
                                <div class="palette-component" data-type="battery" draggable="true">
                                    <div class="component-icon">🔋</div>
                                    <span>Batterij</span>
                                </div>
                                <div class="palette-component" data-type="resistor" draggable="true">
                                    <div class="component-icon">⏛</div>
                                    <span>Weerstand</span>
                                </div>
                                <div class="palette-component" data-type="led" draggable="true">
                                    <div class="component-icon">💡</div>
                                    <span>LED</span>
                                </div>
                                <div class="palette-component" data-type="capacitor" draggable="true">
                                    <div class="component-icon">⊥⊥</div>
                                    <span>Condensator</span>
                                </div>
                                <div class="palette-component" data-type="switch" draggable="true">
                                    <div class="component-icon">⏻</div>
                                    <span>Schakelaar</span>
                                </div>
                                <div class="palette-component" data-type="wire" draggable="true">
                                    <div class="component-icon">—</div>
                                    <span>Draad</span>
                                </div>
                            </div>
                        </div>
                        <div class="builder-workspace">
                            <canvas id="builder-canvas" width="600" height="500"></canvas>
                            <div class="builder-controls">
                                <button id="builder-clear" class="builder-btn">🗑️ Wissen</button>
                                <button id="builder-simulate" class="builder-btn primary">▶️ Simuleren</button>
                                <button id="builder-stop" class="builder-btn">⏹️ Stop</button>
                            </div>
                        </div>
                        <div class="component-properties">
                            <h3>Eigenschappen</h3>
                            <div id="property-panel">
                                <p class="no-selection">Selecteer een component om eigenschappen te bewerken</p>
                            </div>
                        </div>
                    </div>

                    <div class="builder-presets">
                        <h3>📋 Voorbeeldcircuits</h3>
                        <div class="preset-list">
                            <button class="preset-btn" data-preset="simple-led">Eenvoudig LED Circuit</button>
                            <button class="preset-btn" data-preset="series-leds">LEDs in Serie</button>
                            <button class="preset-btn" data-preset="parallel-leds">LEDs Parallel</button>
                            <button class="preset-btn" data-preset="rc-circuit">RC Circuit</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <script src="animations.js"></script>
    <script src="simulations.js"></script>
    <script src="circuit-builder.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

---

## 2. `styles.css`

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --bg-tertiary: #21262d;
    --text-primary: #f0f6fc;
    --text-secondary: #8b949e;
    --accent-primary: #4ecdc4;
    --accent-secondary: #45b7aa;
    --accent-warning: #ff6b6b;
    --accent-success: #7bed9f;
    --accent-yellow: #ffd93d;
    --border-color: #30363d;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
}

.app-container {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: 280px;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border-color);
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
}

.logo-icon {
    font-size: 2rem;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
}

.logo h1 {
    font-size: 1.5rem;
    color: var(--accent-primary);
    font-weight: 700;
}

.nav-menu {
    list-style: none;
    flex: 1;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    margin-bottom: 8px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--text-secondary);
}

.nav-item:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    transform: translateX(5px);
}

.nav-item.active {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    color: var(--bg-primary);
    font-weight: 600;
}

.nav-icon {
    font-size: 1.2rem;
    width: 24px;
    text-align: center;
}

.progress-section {
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
}

.progress-section h3 {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 10px;
}

.progress-bar {
    height: 8px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-success));
    border-radius: 4px;
    transition: width 0.5s ease;
}

.progress-text {
    display: block;
    text-align: center;
    margin-top: 8px;
    font-size: 0.85rem;
    color: var(--text-secondary);
}

.main-content {
    flex: 1;
    margin-left: 280px;
    padding: 30px 40px;
    min-height: 100vh;
}

.lesson {
    display: none;
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.lesson-header {
    margin-bottom: 30px;
}

.lesson-header h2 {
    font-size: 2.2rem;
    color: var(--accent-primary);
    margin-bottom: 10px;
}

.subtitle {
    color: var(--text-secondary);
    font-size: 1.1rem;
}

.intro-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.intro-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 30px;
    text-align: center;
    transition: all 0.3s ease;
}

.intro-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent-primary);
    box-shadow: 0 10px 30px rgba(78, 205, 196, 0.2);
}

.card-icon {
    font-size: 3rem;
    margin-bottom: 15px;
}

.intro-card h3 {
    color: var(--text-primary);
    margin-bottom: 10px;
}

.intro-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
}

.start-section {
    text-align: center;
    margin-bottom: 40px;
}

.start-button {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    color: var(--bg-primary);
    border: none;
    padding: 16px 40px;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.start-button:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
}

.intro-animation {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.intro-animation canvas {
    border-radius: 16px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

.concept-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.concept-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 25px;
    transition: all 0.3s ease;
}

.concept-card:hover {
    border-color: var(--accent-primary);
}

.concept-card h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--accent-primary);
}

.concept-card p {
    color: var(--text-secondary);
    margin-bottom: 15px;
}

.unit-badge {
    display: inline-block;
    background: var(--bg-tertiary);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    color: var(--accent-yellow);
}

.simulation-section, .electron-flow-section, .ohm-calculator, .ohm-triangle,
.interactive-circuit, .led-calculator-section, .led-simulator,
.series-parallel-simulator, .capacitor-charging, .capacitor-simulator {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 30px;
}

.simulation-section h3, .electron-flow-section h3, .ohm-calculator h3,
.ohm-triangle h3, .interactive-circuit h3, .led-calculator-section h3,
.led-simulator h3, .series-parallel-simulator h3, .capacitor-charging h3,
.capacitor-simulator h3 {
    font-size: 1.3rem;
    color: var(--accent-primary);
    margin-bottom: 10px;
}

.simulation-section p, .electron-flow-section p, .interactive-circuit p,
.led-simulator p, .capacitor-simulator p {
    color: var(--text-secondary);
    margin-bottom: 20px;
}

.simulation-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

canvas {
    border-radius: 12px;
    background: var(--bg-tertiary);
}

.simulation-controls, .circuit-controls, .led-controls, .charge-controls, .electron-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: var(--bg-tertiary);
    border-radius: 12px;
    width: 100%;
}

.control-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.control-group label {
    font-size: 0.9rem;
    color: var(--text-secondary);
}

input[type="range"] {
    width: 150px;
    height: 8px;
    -webkit-appearance: none;
    background: var(--bg-primary);
    border-radius: 4px;
    outline: none;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: var(--accent-primary);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    background: var(--accent-secondary);
}

.result-display {
    font-size: 1.2rem;
    padding: 10px 20px;
    background: var(--bg-primary);
    border-radius: 8px;
}

.highlight {
    color: var(--accent-primary);
    font-weight: 700;
}

.control-btn {
    background: var(--bg-primary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.control-btn:hover {
    background: var(--accent-primary);
    color: var(--bg-primary);
    border-color: var(--accent-primary);
}

.formula-display {
    text-align: center;
    margin-bottom: 40px;
}

.formula-card {
    display: inline-block;
    background: var(--bg-secondary);
    border: 2px solid var(--accent-primary);
    border-radius: 16px;
    padding: 30px 50px;
    margin-bottom: 20px;
}

.formula-card.main-formula .formula {
    font-size: 3rem;
    font-weight: 700;
    color: var(--accent-primary);
    font-family: 'Courier New', monospace;
}

.formula-explanation {
    margin-top: 15px;
    color: var(--text-secondary);
}

.formula-explanation .var {
    color: var(--accent-yellow);
    font-weight: 600;
    margin: 0 10px;
}

.formula-variants {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.formula-card.small {
    padding: 20px 30px;
    border-width: 1px;
    border-color: var(--border-color);
}

.formula-card.small .formula {
    font-size: 1.5rem;
    color: var(--text-primary);
    font-family: 'Courier New', monospace;
}

.formula-card.small p {
    margin-top: 10px;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.triangle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

#ohm-triangle-svg {
    width: 250px;
    height: 230px;
}

.triangle-text {
    font-size: 24px;
    font-weight: bold;
    fill: var(--text-primary);
    cursor: pointer;
    transition: fill 0.2s ease;
}

.triangle-text:hover {
    fill: var(--accent-primary);
}

.clickable-area {
    cursor: pointer;
}

.clickable-area:hover {
    fill: rgba(78, 205, 196, 0.2);
}

.triangle-result {
    font-size: 1.2rem;
    padding: 15px 25px;
    background: var(--bg-tertiary);
    border-radius: 10px;
    color: var(--text-secondary);
}

.calculator-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 20px;
}

.calc-input {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.calc-input label {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.calc-input input {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    padding: 12px 15px;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s ease;
}

.calc-input input:focus {
    border-color: var(--accent-primary);
}

.calc-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 20px;
}

.calc-buttons button {
    background: var(--accent-primary);
    color: var(--bg-primary);
    border: none;
    padding: 12px 25px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
}

.calc-buttons button:hover {
    background: var(--accent-secondary);
    transform: translateY(-2px);
}

.calc-result {
    text-align: center;
    font-size: 1.3rem;
    padding: 15px;
    background: var(--bg-tertiary);
    border-radius: 10px;
    min-height: 55px;
}

.live-results {
    display: flex;
    gap: 30px;
}

.result-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

.result-item .label {
    color: var(--text-secondary);
}

.result-item .value {
    font-size: 1.2rem;
    color: var(--accent-primary);
    font-weight: 600;
}

.led-intro {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

.led-info-card, .led-warning-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 25px;
}

.led-warning-card {
    border-color: var(--accent-warning);
    background: rgba(255, 107, 107, 0.1);
}

.led-warning-card h3 {
    color: var(--accent-warning);
}

.led-symbol {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
}

.led-symbol svg {
    width: 120px;
    height: 80px;
}

.led-symbol span {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-top: 10px;
}

.led-formula {
    text-align: center;
    margin-bottom: 20px;
}

.led-formula .formula {
    font-size: 1.5rem;
    color: var(--accent-primary);
    font-family: 'Courier New', monospace;
}

.led-calc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 20px;
}

.led-calc-input {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.led-calc-input label {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.led-calc-input input, .led-calc-input select {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    padding: 12px 15px;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
}

.led-calc-result {
    text-align: center;
    font-size: 1.3rem;
    padding: 15px;
    background: var(--bg-tertiary);
    border-radius: 10px;
}

.nearest-value {
    color: var(--text-secondary);
    font-size: 1rem;
    margin-left: 10px;
}

.led-status {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 20px;
    padding: 15px;
    background: var(--bg-tertiary);
    border-radius: 10px;
}

.status-item {
    font-size: 1.1rem;
}

#led-health {
    font-weight: 600;
}

#led-health.healthy {
    color: var(--accent-success);
}

#led-health.warning {
    color: var(--accent-yellow);
}

#led-health.danger {
    color: var(--accent-warning);
}

.comparison-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

.comparison-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 25px;
}

.comparison-card h3 {
    color: var(--accent-primary);
    margin-bottom: 15px;
    text-align: center;
}

.circuit-diagram {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.circuit-properties {
    list-style: none;
}

.circuit-properties li {
    padding: 8px 0;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-secondary);
}

.circuit-properties li:last-child {
    border-bottom: none;
}

.simulator-tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.tab-btn {
    background: var(--bg-tertiary);
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    padding: 12px 30px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.tab-btn:hover {
    color: var(--text-primary);
}

.tab-btn.active {
    background: var(--accent-primary);
    color: var(--bg-primary);
    border-color: var(--accent-primary);
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.resistor-inputs {
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
}

.series-results, .parallel-results {
    display: flex;
    justify-content: center;
    gap: 30px;
}

.result-box {
    background: var(--bg-primary);
    padding: 15px 25px;
    border-radius: 10px;
}

.result-box .label {
    color: var(--text-secondary);
    display: block;
    margin-bottom: 5px;
    font-size: 0.9rem;
}

.result-box .value {
    color: var(--accent-primary);
    font-size: 1.3rem;
    font-weight: 600;
}

.capacitor-intro {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

.cap-info-card, .cap-analogy-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 25px;
}

.cap-symbol {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
}

.cap-symbol svg {
    width: 120px;
    height: 80px;
}

.cap-symbol span {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-top: 10px;
}

.charge-formula {
    text-align: center;
    margin-bottom: 20px;
}

.charge-formula .formula {
    font-size: 1.8rem;
    color: var(--accent-primary);
    font-family: 'Courier New', monospace;
}

.charge-formula p {
    color: var(--text-secondary);
    margin-top: 10px;
}

.tau-display {
    font-size: 1.2rem;
    padding: 10px 20px;
    background: var(--bg-primary);
    border-radius: 8px;
}

.cap-sim-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
}

.cap-btn {
    padding: 14px 30px;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.cap-btn.charge {
    background: var(--accent-primary);
    color: var(--bg-primary);
}

.cap-btn.discharge {
    background: var(--accent-warning);
    color: var(--bg-primary);
}

.cap-btn.reset {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.cap-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}

.cap-status {
    display: flex;
    justify-content: center;
    gap: 40px;
    padding: 20px;
    background: var(--bg-tertiary);
    border-radius: 10px;
}

.voltage-meter {
    display: flex;
    align-items: center;
    gap: 15px;
}

.meter-bar {
    width: 150px;
    height: 20px;
    background: var(--bg-primary);
    border-radius: 10px;
    overflow: hidden;
}

.meter-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-success));
    transition: width 0.1s ease;
}

.charge-percent {
    font-size: 1.3rem;
}

#cap-charge-percent {
    color: var(--accent-primary);
    font-weight: 600;
}

.builder-container {
    display: grid;
    grid-template-columns: 200px 1fr 250px;
    gap: 20px;
    margin-bottom: 30px;
}

.component-palette {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 20px;
}

.component-palette h3 {
    color: var(--accent-primary);
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.component-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.palette-component {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    cursor: grab;
    transition: all 0.2s ease;
}

.palette-component:hover {
    border-color: var(--accent-primary);
    background: var(--bg-primary);
}

.palette-component:active {
    cursor: grabbing;
}

.component-icon {
    font-size: 1.3rem;
    width: 30px;
    text-align: center;
}

.builder-workspace {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#builder-canvas {
    background: var(--bg-tertiary);
    border: 2px dashed var(--border-color);
    margin-bottom: 15px;
}

.builder-controls {
    display: flex;
    gap: 10px;
}

.builder-btn {
    padding: 10px 20px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
}

.builder-btn:hover {
    background: var(--bg-primary);
}

.builder-btn.primary {
    background: var(--accent-primary);
    color: var(--bg-primary);
    border-color: var(--accent-primary);
}

.component-properties {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 20px;
}

.component-properties h3 {
    color: var(--accent-primary);
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.no-selection {
    color: var(--text-secondary);
    font-style: italic;
}

.builder-presets {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 25px;
}

.builder-presets h3 {
    color: var(--accent-primary);
    margin-bottom: 15px;
}

.preset-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.preset-btn {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.preset-btn:hover {
    background: var(--accent-primary);
    color: var(--bg-primary);
    border-color: var(--accent-primary);
}

.next-lesson-btn {
    display: block;
    margin: 40px auto 0;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    color: var(--bg-primary);
    border: none;
    padding: 16px 40px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.next-lesson-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
}

@media (max-width: 1200px) {
    .builder-container {
        grid-template-columns: 1fr;
    }
    .component-palette, .component-properties {
        display: none;
    }
}

@media (max-width: 900px) {
    .sidebar {
        width: 200px;
    }
    .main-content {
        margin-left: 200px;
        padding: 20px;
    }
    .led-intro, .capacitor-intro, .comparison-section {
        grid-template-columns: 1fr;
    }
    .calculator-grid, .led-calc-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .sidebar {
        width: 60px;
        padding: 15px 10px;
    }
    .sidebar .logo h1, .sidebar .nav-item span:not(.nav-icon),
    .sidebar .progress-section h3, .sidebar .progress-text {
        display: none;
    }
    .main-content {
        margin-left: 60px;
    }
    .simulation-controls, .circuit-controls, .led-controls {
        flex-direction: column;
    }
    .resistor-inputs {
        flex-direction: column;
        align-items: center;
    }
    .series-results, .parallel-results, .live-results {
        flex-direction: column;
        align-items: center;
    }
}
```

---

De volgende 4 JavaScript bestanden staan in deel 2 (dit bestand is te groot voor GitHub).

Maak een nieuw issue of vraag me om deel 2!
