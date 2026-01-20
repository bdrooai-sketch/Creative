// ============================================
// ElektroLab - Main Application
// Initialisatie en navigatie
// ============================================

// Globale variabelen voor simulators
let introAnimation;
let waterAnimation;
let electronAnimation;
let ohmCircuitSim;
let ledSim;
let seriesSim;
let parallelSim;
let capacitorSim;
let chargeCurveAnim;
let circuitBuilder;

// Voortgang bijhouden
let completedLessons = new Set();
const totalLessons = 6;

// Navigatie functie
function navigateToLesson(lessonId) {
    // Verberg alle lessen
    document.querySelectorAll('.lesson').forEach(lesson => {
        lesson.style.display = 'none';
    });

    // Toon geselecteerde les
    const targetLesson = document.getElementById(`lesson-${lessonId}`);
    if (targetLesson) {
        targetLesson.style.display = 'block';
    }

    // Update navigatie menu
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.lesson === lessonId) {
            item.classList.add('active');
        }
    });

    // Markeer les als voltooid (behalve intro)
    if (lessonId !== 'intro') {
        completedLessons.add(lessonId);
        updateProgress();
    }

    // Initialiseer simulators voor deze les
    initializeLessonSimulators(lessonId);
}

// Voortgang updaten
function updateProgress() {
    const progress = (completedLessons.size / totalLessons) * 100;
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    if (progressText) {
        progressText.textContent = `${Math.round(progress)}% voltooid`;
    }
}

// Initialiseer simulators per les
function initializeLessonSimulators(lessonId) {
    switch (lessonId) {
        case 'intro':
            if (!introAnimation) {
                introAnimation = new IntroAnimation('intro-canvas');
            }
            break;

        case 'basics':
            if (!waterAnimation) {
                waterAnimation = new WaterAnalogyAnimation('water-canvas');
            }
            if (!electronAnimation) {
                electronAnimation = new ElectronAnimation('electron-canvas');
            }
            break;

        case 'ohm':
            if (!ohmCircuitSim) {
                ohmCircuitSim = new OhmCircuitSimulator('ohm-circuit-canvas');
            }
            break;

        case 'led':
            if (!ledSim) {
                ledSim = new LEDSimulator('led-canvas');
            }
            break;

        case 'series-parallel':
            if (!seriesSim) {
                seriesSim = new SeriesCircuitSimulator('series-canvas');
            }
            if (!parallelSim) {
                parallelSim = new ParallelCircuitSimulator('parallel-canvas');
            }
            drawSimpleDiagrams();
            break;

        case 'capacitor':
            if (!chargeCurveAnim) {
                chargeCurveAnim = new ChargeCurveAnimation('charge-curve-canvas');
            }
            if (!capacitorSim) {
                capacitorSim = new CapacitorSimulator('capacitor-canvas');
            }
            break;

        case 'builder':
            if (!circuitBuilder) {
                circuitBuilder = new CircuitBuilder('builder-canvas');
            }
            break;
    }
}

// Simpele circuit diagrammen tekenen
function drawSimpleDiagrams() {
    // Serie diagram
    const seriesCanvas = document.getElementById('series-diagram');
    if (seriesCanvas) {
        const ctx = seriesCanvas.getContext('2d');
        ctx.clearRect(0, 0, 300, 150);

        ctx.strokeStyle = '#4a5568';
        ctx.lineWidth = 3;

        // Circuit lijn
        ctx.beginPath();
        ctx.moveTo(20, 75);
        ctx.lineTo(280, 75);
        ctx.stroke();

        // Weerstanden
        ctx.fillStyle = '#a0aec0';
        ctx.fillRect(60, 65, 40, 20);
        ctx.fillRect(130, 65, 40, 20);
        ctx.fillRect(200, 65, 40, 20);

        // Labels
        ctx.fillStyle = '#f0f6fc';
        ctx.font = '12px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText('R₁', 80, 60);
        ctx.fillText('R₂', 150, 60);
        ctx.fillText('R₃', 220, 60);

        // Stroom pijl
        ctx.fillStyle = '#4ecdc4';
        ctx.beginPath();
        ctx.moveTo(150, 100);
        ctx.lineTo(170, 100);
        ctx.lineTo(165, 95);
        ctx.moveTo(170, 100);
        ctx.lineTo(165, 105);
        ctx.stroke();
        ctx.fillText('I', 160, 120);
    }

    // Parallel diagram
    const parallelCanvas = document.getElementById('parallel-diagram');
    if (parallelCanvas) {
        const ctx = parallelCanvas.getContext('2d');
        ctx.clearRect(0, 0, 300, 150);

        ctx.strokeStyle = '#4a5568';
        ctx.lineWidth = 3;

        // Verticale lijnen
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.lineTo(50, 130);
        ctx.moveTo(250, 20);
        ctx.lineTo(250, 130);
        ctx.stroke();

        // Horizontale takken
        ctx.beginPath();
        ctx.moveTo(50, 35);
        ctx.lineTo(250, 35);
        ctx.moveTo(50, 75);
        ctx.lineTo(250, 75);
        ctx.moveTo(50, 115);
        ctx.lineTo(250, 115);
        ctx.stroke();

        // Weerstanden
        ctx.fillStyle = '#a0aec0';
        ctx.fillRect(130, 27, 40, 16);
        ctx.fillRect(130, 67, 40, 16);
        ctx.fillRect(130, 107, 40, 16);

        // Labels
        ctx.fillStyle = '#f0f6fc';
        ctx.font = '11px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText('R₁', 150, 24);
        ctx.fillText('R₂', 150, 64);
        ctx.fillText('R₃', 150, 104);
    }
}

// Ohm Calculator functie
function calculateOhm(target) {
    const vInput = document.getElementById('calc-voltage');
    const iInput = document.getElementById('calc-current');
    const rInput = document.getElementById('calc-resistance');
    const result = document.getElementById('ohm-calc-result');

    const v = parseFloat(vInput.value);
    const i = parseFloat(iInput.value) / 1000; // mA naar A
    const r = parseFloat(rInput.value);

    let calculated;
    let unit;
    let resultValue;

    switch (target) {
        case 'v':
            if (isNaN(i) || isNaN(r)) {
                result.innerHTML = '<span style="color: #ff6b6b;">Vul stroom en weerstand in!</span>';
                return;
            }
            calculated = i * r;
            unit = 'V';
            vInput.value = calculated.toFixed(2);
            resultValue = `Spanning = ${calculated.toFixed(2)}V`;
            break;

        case 'i':
            if (isNaN(v) || isNaN(r)) {
                result.innerHTML = '<span style="color: #ff6b6b;">Vul spanning en weerstand in!</span>';
                return;
            }
            calculated = (v / r) * 1000;
            unit = 'mA';
            iInput.value = calculated.toFixed(2);
            resultValue = `Stroom = ${calculated.toFixed(2)}mA`;
            break;

        case 'r':
            if (isNaN(v) || isNaN(i) || i === 0) {
                result.innerHTML = '<span style="color: #ff6b6b;">Vul spanning en stroom in!</span>';
                return;
            }
            calculated = v / i;
            unit = 'Ω';
            rInput.value = calculated.toFixed(0);
            resultValue = `Weerstand = ${calculated.toFixed(0)}Ω`;
            break;
    }

    result.innerHTML = `<span class="highlight">${resultValue}</span>`;
}

// LED calculator functie
function calculateLEDResistor() {
    const sourceV = parseFloat(document.getElementById('led-source-voltage').value);
    const ledSelect = document.getElementById('led-color');
    const ledV = parseFloat(ledSelect.value);
    const ledI = parseFloat(document.getElementById('led-current').value) / 1000;

    const resistance = (sourceV - ledV) / ledI;
    const resultEl = document.getElementById('led-resistor-result');
    const nearestEl = document.getElementById('led-nearest-value');

    if (resistance <= 0) {
        resultEl.textContent = 'Te laag!';
        nearestEl.textContent = '(verhoog bronspanning)';
        return;
    }

    // Standaard weerstandswaarden (E12 serie)
    const standardValues = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82,
        100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820,
        1000, 1200, 1500, 1800, 2200, 2700, 3300, 3900, 4700, 5600, 6800, 8200, 10000];

    // Vind dichtstbijzijnde hogere standaardwaarde
    let nearest = standardValues.find(v => v >= resistance) || standardValues[standardValues.length - 1];

    resultEl.textContent = `${Math.round(resistance)}Ω`;
    nearestEl.textContent = `(gebruik ${nearest}Ω)`;
}

// DOM geladen
document.addEventListener('DOMContentLoaded', () => {
    // Navigatie event listeners
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navigateToLesson(item.dataset.lesson);
        });
    });

    // Initialiseer intro animatie
    initializeLessonSimulators('intro');

    // Basics les controls
    setupBasicsControls();

    // Ohm les controls
    setupOhmControls();

    // LED les controls
    setupLEDControls();

    // Series/Parallel les controls
    setupSeriesParallelControls();

    // Capacitor les controls
    setupCapacitorControls();

    // Ohm Triangle interactie
    setupOhmTriangle();
});

// Setup functies voor elke les
function setupBasicsControls() {
    // Voltage slider
    const voltageSlider = document.getElementById('voltage-slider');
    const voltageValue = document.getElementById('voltage-value');
    const resistanceSlider = document.getElementById('resistance-slider');
    const resistanceValue = document.getElementById('resistance-value');
    const currentValue = document.getElementById('current-value');

    if (voltageSlider) {
        voltageSlider.addEventListener('input', () => {
            const v = voltageSlider.value;
            voltageValue.textContent = `${v}V`;
            if (waterAnimation) {
                waterAnimation.setVoltage(parseInt(v));
            }
            updateBasicsCurrent();
        });
    }

    if (resistanceSlider) {
        resistanceSlider.addEventListener('input', () => {
            const r = resistanceSlider.value;
            resistanceValue.textContent = `${r}Ω`;
            if (waterAnimation) {
                waterAnimation.setResistance(parseInt(r));
            }
            updateBasicsCurrent();
        });
    }

    function updateBasicsCurrent() {
        if (!voltageSlider || !resistanceSlider || !currentValue) return;
        const v = parseFloat(voltageSlider.value);
        const r = parseFloat(resistanceSlider.value);
        const i = (v / r * 1000).toFixed(1);
        currentValue.textContent = `${i}mA`;
    }

    // Electron animation controls
    const playBtn = document.getElementById('electron-play');
    const pauseBtn = document.getElementById('electron-pause');
    const speedUpBtn = document.getElementById('electron-speed-up');
    const slowDownBtn = document.getElementById('electron-slow-down');

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (electronAnimation) electronAnimation.start();
        });
    }

    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            if (electronAnimation) electronAnimation.stop();
        });
    }

    if (speedUpBtn) {
        speedUpBtn.addEventListener('click', () => {
            if (electronAnimation) {
                electronAnimation.speed = Math.min(electronAnimation.speed + 1, 10);
            }
        });
    }

    if (slowDownBtn) {
        slowDownBtn.addEventListener('click', () => {
            if (electronAnimation) {
                electronAnimation.speed = Math.max(electronAnimation.speed - 1, 0.5);
            }
        });
    }
}

function setupOhmControls() {
    const ohmVoltage = document.getElementById('ohm-voltage');
    const ohmResistance = document.getElementById('ohm-resistance');
    const ohmVoltageDisplay = document.getElementById('ohm-voltage-display');
    const ohmResistanceDisplay = document.getElementById('ohm-resistance-display');
    const ohmCurrentDisplay = document.getElementById('ohm-current-display');
    const ohmPowerDisplay = document.getElementById('ohm-power-display');

    function updateOhmDisplays() {
        if (!ohmVoltage || !ohmResistance) return;

        const v = parseFloat(ohmVoltage.value);
        const r = parseFloat(ohmResistance.value);
        const i = v / r * 1000; // mA
        const p = v * (v / r) * 1000; // mW

        if (ohmVoltageDisplay) ohmVoltageDisplay.textContent = `${v}V`;
        if (ohmResistanceDisplay) {
            ohmResistanceDisplay.textContent = r >= 1000 ? `${(r/1000).toFixed(1)}kΩ` : `${r}Ω`;
        }
        if (ohmCurrentDisplay) ohmCurrentDisplay.textContent = `${i.toFixed(2)}mA`;
        if (ohmPowerDisplay) ohmPowerDisplay.textContent = `${p.toFixed(1)}mW`;

        if (ohmCircuitSim) {
            ohmCircuitSim.setVoltage(v);
            ohmCircuitSim.setResistance(r);
        }
    }

    if (ohmVoltage) {
        ohmVoltage.addEventListener('input', updateOhmDisplays);
    }

    if (ohmResistance) {
        ohmResistance.addEventListener('input', updateOhmDisplays);
    }
}

function setupOhmTriangle() {
    const triangleResult = document.getElementById('triangle-result');
    const clickableAreas = document.querySelectorAll('.clickable-area');

    clickableAreas.forEach(area => {
        area.addEventListener('click', () => {
            const calc = area.dataset.calc;
            let formula = '';

            switch (calc) {
                case 'v':
                    formula = 'Om <strong>V</strong> te vinden: V = I × R';
                    break;
                case 'i':
                    formula = 'Om <strong>I</strong> te vinden: I = V ÷ R';
                    break;
                case 'r':
                    formula = 'Om <strong>R</strong> te vinden: R = V ÷ I';
                    break;
            }

            if (triangleResult) {
                triangleResult.innerHTML = formula;
            }
        });
    });
}

function setupLEDControls() {
    // LED Calculator
    const ledSourceV = document.getElementById('led-source-voltage');
    const ledColor = document.getElementById('led-color');
    const ledCurrent = document.getElementById('led-current');

    [ledSourceV, ledColor, ledCurrent].forEach(el => {
        if (el) {
            el.addEventListener('input', calculateLEDResistor);
            el.addEventListener('change', calculateLEDResistor);
        }
    });

    // LED Simulator controls
    const ledVoltageSlider = document.getElementById('led-voltage-slider');
    const ledResistanceSlider = document.getElementById('led-resistance-slider');
    const ledVoltageDisplay = document.getElementById('led-voltage-display');
    const ledResistanceDisplay = document.getElementById('led-resistance-display');
    const ledCurrentDisplay = document.getElementById('led-current-display');
    const ledHealth = document.getElementById('led-health');

    function updateLEDSim() {
        if (!ledVoltageSlider || !ledResistanceSlider) return;

        const v = parseFloat(ledVoltageSlider.value);
        const r = parseFloat(ledResistanceSlider.value);

        if (ledVoltageDisplay) ledVoltageDisplay.textContent = `${v}V`;
        if (ledResistanceDisplay) ledResistanceDisplay.textContent = `${r}Ω`;

        if (ledSim) {
            ledSim.setVoltage(v);
            ledSim.setResistance(r);

            const current = ledSim.getCurrent();
            if (ledCurrentDisplay) ledCurrentDisplay.textContent = `${current.toFixed(1)}mA`;

            const status = ledSim.getLEDStatus();
            if (ledHealth) {
                ledHealth.textContent = status.text;
                ledHealth.className = status.class;
            }
        }
    }

    if (ledVoltageSlider) {
        ledVoltageSlider.addEventListener('input', updateLEDSim);
    }

    if (ledResistanceSlider) {
        ledResistanceSlider.addEventListener('input', updateLEDSim);
    }

    // Initial calculation
    calculateLEDResistor();
}

function setupSeriesParallelControls() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            const targetTab = document.getElementById(btn.dataset.tab);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // Series controls
    ['series-r1', 'series-r2', 'series-r3'].forEach(id => {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', () => {
                const val = slider.value;
                const display = document.getElementById(`${id}-val`);
                if (display) display.textContent = `${val}Ω`;

                if (seriesSim) {
                    if (id === 'series-r1') seriesSim.setR1(parseInt(val));
                    if (id === 'series-r2') seriesSim.setR2(parseInt(val));
                    if (id === 'series-r3') seriesSim.setR3(parseInt(val));
                }

                updateSeriesResults();
            });
        }
    });

    // Parallel controls
    ['parallel-r1', 'parallel-r2', 'parallel-r3'].forEach(id => {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', () => {
                const val = slider.value;
                const display = document.getElementById(`${id}-val`);
                if (display) display.textContent = `${val}Ω`;

                if (parallelSim) {
                    if (id === 'parallel-r1') parallelSim.setR1(parseInt(val));
                    if (id === 'parallel-r2') parallelSim.setR2(parseInt(val));
                    if (id === 'parallel-r3') parallelSim.setR3(parseInt(val));
                }

                updateParallelResults();
            });
        }
    });

    function updateSeriesResults() {
        const r1 = parseInt(document.getElementById('series-r1')?.value || 200);
        const r2 = parseInt(document.getElementById('series-r2')?.value || 300);
        const r3 = parseInt(document.getElementById('series-r3')?.value || 500);

        const totalR = r1 + r2 + r3;
        const current = (9 / totalR * 1000).toFixed(1);

        const totalREl = document.getElementById('series-total-r');
        const currentEl = document.getElementById('series-current');

        if (totalREl) totalREl.textContent = `${totalR}Ω`;
        if (currentEl) currentEl.textContent = `${current}mA`;
    }

    function updateParallelResults() {
        const r1 = parseInt(document.getElementById('parallel-r1')?.value || 200);
        const r2 = parseInt(document.getElementById('parallel-r2')?.value || 300);
        const r3 = parseInt(document.getElementById('parallel-r3')?.value || 500);

        const totalR = 1 / (1/r1 + 1/r2 + 1/r3);
        const current = (9 / totalR * 1000).toFixed(1);

        const totalREl = document.getElementById('parallel-total-r');
        const currentEl = document.getElementById('parallel-current');

        if (totalREl) totalREl.textContent = `${totalR.toFixed(1)}Ω`;
        if (currentEl) currentEl.textContent = `${current}mA`;
    }
}

function setupCapacitorControls() {
    // Charge curve controls
    const capResistance = document.getElementById('cap-resistance');
    const capCapacitance = document.getElementById('cap-capacitance');
    const capRDisplay = document.getElementById('cap-r-display');
    const capCDisplay = document.getElementById('cap-c-display');
    const tauValue = document.getElementById('tau-value');

    function updateTau() {
        if (!capResistance || !capCapacitance) return;

        const r = parseFloat(capResistance.value);
        const c = parseFloat(capCapacitance.value);

        if (capRDisplay) capRDisplay.textContent = `${r}kΩ`;
        if (capCDisplay) capCDisplay.textContent = `${c}µF`;

        const tau = (r * 1000) * (c / 1000000);
        if (tauValue) tauValue.textContent = `${tau.toFixed(2)}s`;

        if (chargeCurveAnim) {
            chargeCurveAnim.setResistance(r);
            chargeCurveAnim.setCapacitance(c);
        }
    }

    if (capResistance) {
        capResistance.addEventListener('input', updateTau);
    }

    if (capCapacitance) {
        capCapacitance.addEventListener('input', updateTau);
    }

    // Capacitor simulator controls
    const chargeBtn = document.getElementById('cap-charge-btn');
    const dischargeBtn = document.getElementById('cap-discharge-btn');
    const resetBtn = document.getElementById('cap-reset-btn');

    if (chargeBtn) {
        chargeBtn.addEventListener('click', () => {
            if (capacitorSim) capacitorSim.charge();
        });
    }

    if (dischargeBtn) {
        dischargeBtn.addEventListener('click', () => {
            if (capacitorSim) capacitorSim.discharge();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (capacitorSim) capacitorSim.reset();
        });
    }

    // Update capacitor status display
    setInterval(() => {
        if (capacitorSim) {
            const voltage = capacitorSim.getCurrentVoltage();
            const percent = capacitorSim.getChargePercent();

            const voltageFill = document.getElementById('cap-voltage-fill');
            const voltageVal = document.getElementById('cap-voltage-val');
            const chargePercent = document.getElementById('cap-charge-percent');

            if (voltageFill) voltageFill.style.width = `${percent}%`;
            if (voltageVal) voltageVal.textContent = `${voltage.toFixed(1)}V`;
            if (chargePercent) chargePercent.textContent = `${Math.round(percent)}%`;
        }
    }, 50);
}

// Maak navigatie functie globaal beschikbaar
window.navigateToLesson = navigateToLesson;
window.calculateOhm = calculateOhm;
