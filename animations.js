// ============================================
// ElektroLab - Animations Module
// Visuele animaties voor elektronica concepten
// ============================================

class ElectronAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.electrons = [];
        this.isRunning = false;
        this.speed = 2;
        this.circuitPath = [];
        this.animationId = null;

        this.initCircuitPath();
        this.createElectrons(15);
    }

    initCircuitPath() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const padding = 50;

        // Rechthoekig circuit pad
        this.circuitPath = [
            { x: padding, y: h / 2 },
            { x: padding, y: padding },
            { x: w - padding, y: padding },
            { x: w - padding, y: h / 2 },
            { x: w - padding, y: h - padding },
            { x: padding, y: h - padding }
        ];
    }

    createElectrons(count) {
        this.electrons = [];
        for (let i = 0; i < count; i++) {
            this.electrons.push({
                pathPosition: i / count,
                size: 6 + Math.random() * 3
            });
        }
    }

    getPositionOnPath(t) {
        // t is 0 to 1, representing position along the circuit
        const totalSegments = this.circuitPath.length;
        const segmentLength = 1 / totalSegments;
        const segmentIndex = Math.floor(t * totalSegments) % totalSegments;
        const segmentT = (t * totalSegments) % 1;

        const start = this.circuitPath[segmentIndex];
        const end = this.circuitPath[(segmentIndex + 1) % totalSegments];

        return {
            x: start.x + (end.x - start.x) * segmentT,
            y: start.y + (end.y - start.y) * segmentT
        };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Teken circuit draden
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 8;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        this.ctx.beginPath();
        this.ctx.moveTo(this.circuitPath[0].x, this.circuitPath[0].y);
        for (let i = 1; i < this.circuitPath.length; i++) {
            this.ctx.lineTo(this.circuitPath[i].x, this.circuitPath[i].y);
        }
        this.ctx.closePath();
        this.ctx.stroke();

        // Teken batterij (linkerkant)
        this.drawBattery(50, this.canvas.height / 2 - 30);

        // Teken weerstand (rechterkant)
        this.drawResistor(this.canvas.width - 80, this.canvas.height / 2 - 15);

        // Teken elektronen
        this.electrons.forEach(electron => {
            const pos = this.getPositionOnPath(electron.pathPosition);

            // Glow effect
            const gradient = this.ctx.createRadialGradient(
                pos.x, pos.y, 0,
                pos.x, pos.y, electron.size * 2
            );
            gradient.addColorStop(0, 'rgba(78, 205, 196, 0.8)');
            gradient.addColorStop(0.5, 'rgba(78, 205, 196, 0.3)');
            gradient.addColorStop(1, 'rgba(78, 205, 196, 0)');

            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, electron.size * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Electron core
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, electron.size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#4ecdc4';
            this.ctx.fill();

            // Highlight
            this.ctx.beginPath();
            this.ctx.arc(pos.x - electron.size * 0.3, pos.y - electron.size * 0.3, electron.size * 0.3, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fill();
        });

        // Labels
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = 'bold 14px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Batterij (+)', 50, this.canvas.height / 2 + 55);
        this.ctx.fillText('Weerstand', this.canvas.width - 50, this.canvas.height / 2 + 40);
        this.ctx.fillText('Elektronenstroom', this.canvas.width / 2, 30);
    }

    drawBattery(x, y) {
        this.ctx.fillStyle = '#ffd93d';
        this.ctx.fillRect(x - 15, y, 30, 60);
        this.ctx.fillStyle = '#718096';
        this.ctx.fillRect(x - 8, y - 8, 16, 8);

        // + en - symbolen
        this.ctx.fillStyle = '#1a202c';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('+', x, y + 20);
        this.ctx.fillText('-', x, y + 50);
    }

    drawResistor(x, y) {
        this.ctx.strokeStyle = '#a0aec0';
        this.ctx.lineWidth = 3;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y + 15);
        this.ctx.lineTo(x + 10, y);
        this.ctx.lineTo(x + 20, y + 30);
        this.ctx.lineTo(x + 30, y);
        this.ctx.lineTo(x + 40, y + 30);
        this.ctx.lineTo(x + 50, y);
        this.ctx.lineTo(x + 60, y + 15);
        this.ctx.stroke();
    }

    update() {
        this.electrons.forEach(electron => {
            electron.pathPosition += this.speed * 0.002;
            if (electron.pathPosition > 1) {
                electron.pathPosition -= 1;
            }
        });
    }

    animate() {
        if (!this.isRunning) return;

        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    setSpeed(speed) {
        this.speed = speed;
    }
}

// Water Analogie Animatie
class WaterAnalogyAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.voltage = 6;
        this.resistance = 500;
        this.waterDrops = [];
        this.isRunning = true;

        this.createWaterDrops();
        this.animate();
    }

    createWaterDrops() {
        this.waterDrops = [];
        for (let i = 0; i < 20; i++) {
            this.waterDrops.push({
                x: 300 + Math.random() * 100,
                y: Math.random() * 200 + 100,
                speed: 1 + Math.random() * 2,
                size: 3 + Math.random() * 3
            });
        }
    }

    calculateCurrent() {
        return (this.voltage / this.resistance * 1000).toFixed(1);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const waterLevel = 50 + (12 - this.voltage) * 20;
        const pipeWidth = 60 - (this.resistance / 1000) * 40;
        const current = parseFloat(this.calculateCurrent());

        // Water reservoir (links)
        this.ctx.fillStyle = '#2d3748';
        this.ctx.fillRect(50, 50, 150, 300);

        // Water in reservoir
        const waterHeight = this.voltage * 20;
        const gradient = this.ctx.createLinearGradient(50, 350 - waterHeight, 50, 350);
        gradient.addColorStop(0, '#63b3ed');
        gradient.addColorStop(1, '#3182ce');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(52, 350 - waterHeight, 146, waterHeight);

        // Buizen
        this.ctx.fillStyle = '#4a5568';
        // Horizontale buis
        this.ctx.fillRect(200, 170 - pipeWidth/2, 300, pipeWidth);
        // Verticale buis (rechts)
        this.ctx.fillRect(500, 170, 50, 180);

        // Reservoir labels
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = 'bold 14px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('SPANNING', 125, 380);
        this.ctx.fillText(`${this.voltage}V`, 125, 400);

        // Weerstand indicator
        this.ctx.fillStyle = '#ffd93d';
        this.ctx.fillRect(320, 140, 60, 60);
        this.ctx.fillStyle = '#1a202c';
        this.ctx.font = 'bold 12px Segoe UI';
        this.ctx.fillText('WEERSTAND', 350, 170);
        this.ctx.fillText(`${this.resistance}Ω`, 350, 185);

        // Water druppels animatie (stroom)
        const dropSpeed = current / 5;
        this.waterDrops.forEach(drop => {
            this.ctx.beginPath();
            this.ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#63b3ed';
            this.ctx.fill();

            drop.y += dropSpeed * drop.speed;
            if (drop.y > 350) {
                drop.y = 170;
                drop.x = 300 + Math.random() * 100;
            }
        });

        // Stroom indicator
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = 'bold 16px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('STROOM', 550, 380);
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.fillText(`${this.calculateCurrent()} mA`, 550, 405);

        // Uitleg
        this.ctx.fillStyle = '#a0aec0';
        this.ctx.font = '13px Segoe UI';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('• Hogere spanning = meer druk = meer stroom', 50, 440);
        this.ctx.fillText('• Hogere weerstand = smallere buis = minder stroom', 50, 460);
    }

    animate() {
        if (!this.isRunning) return;
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    setVoltage(v) {
        this.voltage = v;
    }

    setResistance(r) {
        this.resistance = r;
    }
}

// Intro Animatie
class IntroAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.time = 0;

        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: 3 + Math.random() * 4,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Teken verbindingen
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (dist < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(78, 205, 196, ${1 - dist / 100})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });

        // Teken en update particles
        this.particles.forEach(p => {
            // Pulse effect
            p.pulse += 0.05;
            const pulseRadius = p.radius + Math.sin(p.pulse) * 2;

            // Glow
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseRadius * 3);
            gradient.addColorStop(0, 'rgba(78, 205, 196, 0.5)');
            gradient.addColorStop(1, 'rgba(78, 205, 196, 0)');

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, pulseRadius * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Core
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, pulseRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#4ecdc4';
            this.ctx.fill();

            // Update position
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off walls
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
        });

        // Title text
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = 'bold 24px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Ontdek de wereld van elektronica!', this.canvas.width / 2, this.canvas.height / 2);
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Laadcurve Animatie voor Condensator
class ChargeCurveAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resistance = 10000; // 10kΩ
        this.capacitance = 0.0001; // 100µF
        this.maxVoltage = 9;
        this.time = 0;
        this.isCharging = true;

        this.draw();
    }

    getTau() {
        return this.resistance * this.capacitance;
    }

    getVoltageAtTime(t, charging = true) {
        const tau = this.getTau();
        if (charging) {
            return this.maxVoltage * (1 - Math.exp(-t / tau));
        } else {
            return this.maxVoltage * Math.exp(-t / tau);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const padding = 60;
        const graphWidth = this.canvas.width - padding * 2;
        const graphHeight = this.canvas.height - padding * 2;
        const tau = this.getTau();
        const maxTime = tau * 5;

        // Assen
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 2;

        // Y-as
        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding);
        this.ctx.lineTo(padding, this.canvas.height - padding);
        this.ctx.stroke();

        // X-as
        this.ctx.beginPath();
        this.ctx.moveTo(padding, this.canvas.height - padding);
        this.ctx.lineTo(this.canvas.width - padding, this.canvas.height - padding);
        this.ctx.stroke();

        // Grid lijnen
        this.ctx.strokeStyle = '#2d3748';
        this.ctx.lineWidth = 1;
        for (let i = 1; i <= 5; i++) {
            const y = padding + (graphHeight / 5) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, this.canvas.height - y + padding);
            this.ctx.lineTo(this.canvas.width - padding, this.canvas.height - y + padding);
            this.ctx.stroke();
        }

        // Tau lijnen
        this.ctx.strokeStyle = '#ffd93d';
        this.ctx.setLineDash([5, 5]);
        for (let i = 1; i <= 5; i++) {
            const x = padding + (graphWidth / 5) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(x, padding);
            this.ctx.lineTo(x, this.canvas.height - padding);
            this.ctx.stroke();
        }
        this.ctx.setLineDash([]);

        // Laadcurve
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#4ecdc4';
        this.ctx.lineWidth = 3;

        for (let i = 0; i <= graphWidth; i++) {
            const t = (i / graphWidth) * maxTime;
            const v = this.getVoltageAtTime(t, true);
            const x = padding + i;
            const y = this.canvas.height - padding - (v / this.maxVoltage) * graphHeight;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();

        // Ontlaadcurve
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#ff6b6b';
        this.ctx.lineWidth = 3;

        for (let i = 0; i <= graphWidth; i++) {
            const t = (i / graphWidth) * maxTime;
            const v = this.getVoltageAtTime(t, false);
            const x = padding + i;
            const y = this.canvas.height - padding - (v / this.maxVoltage) * graphHeight;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();

        // Labels
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = '14px Segoe UI';
        this.ctx.textAlign = 'center';

        // X-as label
        this.ctx.fillText('Tijd', this.canvas.width / 2, this.canvas.height - 15);

        // Tau markers
        for (let i = 1; i <= 5; i++) {
            const x = padding + (graphWidth / 5) * i;
            this.ctx.fillStyle = '#ffd93d';
            this.ctx.fillText(`${i}τ`, x, this.canvas.height - padding + 20);
        }

        // Y-as label
        this.ctx.save();
        this.ctx.translate(20, this.canvas.height / 2);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.fillText('Spanning (V)', 0, 0);
        this.ctx.restore();

        // Y-as waarden
        this.ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
            const v = (this.maxVoltage / 5) * i;
            const y = this.canvas.height - padding - (graphHeight / 5) * i;
            this.ctx.fillStyle = '#a0aec0';
            this.ctx.fillText(v.toFixed(1) + 'V', padding - 10, y + 5);
        }

        // Legenda
        this.ctx.textAlign = 'left';
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.fillRect(this.canvas.width - 150, 20, 20, 3);
        this.ctx.fillText('Laden', this.canvas.width - 120, 25);

        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fillRect(this.canvas.width - 150, 40, 20, 3);
        this.ctx.fillText('Ontladen', this.canvas.width - 120, 45);

        // 63% marker
        const y63 = this.canvas.height - padding - 0.63 * graphHeight;
        this.ctx.strokeStyle = '#7bed9f';
        this.ctx.setLineDash([3, 3]);
        this.ctx.beginPath();
        this.ctx.moveTo(padding, y63);
        this.ctx.lineTo(padding + graphWidth / 5, y63);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        this.ctx.fillStyle = '#7bed9f';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('63%', padding + graphWidth / 5 + 5, y63 + 5);
    }

    setResistance(r) {
        this.resistance = r * 1000; // Convert kΩ to Ω
        this.draw();
    }

    setCapacitance(c) {
        this.capacitance = c / 1000000; // Convert µF to F
        this.draw();
    }
}

// Export voor gebruik in andere modules
window.ElectronAnimation = ElectronAnimation;
window.WaterAnalogyAnimation = WaterAnalogyAnimation;
window.IntroAnimation = IntroAnimation;
window.ChargeCurveAnimation = ChargeCurveAnimation;
