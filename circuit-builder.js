// ============================================
// ElektroLab - Circuit Builder Module
// Drag & drop circuit bouwen
// ============================================

class CircuitBuilder {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.components = [];
        this.wires = [];
        this.selectedComponent = null;
        this.dragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.isSimulating = false;
        this.gridSize = 20;
        this.electrons = [];

        this.setupEventListeners();
        this.draw();
    }

    setupEventListeners() {
        // Canvas events
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.handleMouseUp());
        this.canvas.addEventListener('dblclick', (e) => this.handleDoubleClick(e));

        // Drag and drop van palette
        const palette = document.querySelectorAll('.palette-component');
        palette.forEach(comp => {
            comp.addEventListener('dragstart', (e) => this.handleDragStart(e));
        });

        this.canvas.addEventListener('dragover', (e) => e.preventDefault());
        this.canvas.addEventListener('drop', (e) => this.handleDrop(e));

        // Control buttons
        const clearBtn = document.getElementById('builder-clear');
        const simBtn = document.getElementById('builder-simulate');
        const stopBtn = document.getElementById('builder-stop');

        if (clearBtn) clearBtn.addEventListener('click', () => this.clear());
        if (simBtn) simBtn.addEventListener('click', () => this.startSimulation());
        if (stopBtn) stopBtn.addEventListener('click', () => this.stopSimulation());

        // Preset buttons
        const presetBtns = document.querySelectorAll('.preset-btn');
        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => this.loadPreset(btn.dataset.preset));
        });
    }

    handleDragStart(e) {
        e.dataTransfer.setData('component-type', e.target.dataset.type);
    }

    handleDrop(e) {
        e.preventDefault();
        const type = e.dataTransfer.getData('component-type');
        const rect = this.canvas.getBoundingClientRect();
        const x = this.snapToGrid(e.clientX - rect.left);
        const y = this.snapToGrid(e.clientY - rect.top);

        this.addComponent(type, x, y);
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check of we op een component klikken
        const component = this.getComponentAt(x, y);
        if (component) {
            this.selectedComponent = component;
            this.dragging = true;
            this.dragOffset = {
                x: x - component.x,
                y: y - component.y
            };
            this.updatePropertyPanel(component);
        } else {
            this.selectedComponent = null;
            this.updatePropertyPanel(null);
        }

        this.draw();
    }

    handleMouseMove(e) {
        if (!this.dragging || !this.selectedComponent) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - this.dragOffset.x;
        const y = e.clientY - rect.top - this.dragOffset.y;

        this.selectedComponent.x = this.snapToGrid(x);
        this.selectedComponent.y = this.snapToGrid(y);

        this.draw();
    }

    handleMouseUp() {
        this.dragging = false;
    }

    handleDoubleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const component = this.getComponentAt(x, y);
        if (component && component.type === 'switch') {
            component.closed = !component.closed;
            this.draw();
        }
    }

    snapToGrid(value) {
        return Math.round(value / this.gridSize) * this.gridSize;
    }

    getComponentAt(x, y) {
        for (let i = this.components.length - 1; i >= 0; i--) {
            const comp = this.components[i];
            const bounds = this.getComponentBounds(comp);

            if (x >= bounds.x && x <= bounds.x + bounds.width &&
                y >= bounds.y && y <= bounds.y + bounds.height) {
                return comp;
            }
        }
        return null;
    }

    getComponentBounds(comp) {
        const sizes = {
            battery: { width: 60, height: 80 },
            resistor: { width: 80, height: 30 },
            led: { width: 40, height: 40 },
            capacitor: { width: 50, height: 60 },
            switch: { width: 60, height: 30 },
            wire: { width: 80, height: 10 }
        };

        const size = sizes[comp.type] || { width: 40, height: 40 };
        return {
            x: comp.x - size.width / 2,
            y: comp.y - size.height / 2,
            width: size.width,
            height: size.height
        };
    }

    addComponent(type, x, y) {
        const component = {
            id: Date.now(),
            type: type,
            x: x,
            y: y,
            rotation: 0,
            value: this.getDefaultValue(type),
            closed: type === 'switch' ? false : undefined
        };

        this.components.push(component);
        this.selectedComponent = component;
        this.updatePropertyPanel(component);
        this.draw();
    }

    getDefaultValue(type) {
        switch (type) {
            case 'battery': return 9; // Volt
            case 'resistor': return 1000; // Ohm
            case 'led': return 2.0; // Forward voltage
            case 'capacitor': return 100; // µF
            default: return 0;
        }
    }

    updatePropertyPanel(component) {
        const panel = document.getElementById('property-panel');
        if (!panel) return;

        if (!component) {
            panel.innerHTML = '<p class="no-selection">Selecteer een component om eigenschappen te bewerken</p>';
            return;
        }

        let html = `<div class="property-item">
            <strong>Type:</strong> ${this.getTypeName(component.type)}
        </div>`;

        if (component.type === 'battery') {
            html += `
                <div class="property-item">
                    <label>Spanning (V):</label>
                    <input type="number" id="prop-value" value="${component.value}" min="0" max="24" step="0.5">
                </div>`;
        } else if (component.type === 'resistor') {
            html += `
                <div class="property-item">
                    <label>Weerstand (Ω):</label>
                    <input type="number" id="prop-value" value="${component.value}" min="1" max="100000" step="10">
                </div>`;
        } else if (component.type === 'capacitor') {
            html += `
                <div class="property-item">
                    <label>Capaciteit (µF):</label>
                    <input type="number" id="prop-value" value="${component.value}" min="1" max="10000" step="10">
                </div>`;
        } else if (component.type === 'switch') {
            html += `
                <div class="property-item">
                    <label>Status:</label>
                    <span>${component.closed ? 'Gesloten' : 'Open'}</span>
                    <button id="toggle-switch" class="small-btn">Schakel</button>
                </div>`;
        }

        html += `
            <div class="property-item">
                <button id="rotate-btn" class="small-btn">Roteren</button>
                <button id="delete-btn" class="small-btn danger">Verwijderen</button>
            </div>`;

        panel.innerHTML = html;

        // Event listeners voor property panel
        const valueInput = document.getElementById('prop-value');
        if (valueInput) {
            valueInput.addEventListener('change', () => {
                component.value = parseFloat(valueInput.value);
                this.draw();
            });
        }

        const toggleBtn = document.getElementById('toggle-switch');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                component.closed = !component.closed;
                this.updatePropertyPanel(component);
                this.draw();
            });
        }

        const rotateBtn = document.getElementById('rotate-btn');
        if (rotateBtn) {
            rotateBtn.addEventListener('click', () => {
                component.rotation = (component.rotation + 90) % 360;
                this.draw();
            });
        }

        const deleteBtn = document.getElementById('delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                this.components = this.components.filter(c => c.id !== component.id);
                this.selectedComponent = null;
                this.updatePropertyPanel(null);
                this.draw();
            });
        }
    }

    getTypeName(type) {
        const names = {
            battery: 'Batterij',
            resistor: 'Weerstand',
            led: 'LED',
            capacitor: 'Condensator',
            switch: 'Schakelaar',
            wire: 'Draad'
        };
        return names[type] || type;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Teken grid
        this.drawGrid();

        // Teken componenten
        this.components.forEach(comp => {
            this.drawComponent(comp);
        });

        // Teken selectie indicator
        if (this.selectedComponent) {
            const bounds = this.getComponentBounds(this.selectedComponent);
            this.ctx.strokeStyle = '#4ecdc4';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            this.ctx.strokeRect(bounds.x - 5, bounds.y - 5, bounds.width + 10, bounds.height + 10);
            this.ctx.setLineDash([]);
        }

        // Teken elektronen als simulatie loopt
        if (this.isSimulating) {
            this.drawElectrons();
        }
    }

    drawGrid() {
        this.ctx.strokeStyle = '#2d3748';
        this.ctx.lineWidth = 1;

        for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    drawComponent(comp) {
        this.ctx.save();
        this.ctx.translate(comp.x, comp.y);
        this.ctx.rotate(comp.rotation * Math.PI / 180);

        switch (comp.type) {
            case 'battery':
                this.drawBattery(comp);
                break;
            case 'resistor':
                this.drawResistor(comp);
                break;
            case 'led':
                this.drawLED(comp);
                break;
            case 'capacitor':
                this.drawCapacitor(comp);
                break;
            case 'switch':
                this.drawSwitch(comp);
                break;
            case 'wire':
                this.drawWire(comp);
                break;
        }

        this.ctx.restore();
    }

    drawBattery(comp) {
        // Body
        this.ctx.fillStyle = '#ffd93d';
        this.ctx.fillRect(-30, -40, 60, 80);

        // Tip
        this.ctx.fillStyle = '#718096';
        this.ctx.fillRect(-10, -50, 20, 10);

        // + en -
        this.ctx.fillStyle = '#1a202c';
        this.ctx.font = 'bold 16px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('+', 0, -15);
        this.ctx.fillText('-', 0, 25);

        // Waarde
        this.ctx.fillStyle = '#1a202c';
        this.ctx.font = '12px Segoe UI';
        this.ctx.fillText(`${comp.value}V`, 0, 5);

        // Connectoren
        this.ctx.fillStyle = '#4a5568';
        this.ctx.beginPath();
        this.ctx.arc(0, -50, 5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(0, 40, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawResistor(comp) {
        // Zigzag
        this.ctx.strokeStyle = '#a0aec0';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(-40, 0);

        const segments = 5;
        const width = 60;
        const height = 12;

        for (let i = 0; i < segments; i++) {
            const x = -30 + (width / segments) * (i + 0.5);
            const y = (i % 2 === 0) ? -height : height;
            this.ctx.lineTo(x, y);
        }
        this.ctx.lineTo(40, 0);
        this.ctx.stroke();

        // Waarde label
        const displayValue = comp.value >= 1000 ?
            `${(comp.value / 1000).toFixed(1)}kΩ` : `${comp.value}Ω`;

        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = '10px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(displayValue, 0, 25);

        // Connectoren
        this.ctx.fillStyle = '#4a5568';
        this.ctx.beginPath();
        this.ctx.arc(-40, 0, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(40, 0, 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawLED(comp) {
        // LED body
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 15, 0, Math.PI * 2);
        this.ctx.fillStyle = this.isSimulating ? '#ff6b6b' : '#8b2525';
        this.ctx.fill();
        this.ctx.strokeStyle = '#666';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Glow als simulatie loopt
        if (this.isSimulating) {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 25, 0, Math.PI * 2);
            const gradient = this.ctx.createRadialGradient(0, 0, 10, 0, 0, 25);
            gradient.addColorStop(0, 'rgba(255, 107, 107, 0.5)');
            gradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        }

        // Diode symbool
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(-8, -8);
        this.ctx.lineTo(8, 0);
        this.ctx.lineTo(-8, 8);
        this.ctx.closePath();
        this.ctx.stroke();

        // Connectoren
        this.ctx.fillStyle = '#4a5568';
        this.ctx.beginPath();
        this.ctx.arc(0, -20, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(0, 20, 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawCapacitor(comp) {
        // Platen
        this.ctx.fillStyle = '#718096';
        this.ctx.fillRect(-20, -25, 6, 50);
        this.ctx.fillRect(14, -25, 6, 50);

        // + en - symbolen
        this.ctx.fillStyle = '#f0f6fc';
        this.ctx.font = 'bold 12px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('+', -17, -30);
        this.ctx.fillText('-', 17, -30);

        // Waarde
        this.ctx.font = '10px Segoe UI';
        this.ctx.fillText(`${comp.value}µF`, 0, 40);

        // Connectoren
        this.ctx.fillStyle = '#4a5568';
        this.ctx.beginPath();
        this.ctx.arc(-17, -30, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(17, 30, 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawSwitch(comp) {
        // Basis lijn
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(-30, 0);
        this.ctx.lineTo(-10, 0);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(10, 0);
        this.ctx.lineTo(30, 0);
        this.ctx.stroke();

        // Schakelaar arm
        this.ctx.strokeStyle = comp.closed ? '#4ecdc4' : '#a0aec0';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(-10, 0);
        if (comp.closed) {
            this.ctx.lineTo(10, 0);
        } else {
            this.ctx.lineTo(5, -15);
        }
        this.ctx.stroke();

        // Contact punten
        this.ctx.fillStyle = '#4a5568';
        this.ctx.beginPath();
        this.ctx.arc(-10, 0, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(10, 0, 4, 0, Math.PI * 2);
        this.ctx.fill();

        // Status label
        this.ctx.fillStyle = '#a0aec0';
        this.ctx.font = '10px Segoe UI';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(comp.closed ? 'AAN' : 'UIT', 0, 20);
    }

    drawWire(comp) {
        this.ctx.strokeStyle = '#4a5568';
        this.ctx.lineWidth = 4;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(-40, 0);
        this.ctx.lineTo(40, 0);
        this.ctx.stroke();

        // Connectoren
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.beginPath();
        this.ctx.arc(-40, 0, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(40, 0, 4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawElectrons() {
        this.electrons.forEach(e => {
            this.ctx.beginPath();
            this.ctx.arc(e.x, e.y, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = '#4ecdc4';
            this.ctx.fill();

            // Simple movement along x
            e.x += e.vx;
            if (e.x > this.canvas.width) e.x = 0;
            if (e.x < 0) e.x = this.canvas.width;
        });
    }

    clear() {
        this.components = [];
        this.selectedComponent = null;
        this.stopSimulation();
        this.updatePropertyPanel(null);
        this.draw();
    }

    startSimulation() {
        this.isSimulating = true;

        // Creëer elektronen
        this.electrons = [];
        for (let i = 0; i < 20; i++) {
            this.electrons.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: 2 + Math.random() * 2
            });
        }

        this.animateSimulation();
    }

    stopSimulation() {
        this.isSimulating = false;
        this.electrons = [];
        this.draw();
    }

    animateSimulation() {
        if (!this.isSimulating) return;
        this.draw();
        requestAnimationFrame(() => this.animateSimulation());
    }

    loadPreset(presetName) {
        this.clear();

        switch (presetName) {
            case 'simple-led':
                this.components = [
                    { id: 1, type: 'battery', x: 100, y: 250, rotation: 0, value: 9 },
                    { id: 2, type: 'resistor', x: 300, y: 100, rotation: 0, value: 330 },
                    { id: 3, type: 'led', x: 500, y: 250, rotation: 0, value: 2.0 }
                ];
                break;

            case 'series-leds':
                this.components = [
                    { id: 1, type: 'battery', x: 80, y: 250, rotation: 0, value: 9 },
                    { id: 2, type: 'resistor', x: 200, y: 100, rotation: 0, value: 100 },
                    { id: 3, type: 'led', x: 350, y: 100, rotation: 90, value: 2.0 },
                    { id: 4, type: 'led', x: 450, y: 100, rotation: 90, value: 2.0 },
                    { id: 5, type: 'led', x: 550, y: 100, rotation: 90, value: 2.0 }
                ];
                break;

            case 'parallel-leds':
                this.components = [
                    { id: 1, type: 'battery', x: 80, y: 250, rotation: 0, value: 5 },
                    { id: 2, type: 'resistor', x: 300, y: 120, rotation: 0, value: 150 },
                    { id: 3, type: 'led', x: 450, y: 120, rotation: 0, value: 2.0 },
                    { id: 4, type: 'resistor', x: 300, y: 250, rotation: 0, value: 150 },
                    { id: 5, type: 'led', x: 450, y: 250, rotation: 0, value: 2.0 },
                    { id: 6, type: 'resistor', x: 300, y: 380, rotation: 0, value: 150 },
                    { id: 7, type: 'led', x: 450, y: 380, rotation: 0, value: 2.0 }
                ];
                break;

            case 'rc-circuit':
                this.components = [
                    { id: 1, type: 'battery', x: 80, y: 250, rotation: 0, value: 9 },
                    { id: 2, type: 'switch', x: 200, y: 100, rotation: 0, closed: false },
                    { id: 3, type: 'resistor', x: 350, y: 100, rotation: 0, value: 10000 },
                    { id: 4, type: 'capacitor', x: 500, y: 250, rotation: 0, value: 100 }
                ];
                break;
        }

        this.draw();
    }
}

// Initialiseer builder wanneer DOM geladen is
document.addEventListener('DOMContentLoaded', () => {
    // Builder wordt later geïnitialiseerd door app.js
});

// Export
window.CircuitBuilder = CircuitBuilder;
