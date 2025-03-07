(function() {
    let template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
                font-family: Arial, sans-serif;
                display: block;
                width: 100%;
                height: 100%;
                overflow: auto;
            }
            .header {
                position: sticky;
                top: 0;
                background-color: var(--headerBackgroundColor, #0078D4);
                color: white;
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 10;
            }
            .title-row {
                position: sticky;
                top: 40px;
                background-color: #f0f0f0;
                z-index: 9;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                padding: 10px;
                text-align: left;
                border-bottom: 1px solid #e0e0e0;
            }
            tr.selected {
                background-color: #d0e7ff;
            }
            .btn {
                cursor: pointer;
                padding: 5px 10px;
                border-radius: 5px;
                border: none;
                color: white;
                background-color: #005a9e;
                transition: background-color 0.3s;
            }
            .btn:hover {
                background-color: #004b87;
            }
        </style>
        <div class="header">
            <span>planifyitTAB</span>
            <div>
                <button class="btn" id="toggleSelectMode">Select Multiple</button>
                <button class="btn" id="confirmSelection" style="display:none;">Edit</button>
                <button class="btn" id="cancelSelection" style="display:none;">Cancel</button>
            </div>
        </div>
        <table>
            <thead class="title-row">
                <tr id="tableHeader">
                    <!-- Columns will be generated dynamically -->
                </tr>
            </thead>
            <tbody id="tableBody">
                <!-- Rows will be generated dynamically -->
            </tbody>
        </table>
    `;

    class PlanifyitTabWidget extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this.selectionMode = "single";
            this.selectedRows = [];

            this.shadowRoot.getElementById('toggleSelectMode').addEventListener('click', this._toggleSelectMode.bind(this));
            this.shadowRoot.getElementById('confirmSelection').addEventListener('click', this._confirmSelection.bind(this));
            this.shadowRoot.getElementById('cancelSelection').addEventListener('click', this._cancelSelection.bind(this));
        }

        connectedCallback() {
            this._renderTable();
        }

        _renderTable() {
            const columns = ["", "ID", "Name", "Description"];

            const headerRow = this.shadowRoot.getElementById('tableHeader');
            headerRow.innerHTML = columns.map(col => `<th>${col}</th>`).join('');

            const data = [
                { id: 1, name: "Row 1", description: "Description 1" },
                { id: 2, name: "Row 2", description: "Description 2" },
                { id: 3, name: "Row 3", description: "Description 3" }
            ];

            const tableBody = this.shadowRoot.getElementById('tableBody');
            tableBody.innerHTML = data.map(row => `
                <tr data-id="${row.id}">
                    <td class="selector-cell"></td>
                    <td>${row.id}</td>
                    <td>${row.name}</td>
                    <td>${row.description}</td>
                </tr>
            `).join('');

            tableBody.querySelectorAll('tr').forEach(tr => {
                tr.addEventListener('click', (e) => this._rowClicked(e, tr));
            });
        }

        _toggleSelectMode() {
            this.selectionMode = this.selectionMode === "single" ? "multiple" : "single";
            const isMultiple = this.selectionMode === "multiple";
            const btnText = isMultiple ? "Cancel" : "Select Multiple";

            this.shadowRoot.getElementById('toggleSelectMode').style.display = isMultiple ? 'none' : 'inline-block';
            this.shadowRoot.getElementById('confirmSelection').style.display = 'none';
            this.shadowRoot.getElementById('cancelSelection').style.display = isMultiple ? 'inline-block' : 'none';

            this.shadowRoot.querySelectorAll('.selector-cell').forEach(cell => {
                cell.innerHTML = isMultiple ? `<input type="checkbox">` : '';
            });

            this.selectedRows = [];
        }

        _rowClicked(e, row) {
            const rowId = row.getAttribute('data-id');

            if (this.selectionMode === "single") {
                this.shadowRoot.querySelectorAll('tr').forEach(tr => tr.classList.remove('selected'));
                row.classList.add('selected');
                this.selectedRows = [rowId];
                this.shadowRoot.getElementById('confirmSelection').style.display = 'inline-block';
            } else {
                const checkbox = row.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                if (checkbox.checked) {
                    this.selectedRows.push(rowId);
                    row.classList.add('selected');
                } else {
                    this.selectedRows = this.selectedRows.filter(id => id !== rowId);
                    row.classList.remove('selected');
                }
            }
        }

        _confirmSelection() {
            this.dispatchEvent(new CustomEvent("onSelectionConfirmed", { detail: { selectedRows: this.selectedRows } }));
        }

        _cancelSelection() {
            this._toggleSelectMode();
        }
    }

    customElements.define('planifyit-tab-widget', PlanifyitTabWidget);
})();
