// ============================================
// ElektroLab - Simulations Module
// Interactieve circuit simulaties
// ============================================

// Ohm's Law Circuit Simulator
class OhmCircuitSimulator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.voltage = 9;
        this.resistance = 1000;
        this.electrons = [];
        this.isRunning = true;

        this.createElectrons();
        this.animate();
    }

    getCurrent() {
        return this.voltage / this.resistance;
    }

    getPower() {
        const I = this.getCurrent();
        return this.voltage * I;
    }

    createElectrons() {
        this.electrons = [];
        for (let i = 0; i < 20; i++) {
            this.electrons.push({
                position: Math.random(),
                offset: Math.random() * 6 - 3
            });
        }
    }

    getCircuitPath() {
        return [
            { x: 100, y: 175 },  // Batterij +
            { x: 100, y: 50 },
            { x: 600, y: 50 },
            { x: 600, y: 175 },  // Weerstand top
            { x: 600, y: 300 },  // Weerstand bottom
            { x: 100, y: 300 },
            { x: 100, y: 175 }   // Terug naar batterij
        ];
    }

    getPositionOnPath(t) {
        const path = this.getCircuitPath();
        const totalLength = this.getPathLength();
        let targetDistance = t * totalLength;
        let currentDistance = 0;

        for (let i = 0; i < path.length - 1; i++) {
            const segmentLength = Math.hypot(
                path[i + 1].x - path[i].x,
                path[i + 1].y - path[i].y
            );

            if (currentDistance + segmentLength >= targetDistance) {
                const segmentT = (targetDistance - currentDistance) / segmentLength;
                return {
                    x: path[i].x + (path[i + 1].x - path[i].x) * segmentT,
                    y: path[i].y + (path[i + 1].y - path[i].y) * segmentT
                };
            }

            currentDistance += segmentLength;
        }

        return path[0];
    }

    getPathLength() {
        const path = this.getCircuitPath();
        let length = 0;
        for (let i = 0; i < path.length - 1; i++) {
            length += Math.hypot(
                path[i + 1].x - path[i].x,
                path[i + 1].y - path[i].y
            );
        }
        return length;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const path = this.getCircuitPath();

        // Teken draden
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 6;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        this.ctx.beginPath();
        this.ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
            this.ctx.lineTo(path[i].x, path[i].y);
        }
        this.ctx.stroke();

        // Teken batterij
        this.drawBattery(70, 135, this.voltage);

        // Teken weerstand
        this.drawResistor(570, 130, this.resistance);

        // Teken ammeter
        this.drawAmmeter(350, 300, this.getCurrent() * 1000);

        // Teken elektronen
        const speed = this.getCurrent() * 500;
        this.electrons.forEach(e => {
            const pos = this.getPositionOnPath(e.position);

            // Glow
            const gradient = this.ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 12);
            gradient.addColorStop(0, 'rgba(78, 205, 196, 0.6)');
            gradient.addColorStop(1, 'rgba(78, 205, 196, 0)');

            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Electron
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = '#4ecdc4';
            this.ctx.fill();

            // Update position
            e.position += speed * 0.00001;
            if (e.position > 1) e.position -= 1;
        });

        // Labels
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = 'bold 14px Segoe UI';
        this.ctx.textAlign = 'center';

        // Formule weergave
        this.ctx.fillStyle = '#ffd93d';
        this.ctx.font = '16px Courier New';
        const I = (this.getCurrent() * 1000).toFixed(2);
        this.ctx.fillText(`V = I × R`, 350, 150);
        this.ctx.fillText(`${this.voltage}V = ${I}mA × ${this.resistance}Ω`, 350, 175);
    }

    drawBattery(x, y, voltage) {
        // Batterij body
        this.ctx.fillStyle = '#ffd93d';
        this.ctx.fillRect(x, y, 60, 80);

        // Batterij tip
        this.ctx.fillStyle = '#718096';
        this.ctx.fillRect(x + 20, y - 10, 20, 10);

        // Spanning label
        this.ctx.fillStyle = '#1a202c';
        this.ctx.font = 'bold 16px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${voltage}V`, x + 30, y + 50);

        // + en - symbolen
        this.ctx.fillText('+', x + 30, y + 25);
        this.ctx.fillText('-', x + 30, y + 70);
    }

    drawResistor(x, y, resistance) {
        const displayR = resistance >= 1000 ? `${(resistance/1000).toFixed(1)}kΩ` : `${resistance}Ω`;

        // Weerstand zigzag
        this.ctx.strokeStyle = '#a0aec0';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);

        const zigzagHeight = 100;
        const zigzagWidth = 20;
        const segments = 6;

        for (let i = 0; i < segments; i++) {
            const yOffset = y + (zigzagHeight / segments) * (i + 0.5);
            const xOffset = (i % 2 === 0) ? x - zigzagWidth : x + zigzagWidth;
            this.ctx.lineTo(xOffset, yOffset);
        }
        this.ctx.lineTo(x, y + zigzagHeight);
        this.ctx.stroke();

        // Label
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = 'bold 14px Segoe UI';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(displayR, x + 30, y + 55);
    }

    drawAmmeter(x, y, currentMA) {
        // Cirkel
        this.ctx.beginPath();
        this.ctx.arc(x, y, 25, 0, Math.PI * 2);
        this.ctx.fillStyle = '#2d3748';
        this.ctx.fill();
        this.ctx.strokeStyle = '#4ecdc4';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // A symbool
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.font = 'bold 14px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('A', x, y + 5);

        // Waarde
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = '12px Segoe UI';
        this.ctx.fillText(`${currentMA.toFixed(2)}mA`, x, y + 45);
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

// LED Circuit Simulator
class LEDSimulator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.voltage = 5;
        this.resistance = 220;
        this.ledVoltage = 2.0;
        this.ledMaxCurrent = 20; // mA
        this.electrons = [];
        this.ledHealth = 100;
        this.isRunning = true;
        this.ledColor = '#ff0000';

        this.createElectrons();
        this.animate();
    }

    getCurrent() {
        if (this.voltage <= this.ledVoltage) return 0;
        if (this.resistance === 0) return 999; // Kort-sluiting
        return ((this.voltage - this.ledVoltage) / this.resistance) * 1000; // mA
    }

    getLEDStatus() {
        const current = this.getCurrent();
        if (current === 0) return { status: 'off', text: 'Uit', class: 'off' };
        if (current < 5) return { status: 'dim', text: 'Zwak', class: 'warning' };
        if (current <= 20) return { status: 'normal', text: 'Gezond ✓', class: 'healthy' };
        if (current <= 30) return { status: 'bright', text: 'Te helder ⚠', class: 'warning' };
        return { status: 'burned', text: 'Doorgebrand! ✗', class: 'danger' };
    }

    createElectrons() {
        this.electrons = [];
        for (let i = 0; i < 15; i++) {
            this.electrons.push({
                position: Math.random()
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const status = this.getLEDStatus();
        const current = this.getCurrent();

        // Circuit pad
        const path = [
            { x: 100, y: 200 },
            { x: 100, y: 80 },
            { x: 350, y: 80 },   // Naar weerstand
            { x: 450, y: 80 },   // Na weerstand
            { x: 600, y: 80 },
            { x: 600, y: 200 },  // LED positie
            { x: 600, y: 320 },
            { x: 100, y: 320 },
            { x: 100, y: 200 }
        ];

        // Teken draden
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 6;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        path.forEach((p, i) => {
            if (i === 0) this.ctx.moveTo(p.x, p.y);
            else this.ctx.lineTo(p.x, p.y);
        });
        this.ctx.stroke();

        // Batterij
        this.drawBattery(70, 160, this.voltage);

        // Weerstand
        this.drawResistor(350, 60, this.resistance);

        // LED
        this.drawLED(575, 180, status, current);

        // Elektronen (alleen als er stroom is en LED niet doorgebrand)
        if (current > 0 && status.status !== 'burned') {
            const speed = Math.min(current, 30) * 0.003;
            this.electrons.forEach(e => {
                const pos = this.getPositionOnPath(e.position, path);

                this.ctx.beginPath();
                this.ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
                this.ctx.fillStyle = '#4ecdc4';
                this.ctx.fill();

                e.position += speed;
                if (e.position > 1) e.position -= 1;
            });
        }

        // Info display
        this.drawInfoPanel(current, status);
    }

    getPositionOnPath(t, path) {
        const totalLength = path.reduce((sum, p, i) => {
            if (i === 0) return 0;
            return sum + Math.hypot(p.x - path[i-1].x, p.y - path[i-1].y);
        }, 0);

        let targetDist = t * totalLength;
        let currentDist = 0;

        for (let i = 0; i < path.length - 1; i++) {
            const segLen = Math.hypot(path[i+1].x - path[i].x, path[i+1].y - path[i].y);
            if (currentDist + segLen >= targetDist) {
                const segT = (targetDist - currentDist) / segLen;
                return {
                    x: path[i].x + (path[i+1].x - path[i].x) * segT,
                    y: path[i].y + (path[i+1].y - path[i].y) * segT
                };
            }
            currentDist += segLen;
        }
        return path[0];
    }

    drawBattery(x, y, voltage) {
        this.ctx.fillStyle = '#ffd93d';
        this.ctx.fillRect(x, y, 60, 80);
        this.ctx.fillStyle = '#718096';
        this.ctx.fillRect(x + 20, y - 10, 20, 10);

        this.ctx.fillStyle = '#1a202c';
        this.ctx.font = 'bold 16px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${voltage}V`, x + 30, y + 50);
    }

    drawResistor(x, y, resistance) {
        // Weerstand body
        this.ctx.fillStyle = '#d4a574';
        this.ctx.fillRect(x, y, 80, 25);

        // Kleurringen (vereenvoudigd)
        const colors = ['#8b4513', '#000', '#ff0000', '#ffd700'];
        colors.forEach((c, i) => {
            this.ctx.fillStyle = c;
            this.ctx.fillRect(x + 10 + i * 18, y, 8, 25);
        });

        // Label
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = '12px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${resistance}Ω`, x + 40, y + 45);
    }

    drawLED(x, y, status, current) {
        // LED behuizing
        this.ctx.beginPath();
        this.ctx.arc(x, y, 25, 0, Math.PI * 2);

        if (status.status === 'burned') {
            this.ctx.fillStyle = '#2d3748';
        } else if (status.status === 'off') {
            this.ctx.fillStyle = '#4a1515';
        } else {
            // Brightness based on current
            const brightness = Math.min(current / 20, 1);
            this.ctx.fillStyle = this.ledColor;

            // Glow effect
            if (brightness > 0) {
                const glowSize = 30 + brightness * 40;
                const gradient = this.ctx.createRadialGradient(x, y, 10, x, y, glowSize);
                gradient.addColorStop(0, this.ledColor);
                gradient.addColorStop(0.5, `${this.ledColor}88`);
                gradient.addColorStop(1, 'transparent');

                this.ctx.beginPath();
                this.ctx.arc(x, y, glowSize, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }
        }

        // LED body
        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, Math.PI * 2);
        if (status.status === 'burned') {
            this.ctx.fillStyle = '#1a1a1a';
        } else {
            this.ctx.fillStyle = status.status === 'off' ? '#3d1515' : this.ledColor;
        }
        this.ctx.fill();
        this.ctx.strokeStyle = '#666';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Burned effect
        if (status.status === 'burned') {
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.font = 'bold 24px Segoe UI';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('✗', x, y + 8);
        }
    }

    drawInfoPanel(current, status) {
        // Info box
        this.ctx.fillStyle = '#1a202c';
        this.ctx.fillRect(200, 350, 300, 40);
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.strokeRect(200, 350, 300, 40);

        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = '14px Segoe UI';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Stroom: ${current.toFixed(1)}mA`, 220, 375);

        // Status indicator
        let statusColor = '#4ecdc4';
        if (status.class === 'warning') statusColor = '#ffd93d';
        if (status.class === 'danger') statusColor = '#ff6b6b';

        this.ctx.fillStyle = statusColor;
        this.ctx.textAlign = 'right';
        this.ctx.fillText(status.text, 480, 375);
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

    setLEDColor(color) {
        this.ledColor = color;
    }
}

// Series Circuit Simulator
class SeriesCircuitSimulator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.voltage = 9;
        this.r1 = 200;
        this.r2 = 300;
        this.r3 = 500;
        this.electrons = [];
        this.isRunning = true;

        this.createElectrons();
        this.animate();
    }

    getTotalResistance() {
        return this.r1 + this.r2 + this.r3;
    }

    getCurrent() {
        return this.voltage / this.getTotalResistance();
    }

    createElectrons() {
        this.electrons = [];
        for (let i = 0; i < 15; i++) {
            this.electrons.push({ position: Math.random() });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const current = this.getCurrent() * 1000; // mA
        const totalR = this.getTotalResistance();

        // Circuit pad (rechthoek)
        const path = [
            { x: 80, y: 175 },
            { x: 80, y: 60 },
            { x: 200, y: 60 },  // R1 start
            { x: 280, y: 60 },  // R1 end
            { x: 350, y: 60 },  // R2 start
            { x: 430, y: 60 },  // R2 end
            { x: 500, y: 60 },  // R3 start
            { x: 580, y: 60 },  // R3 end
            { x: 620, y: 60 },
            { x: 620, y: 290 },
            { x: 80, y: 290 },
            { x: 80, y: 175 }
        ];

        // Draden
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        path.forEach((p, i) => {
            if (i === 0) this.ctx.moveTo(p.x, p.y);
            else this.ctx.lineTo(p.x, p.y);
        });
        this.ctx.stroke();

        // Batterij
        this.drawBattery(50, 135);

        // Weerstanden in serie
        this.drawResistorHorizontal(200, 45, this.r1, 'R₁');
        this.drawResistorHorizontal(350, 45, this.r2, 'R₂');
        this.drawResistorHorizontal(500, 45, this.r3, 'R₃');

        // Spanning over elke weerstand
        const v1 = (this.r1 / totalR * this.voltage).toFixed(2);
        const v2 = (this.r2 / totalR * this.voltage).toFixed(2);
        const v3 = (this.r3 / totalR * this.voltage).toFixed(2);

        this.ctx.fillStyle = '#ffd93d';
        this.ctx.font = '11px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${v1}V`, 240, 100);
        this.ctx.fillText(`${v2}V`, 390, 100);
        this.ctx.fillText(`${v3}V`, 540, 100);

        // Elektronen
        const speed = current * 0.003;
        this.electrons.forEach(e => {
            const pos = this.getPositionOnPath(e.position, path);
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = '#4ecdc4';
            this.ctx.fill();

            e.position += speed;
            if (e.position > 1) e.position -= 1;
        });

        // Info
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = 'bold 14px Segoe UI';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Stroom: ${current.toFixed(2)}mA (overal gelijk!)`, 200, 320);
        this.ctx.fillText(`V₁ + V₂ + V₃ = ${v1}V + ${v2}V + ${v3}V = ${this.voltage}V`, 200, 340);
    }

    getPositionOnPath(t, path) {
        const totalLength = path.reduce((sum, p, i) => {
            if (i === 0) return 0;
            return sum + Math.hypot(p.x - path[i-1].x, p.y - path[i-1].y);
        }, 0);

        let targetDist = t * totalLength;
        let currentDist = 0;

        for (let i = 0; i < path.length - 1; i++) {
            const segLen = Math.hypot(path[i+1].x - path[i].x, path[i+1].y - path[i].y);
            if (currentDist + segLen >= targetDist) {
                const segT = (targetDist - currentDist) / segLen;
                return {
                    x: path[i].x + (path[i+1].x - path[i].x) * segT,
                    y: path[i].y + (path[i+1].y - path[i].y) * segT
                };
            }
            currentDist += segLen;
        }
        return path[0];
    }

    drawBattery(x, y) {
        this.ctx.fillStyle = '#ffd93d';
        this.ctx.fillRect(x, y, 60, 80);
        this.ctx.fillStyle = '#1a202c';
        this.ctx.font = 'bold 14px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${this.voltage}V`, x + 30, y + 45);
    }

    drawResistorHorizontal(x, y, value, label) {
        // Zigzag
        this.ctx.strokeStyle = '#a0aec0';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + 15);

        const width = 80;
        const height = 15;
        const segments = 5;

        for (let i = 0; i < segments; i++) {
            const xOff = x + (width / segments) * (i + 0.5);
            const yOff = (i % 2 === 0) ? y : y + 30;
            this.ctx.lineTo(xOff, yOff);
        }
        this.ctx.lineTo(x + width, y + 15);
        this.ctx.stroke();

        // Label
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = '12px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${label}=${value}Ω`, x + 40, y + 50);
    }

    animate() {
        if (!this.isRunning) return;
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    setR1(r) { this.r1 = r; }
    setR2(r) { this.r2 = r; }
    setR3(r) { this.r3 = r; }
}

// Parallel Circuit Simulator
class ParallelCircuitSimulator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.voltage = 9;
        this.r1 = 200;
        this.r2 = 300;
        this.r3 = 500;
        this.electrons = { main: [], branch1: [], branch2: [], branch3: [] };
        this.isRunning = true;

        this.createElectrons();
        this.animate();
    }

    getTotalResistance() {
        return 1 / (1/this.r1 + 1/this.r2 + 1/this.r3);
    }

    getTotalCurrent() {
        return this.voltage / this.getTotalResistance();
    }

    getBranchCurrent(r) {
        return this.voltage / r;
    }

    createElectrons() {
        for (let i = 0; i < 8; i++) {
            this.electrons.main.push({ position: Math.random() });
        }
        for (let i = 0; i < 5; i++) {
            this.electrons.branch1.push({ position: Math.random() });
            this.electrons.branch2.push({ position: Math.random() });
            this.electrons.branch3.push({ position: Math.random() });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const totalR = this.getTotalResistance();
        const totalI = this.getTotalCurrent() * 1000;
        const i1 = this.getBranchCurrent(this.r1) * 1000;
        const i2 = this.getBranchCurrent(this.r2) * 1000;
        const i3 = this.getBranchCurrent(this.r3) * 1000;

        // Hoofd circuit
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 5;

        // Linker rail
        this.ctx.beginPath();
        this.ctx.moveTo(80, 175);
        this.ctx.lineTo(80, 50);
        this.ctx.lineTo(200, 50);
        this.ctx.moveTo(200, 50);
        this.ctx.lineTo(200, 300);
        this.ctx.lineTo(80, 300);
        this.ctx.lineTo(80, 175);
        this.ctx.stroke();

        // Rechter rail
        this.ctx.beginPath();
        this.ctx.moveTo(550, 50);
        this.ctx.lineTo(620, 50);
        this.ctx.lineTo(620, 300);
        this.ctx.lineTo(550, 300);
        this.ctx.stroke();

        // Parallelle takken
        // Tak 1 (boven)
        this.ctx.beginPath();
        this.ctx.moveTo(200, 80);
        this.ctx.lineTo(550, 80);
        this.ctx.stroke();

        // Tak 2 (midden)
        this.ctx.beginPath();
        this.ctx.moveTo(200, 175);
        this.ctx.lineTo(550, 175);
        this.ctx.stroke();

        // Tak 3 (onder)
        this.ctx.beginPath();
        this.ctx.moveTo(200, 270);
        this.ctx.lineTo(550, 270);
        this.ctx.stroke();

        // Batterij
        this.drawBattery(50, 135);

        // Weerstanden
        this.drawResistorHorizontal(340, 65, this.r1, 'R₁', i1);
        this.drawResistorHorizontal(340, 160, this.r2, 'R₂', i2);
        this.drawResistorHorizontal(340, 255, this.r3, 'R₃', i3);

        // Elektronen in takken
        this.drawBranchElectrons(this.electrons.branch1, [
            {x: 200, y: 80}, {x: 550, y: 80}
        ], i1 * 0.003);

        this.drawBranchElectrons(this.electrons.branch2, [
            {x: 200, y: 175}, {x: 550, y: 175}
        ], i2 * 0.003);

        this.drawBranchElectrons(this.electrons.branch3, [
            {x: 200, y: 270}, {x: 550, y: 270}
        ], i3 * 0.003);

        // Info
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = 'bold 13px Segoe UI';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Spanning: ${this.voltage}V (overal gelijk!)`, 200, 320);
        this.ctx.fillText(`I₁ + I₂ + I₃ = ${i1.toFixed(1)} + ${i2.toFixed(1)} + ${i3.toFixed(1)} = ${totalI.toFixed(1)}mA`, 200, 340);
    }

    drawBranchElectrons(electrons, path, speed) {
        electrons.forEach(e => {
            const x = path[0].x + (path[1].x - path[0].x) * e.position;
            const y = path[0].y;

            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = '#4ecdc4';
            this.ctx.fill();

            e.position += speed;
            if (e.position > 1) e.position = 0;
        });
    }

    drawBattery(x, y) {
        this.ctx.fillStyle = '#ffd93d';
        this.ctx.fillRect(x, y, 60, 80);
        this.ctx.fillStyle = '#1a202c';
        this.ctx.font = 'bold 14px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${this.voltage}V`, x + 30, y + 45);
    }

    drawResistorHorizontal(x, y, value, label, current) {
        // Zigzag
        this.ctx.strokeStyle = '#a0aec0';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + 15);

        const width = 70;
        const segments = 5;

        for (let i = 0; i < segments; i++) {
            const xOff = x + (width / segments) * (i + 0.5);
            const yOff = (i % 2 === 0) ? y : y + 30;
            this.ctx.lineTo(xOff, yOff);
        }
        this.ctx.lineTo(x + width, y + 15);
        this.ctx.stroke();

        // Labels
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = '11px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${label}=${value}Ω`, x + 35, y - 5);

        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.fillText(`${current.toFixed(1)}mA`, x + 35, y + 45);
    }

    animate() {
        if (!this.isRunning) return;
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    setR1(r) { this.r1 = r; }
    setR2(r) { this.r2 = r; }
    setR3(r) { this.r3 = r; }
}

// Capacitor Simulator
class CapacitorSimulator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.maxVoltage = 9;
        this.currentVoltage = 0;
        this.resistance = 10000; // 10kΩ
        this.capacitance = 0.0001; // 100µF
        this.isCharging = false;
        this.isDischarging = false;
        this.electrons = [];
        this.chargeParticles = [];

        this.createElectrons();
        this.animate();
    }

    getTau() {
        return this.resistance * this.capacitance;
    }

    createElectrons() {
        for (let i = 0; i < 15; i++) {
            this.electrons.push({ position: Math.random() });
        }
    }

    charge() {
        this.isCharging = true;
        this.isDischarging = false;
    }

    discharge() {
        this.isDischarging = true;
        this.isCharging = false;
    }

    reset() {
        this.currentVoltage = 0;
        this.isCharging = false;
        this.isDischarging = false;
        this.chargeParticles = [];
    }

    update() {
        const tau = this.getTau();
        const dt = 0.016; // ~60fps

        if (this.isCharging) {
            // Exponentiële lading: V = Vmax * (1 - e^(-t/τ))
            const targetV = this.maxVoltage;
            const diff = targetV - this.currentVoltage;
            this.currentVoltage += diff * (dt / tau) * 2;

            if (this.currentVoltage >= this.maxVoltage * 0.99) {
                this.currentVoltage = this.maxVoltage;
                this.isCharging = false;
            }

            // Voeg lading particles toe
            if (Math.random() < 0.3) {
                this.chargeParticles.push({
                    x: 250,
                    y: 200,
                    targetX: 350 + Math.random() * 20 - 10,
                    targetY: 150 + Math.random() * 100,
                    progress: 0
                });
            }
        }

        if (this.isDischarging) {
            // Exponentiële ontlading: V = Vstart * e^(-t/τ)
            this.currentVoltage *= (1 - (dt / tau) * 2);

            if (this.currentVoltage < 0.01) {
                this.currentVoltage = 0;
                this.isDischarging = false;
            }

            // Verwijder lading particles
            if (this.chargeParticles.length > 0 && Math.random() < 0.2) {
                this.chargeParticles.pop();
            }
        }

        // Update charge particles
        this.chargeParticles = this.chargeParticles.filter(p => {
            p.progress += 0.05;
            return p.progress < 1;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Circuit
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 5;

        // Draden
        this.ctx.beginPath();
        this.ctx.moveTo(100, 200);
        this.ctx.lineTo(100, 100);
        this.ctx.lineTo(350, 100);
        this.ctx.moveTo(400, 100);
        this.ctx.lineTo(600, 100);
        this.ctx.lineTo(600, 200);
        this.ctx.lineTo(600, 300);
        this.ctx.lineTo(100, 300);
        this.ctx.lineTo(100, 200);
        this.ctx.stroke();

        // Batterij
        this.drawBattery(70, 160);

        // Weerstand
        this.drawResistor(200, 85);

        // Condensator
        this.drawCapacitor(350, 150, this.currentVoltage / this.maxVoltage);

        // Schakelaar indicator
        this.ctx.fillStyle = this.isCharging ? '#4ecdc4' : (this.isDischarging ? '#ff6b6b' : '#4a5568');
        this.ctx.beginPath();
        this.ctx.arc(450, 100, 8, 0, Math.PI * 2);
        this.ctx.fill();

        // Status
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = '14px Segoe UI';
        this.ctx.textAlign = 'center';

        let statusText = 'Inactief';
        if (this.isCharging) statusText = 'Laden...';
        if (this.isDischarging) statusText = 'Ontladen...';

        this.ctx.fillText(statusText, 350, 350);

        // Charge particles (tijdens laden)
        this.chargeParticles.forEach(p => {
            const x = p.x + (p.targetX - p.x) * p.progress;
            const y = p.y + (p.targetY - p.y) * p.progress;

            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = '#4ecdc4';
            this.ctx.fill();
        });

        // Elektronen (wanneer stroom vloeit)
        if (this.isCharging || this.isDischarging) {
            const speed = this.isCharging ? 0.01 : -0.01;
            this.electrons.forEach(e => {
                // Simplified path
                const x = 100 + e.position * 500;
                const y = e.position < 0.2 ? 200 - e.position * 500 :
                         e.position < 0.5 ? 100 :
                         e.position < 0.7 ? 100 + (e.position - 0.5) * 1000 :
                         300;

                this.ctx.beginPath();
                this.ctx.arc(x, y, 4, 0, Math.PI * 2);
                this.ctx.fillStyle = '#4ecdc4';
                this.ctx.fill();

                e.position += speed;
                if (e.position > 1) e.position = 0;
                if (e.position < 0) e.position = 1;
            });
        }
    }

    drawBattery(x, y) {
        this.ctx.fillStyle = '#ffd93d';
        this.ctx.fillRect(x, y, 60, 80);
        this.ctx.fillStyle = '#1a202c';
        this.ctx.font = 'bold 14px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${this.maxVoltage}V`, x + 30, y + 45);
    }

    drawResistor(x, y) {
        this.ctx.strokeStyle = '#a0aec0';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + 15);

        for (let i = 0; i < 5; i++) {
            const xOff = x + 15 * (i + 0.5);
            const yOff = (i % 2 === 0) ? y : y + 30;
            this.ctx.lineTo(xOff, yOff);
        }
        this.ctx.lineTo(x + 80, y + 15);
        this.ctx.stroke();

        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = '11px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('R', x + 40, y + 50);
    }

    drawCapacitor(x, y, chargeLevel) {
        // Platen
        this.ctx.fillStyle = '#718096';
        this.ctx.fillRect(x, y, 8, 100);
        this.ctx.fillRect(x + 40, y, 8, 100);

        // Lading visualisatie
        const chargeHeight = chargeLevel * 90;
        if (chargeHeight > 0) {
            // Positieve plaat (links)
            const gradient = this.ctx.createLinearGradient(x, y + 100 - chargeHeight, x, y + 100);
            gradient.addColorStop(0, '#ff6b6b');
            gradient.addColorStop(1, '#ff6b6b88');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x + 1, y + 100 - chargeHeight, 6, chargeHeight);

            // Negatieve plaat (rechts)
            const gradient2 = this.ctx.createLinearGradient(x + 40, y + 100 - chargeHeight, x + 40, y + 100);
            gradient2.addColorStop(0, '#4ecdc4');
            gradient2.addColorStop(1, '#4ecdc488');
            this.ctx.fillStyle = gradient2;
            this.ctx.fillRect(x + 41, y + 100 - chargeHeight, 6, chargeHeight);
        }

        // + en - symbolen
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = 'bold 16px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('+', x + 4, y - 10);
        this.ctx.fillText('-', x + 44, y - 10);

        // Spanning weergave
        this.ctx.fillStyle = '#ffd93d';
        this.ctx.font = 'bold 14px Segoe UI';
        this.ctx.fillText(`${this.currentVoltage.toFixed(1)}V`, x + 24, y + 120);

        // Label
        this.ctx.fillStyle = '#a0aec0';
        this.ctx.font = '11px Segoe UI';
        this.ctx.fillText('C', x + 24, y + 140);
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    getCurrentVoltage() {
        return this.currentVoltage;
    }

    getChargePercent() {
        return (this.currentVoltage / this.maxVoltage) * 100;
    }
}

// Export
window.OhmCircuitSimulator = OhmCircuitSimulator;
window.LEDSimulator = LEDSimulator;
window.SeriesCircuitSimulator = SeriesCircuitSimulator;
window.ParallelCircuitSimulator = ParallelCircuitSimulator;
window.CapacitorSimulator = CapacitorSimulator;
