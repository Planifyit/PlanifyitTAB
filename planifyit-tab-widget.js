(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
            .image-container {
                width: 100%;
                height: 50px;
                background-size: cover;
                margin-bottom: 10px;
            }

            .app-title {
                font-size: 18px; 
                font-weight: bold;
                text-align: left;
                margin-bottom: 5px; 
                color: #333; 
                text-transform: uppercase; 
                letter-spacing: 1.5px; 
            }

            .follow-link {
                font-size: 10px;
                transition: color 0.3s;
                text-decoration: none;
                position: relative;
                margin-top: 10px;
                display: block;
            }

            .follow-link:hover {
                color: #007BFF;
            }

            .follow-link::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                right: 0;
                height: 2px;
                background-color: #007BFF;
                transform: scaleX(0);
                transform-origin: right;
                transition: transform 0.3s;
            }

            .follow-link:hover::after {
                transform: scaleX(1);
                transform-origin: left;
            }

            .table-container {
                display: flex;
                flex-direction: column;
                width: 100%;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                margin-top: 10px;
                overflow: hidden;
            }

            .table-header {
                display: flex;
                align-items: center;
                background-color: #1a73e8;
                color: white;
                padding: 10px;
                position: sticky;
                top: 0;
                z-index: 10;
            }

            .table-header-title {
                flex: 1;
                font-weight: bold;
            }

            .action-buttons {
                display: flex;
                gap: 8px;
            }

            .table-button {
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                background-color: rgba(255, 255, 255, 0.2);
                color: white;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .table-button:hover {
                background-color: rgba(255, 255, 255, 0.3);
            }

            .table-button.active {
                background-color: rgba(255, 255, 255, 0.4);
            }

            .table-button.edit-button {
                display: none;
                background-color: #4CAF50;
            }

            .table-button.cancel-button {
                display: none;
                background-color: #FF5370;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            .column-headers {
                position: sticky;
                top: 50px;
                z-index: 5;
                background-color: #f0f0f0;
            }

            th {
                padding: 12px 15px;
                text-align: left;
                font-weight: 600;
                font-size: 14px;
                color: #333;
                border-bottom: 1px solid #ddd;
                background-color: #f8f9fa;
            }

            td {
                padding: 10px 15px;
                text-align: left;
                vertical-align: middle;
                border-bottom: 1px solid #eee;
                font-size: 14px;
                color: #333;
            }

            tr {
                transition: background-color 0.3s;
            }

            tr:hover {
                background-color: #f5f5f5;
            }

            tr.selected {
                background-color: #e8f0fe;
            }

            .select-checkbox {
                width: 18px;
                height: 18px;
                cursor: pointer;
            }

            .checkbox-column {
                width: 40px;
                text-align: center;
                display: none;
            }

            .checkbox-column.show {
                display: table-cell;
            }

            .table-body {
                overflow-y: auto;
                max-height: calc(100% - 50px);
            }

            .no-data-message {
                padding: 20px;
                text-align: center;
                color: #666;
                font-style: italic;
            }
        </style>

        <div class="table-container">
            <div class="image-container"></div>
            <div class="app-title">PlanifyIT Table</div>
            
            <div class="table-header">
                <div class="table-header-title">Data Table</div>
                <div class="action-buttons">
                    <button id="multiSelectButton" class="table-button">Select Multiple</button>
                    <button id="cancelButton" class="table-button cancel-button">Cancel</button>
                    <button id="editButton" class="table-button edit-button">Edit</button>
                </div>
            </div>
            
            <div class="table-body">
                <table id="dataTable">
                    <thead class="column-headers">
                        <tr id="headerRow">
                            <th class="checkbox-column">
                                <input type="checkbox" id="selectAllCheckbox" class="select-checkbox">
                            </th>
                            <!-- Table headers will be inserted here dynamically -->
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        <!-- Table data will be inserted here dynamically -->
                        <tr>
                            <td colspan="100%" class="no-data-message">No data available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <a href="https://www.linkedin.com/company/planifyit" target="_blank" class="follow-link">
                Follow us on LinkedIn - Planifyit
            </a>
        </div>
    `;

    class PlanifyITTable extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

            // Internal tracking
            this._props = {}; 
            this._tableData = [];
            this._tableColumns = [];
            this._selectedRows = [];
            this._isMultiSelectMode = false;
            
            // Get DOM elements
            this._multiSelectButton = this._shadowRoot.getElementById('multiSelectButton');
            this._cancelButton = this._shadowRoot.getElementById('cancelButton');
            this._editButton = this._shadowRoot.getElementById('editButton');
            this._selectAllCheckbox = this._shadowRoot.getElementById('selectAllCheckbox');
            this._tableBody = this._shadowRoot.getElementById('tableBody');
            this._headerRow = this._shadowRoot.getElementById('headerRow');
            
            // Attach event listeners
            this._multiSelectButton.addEventListener('click', this._toggleMultiSelectMode.bind(this));
            this._cancelButton.addEventListener('click', this._cancelMultiSelect.bind(this));
            this._editButton.addEventListener('click', this._handleEdit.bind(this));
            this._selectAllCheckbox.addEventListener('change', this._handleSelectAll.bind(this));
        }
        
        /* ------------------------------------------------------------------
         *  Multi-Select Mode / Buttons
         * ------------------------------------------------------------------ */
        
        _toggleMultiSelectMode() {
            // Switch to multi-select
            this._isMultiSelectMode = true;
            this._multiSelectButton.style.display = 'none';
            this._cancelButton.style.display = 'inline-block';
            this._editButton.style.display = 'none';
            
            // Show checkboxes
            const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
            checkboxColumns.forEach(col => col.classList.add('show'));
            
            // Clear any single-selection
            this._selectedRows = [];
            this._updateRowSelection();
            
            // Dispatch event for property changes
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        isMultiSelectMode: true,
                        selectedRows: JSON.stringify(this._selectedRows)
                    }
                }
            }));
        }
        
        _cancelMultiSelect() {
            // Return to single-select
            this._isMultiSelectMode = false;
            this._multiSelectButton.style.display = 'inline-block';
            this._cancelButton.style.display = 'none';
            this._editButton.style.display = 'none';
            
            // Hide checkboxes
            const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
            checkboxColumns.forEach(col => col.classList.remove('show'));
            
            // Clear selections
            this._selectedRows = [];
            this._updateRowSelection();
            
            // Uncheck "select all" checkbox
            this._selectAllCheckbox.checked = false;
            
            // Dispatch event for property changes
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        isMultiSelectMode: false,
                        selectedRows: JSON.stringify(this._selectedRows)
                    }
                }
            }));
        }
        
        _handleEdit() {
            // If you want to pass the selected row info, do so here
            this.dispatchEvent(new Event("onEditSelected"));
        }
        
        /* ------------------------------------------------------------------
         *  Select All / Row Selection
         * ------------------------------------------------------------------ */
        
        _handleSelectAll(e) {
            const isChecked = e.target.checked;
            
            if (isChecked) {
                // Select all rows
                this._selectedRows = Array.from(
                    { length: this._tableData.length },
                    (_, index) => index
                );
            } else {
                // Deselect all
                this._selectedRows = [];
            }
            
            this._updateRowSelection();
            this._updateEditButtonVisibility();
            
            // Fire selection-changed event
            this.dispatchEvent(new Event("onSelectionChanged"));
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        selectedRows: JSON.stringify(this._selectedRows)
                    }
                }
            }));
        }
        
        // Single-select row click
        _handleRowClick(index, e) {
            // If clicked directly on a checkbox, don't override
            if (e.target.type === 'checkbox') return;
            
            if (!this._isMultiSelectMode) {
                // Single select
                this._selectedRows = [index];
                this._updateRowSelection();
                this._updateEditButtonVisibility();
                
                this.dispatchEvent(new Event("onSelectionChanged"));
                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            selectedRows: JSON.stringify(this._selectedRows)
                        }
                    }
                }));
            }
        }
        
        // Multi-select checkbox toggled
        _handleCheckboxChange(index, e) {
            const isChecked = e.target.checked;
            if (isChecked) {
                if (!this._selectedRows.includes(index)) {
                    this._selectedRows.push(index);
                }
            } else {
                this._selectedRows = this._selectedRows.filter(i => i !== index);
            }
            this._updateSelectAllCheckbox();
            this._updateEditButtonVisibility();
            
            this.dispatchEvent(new Event("onSelectionChanged"));
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        selectedRows: JSON.stringify(this._selectedRows)
                    }
                }
            }));
        }
        
        /* ------------------------------------------------------------------
         *  Visual Updates for Selection
         * ------------------------------------------------------------------ */
        
        _updateRowSelection() {
            const rows = this._shadowRoot.querySelectorAll('#tableBody tr');
            rows.forEach((row, index) => {
                const isSelected = this._selectedRows.includes(index);
                
                if (isSelected) {
                    row.classList.add('selected');
                } else {
                    row.classList.remove('selected');
                }
                
                // If in multi-select, update checkbox
                if (this._isMultiSelectMode) {
                    const checkbox = row.querySelector('.select-checkbox');
                    if (checkbox) {
                        checkbox.checked = isSelected;
                    }
                }
            });
            this._updateSelectAllCheckbox();
        }

        _updateSelectAllCheckbox() {
            if (this._tableData.length === 0) {
                this._selectAllCheckbox.checked = false;
                this._selectAllCheckbox.indeterminate = false;
                return;
            }
            const allSelected = this._selectedRows.length === this._tableData.length;
            const someSelected = 
                this._selectedRows.length > 0 &&
                this._selectedRows.length < this._tableData.length;
            
            this._selectAllCheckbox.checked = allSelected;
            // Show a partial check if only some rows selected
            this._selectAllCheckbox.indeterminate = (!allSelected && someSelected);
        }
        
        _updateEditButtonVisibility() {
            // Only in single-select mode & exactly one row selected
            if (this._isMultiSelectMode) {
                this._editButton.style.display = 'none';
            } else {
                this._editButton.style.display =
                    this._selectedRows.length === 1
                        ? 'inline-block'
                        : 'none';
            }
        }
        
        /* ------------------------------------------------------------------
         *  Main Table Rendering
         * ------------------------------------------------------------------ */
        
        _renderTable() {
            // Clear existing header row & table body
            this._headerRow.innerHTML = `
                <th class="checkbox-column ${this._isMultiSelectMode ? 'show' : ''}">
                    <input type="checkbox" id="selectAllCheckbox" class="select-checkbox">
                </th>`;
            this._tableBody.innerHTML = '';
            
            // Re-hook the "select all" checkbox after clearing
            this._selectAllCheckbox = this._shadowRoot.querySelector('#selectAllCheckbox');
            this._selectAllCheckbox.addEventListener('change', this._handleSelectAll.bind(this));
            
            // Create column headers
            this._tableColumns.forEach(col => {
                const th = document.createElement('th');
                // Use col.label or a fallback
                th.textContent = col.label || col.name;
                this._headerRow.appendChild(th);
            });
            
            // Render table data
            if (this._tableData.length === 0) {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.colSpan = this._tableColumns.length + 1; // +1 for checkbox column
                cell.className = 'no-data-message';
                cell.textContent = 'No data available';
                row.appendChild(cell);
                this._tableBody.appendChild(row);
                return;
            }
            
            this._tableData.forEach((rowData, rowIndex) => {
                const row = document.createElement('tr');
                
                // Checkbox column
                const checkboxCell = document.createElement('td');
                checkboxCell.className = `checkbox-column ${this._isMultiSelectMode ? 'show' : ''}`;
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'select-checkbox';
                checkbox.checked = this._selectedRows.includes(rowIndex);
                checkbox.addEventListener('change', (e) => this._handleCheckboxChange(rowIndex, e));
                checkboxCell.appendChild(checkbox);
                row.appendChild(checkboxCell);
                
                // Fill data cells
                this._tableColumns.forEach(col => {
                    const cell = document.createElement('td');
                    cell.textContent = rowData[col.name] || '';
                    row.appendChild(cell);
                });
                
                // Single-click selection in single-select mode
                row.addEventListener('click', (e) => this._handleRowClick(rowIndex, e));
                
                // Mark if selected
                if (this._selectedRows.includes(rowIndex)) {
                    row.classList.add('selected');
                }
                
                this._tableBody.appendChild(row);
            });
            
            // Final updates
            this._updateSelectAllCheckbox();
            this._updateEditButtonVisibility();
        }
        
        /* ------------------------------------------------------------------
         *  SAC Lifecycle Hooks
         * ------------------------------------------------------------------ */
        
        connectedCallback() {
            // On load, if no data is set, just render empty
            if (!this._tableData.length && !this._tableColumns.length) {
                this._renderTable();
            }
        }
        
        onCustomWidgetBeforeUpdate(changedProperties) {
            // Merge new properties
            this._props = { ...this._props, ...changedProperties };
        }

        /**
         * Handle the Data Binding from SAC
         * This method picks up dynamic dimensions/measures from the metadata
         * and transforms them into columns & rows for the table.
         */
        _updateDataBinding(dataBinding) {
            if (
                dataBinding &&
                dataBinding.state === 'success' &&
                Array.isArray(dataBinding.data)
            ) {
                console.log('Data binding successful:', dataBinding);
                
                const columns = [];

                // Dimensions in metadata
                if (
                    dataBinding.metadata &&
                    Array.isArray(dataBinding.metadata.dimensions)
                ) {
                    dataBinding.metadata.dimensions.forEach((dimension, index) => {
                        columns.push({
                            name: `dimensions_${index}`,
                            label: dimension.label || dimension.id
                        });
                    });
                }

                // Measures in metadata
                if (
                    dataBinding.metadata &&
                    Array.isArray(dataBinding.metadata.mainStructureMembers)
                ) {
                    dataBinding.metadata.mainStructureMembers.forEach((measure, index) => {
                        columns.push({
                            name: `measures_${index}`,
                            label: measure.label || measure.id
                        });
                    });
                }

                // Transform the raw rows into a simpler structure:
                // row["dimensions_0"].label => put in rowObj["dimensions_0"]
                // row["measures_0"].formattedValue => put in rowObj["measures_0"], etc.
                const tableData = dataBinding.data.map((row) => {
                    const transformed = {};
                    
                    // Map dimension fields
                    if (dataBinding.metadata.dimensions) {
                        dataBinding.metadata.dimensions.forEach((dim, i) => {
                            const dimId = `dimensions_${i}`;
                            if (row[dimId]) {
                                transformed[dimId] =
                                    row[dimId].label ||
                                    row[dimId].id ||
                                    "";
                            }
                        });
                    }

                    // Map measure fields
                    if (dataBinding.metadata.mainStructureMembers) {
                        dataBinding.metadata.mainStructureMembers.forEach((m, i) => {
                            const measId = `measures_${i}`;
                            if (row[measId]) {
                                // Use formattedValue or raw, whichever you prefer
                                transformed[measId] =
                                    row[measId].formattedValue ||
                                    row[measId].raw ||
                                    "";
                            }
                        });
                    }

                    return transformed;
                });
                
                // Assign to our widget's internal data
                this._tableColumns = columns;
                this._tableData = tableData;
                
                // Render
                this._renderTable();
            }
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            // 1) If the dataBinding changed, parse it
            if ("tableDataBinding" in changedProperties) {
                const dataBinding = changedProperties.tableDataBinding;
                if (dataBinding && dataBinding.state === 'success') {
                    this._updateDataBinding(dataBinding);
                }
            }

            // 2) If tableData property changed (overwritten manually), parse & re-render
            if ('tableData' in changedProperties) {
                try {
                    this._tableData = JSON.parse(changedProperties.tableData);
                    this._renderTable();
                } catch (e) {
                    console.error('Invalid table data:', e);
                }
            }
            
            // 3) If tableColumns property changed, parse & re-render
            if ('tableColumns' in changedProperties) {
                try {
                    this._tableColumns = JSON.parse(changedProperties.tableColumns);
                    this._renderTable();
                } catch (e) {
                    console.error('Invalid table columns:', e);
                }
            }
            
            // 4) If selectedRows property changed, parse & update selection
            if ('selectedRows' in changedProperties) {
                try {
                    this._selectedRows = JSON.parse(changedProperties.selectedRows);
                    this._updateRowSelection();
                    this._updateEditButtonVisibility();
                } catch (e) {
                    console.error('Invalid selected rows:', e);
                }
            }
            
            // 5) If isMultiSelectMode changed, update UI
            if ('isMultiSelectMode' in changedProperties) {
                this._isMultiSelectMode = changedProperties.isMultiSelectMode;
                
                if (this._isMultiSelectMode) {
                    this._multiSelectButton.style.display = 'none';
                    this._cancelButton.style.display = 'inline-block';
                    this._editButton.style.display = 'none';
                    
                    // Show checkboxes
                    const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
                    checkboxColumns.forEach(col => col.classList.add('show'));
                } else {
                    this._multiSelectButton.style.display = 'inline-block';
                    this._cancelButton.style.display = 'none';
                    
                    // Hide checkboxes
                    const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
                    checkboxColumns.forEach(col => col.classList.remove('show'));
                    
                    this._updateEditButtonVisibility();
                }
            }
            
            // 6) Apply styling properties if provided
            if ('headerColor' in changedProperties) {
                const headerEl = this._shadowRoot.querySelector('.table-header');
                if (headerEl) {
                    headerEl.style.backgroundColor = changedProperties.headerColor;
                }
            }
            
            if ('buttonColor' in changedProperties) {
                const buttons = this._shadowRoot.querySelectorAll('.table-button');
                buttons.forEach(btn => {
                    // Avoid overriding "Edit" or "Cancel" colors, unless you prefer
                    if (!btn.classList.contains('edit-button') && !btn.classList.contains('cancel-button')) {
                        btn.style.color = changedProperties.buttonColor;
                    }
                });
            }
            
            if ('selectedRowColor' in changedProperties) {
                const style = document.createElement('style');
                style.textContent = `
                    tr.selected {
                        background-color: ${changedProperties.selectedRowColor} !important;
                    }
                `;
                this._shadowRoot.appendChild(style);
            }
            
            if ('hoverRowColor' in changedProperties) {
                const style = document.createElement('style');
                style.textContent = `
                    tr:hover {
                        background-color: ${changedProperties.hoverRowColor};
                    }
                `;
                this._shadowRoot.appendChild(style);
            }
        }
        
        /* ------------------------------------------------------------------
         *  Getters / Setters (Matching planifyitTAB.json definition)
         * ------------------------------------------------------------------ */
        
        get tableData() {
            return JSON.stringify(this._tableData);
        }
        
        set tableData(value) {
            try {
                this._tableData = JSON.parse(value);
                this._renderTable();
                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                    detail: { properties: { tableData: value } }
                }));
            } catch (e) {
                console.error('Invalid table data:', e);
            }
        }
        
        get tableColumns() {
            return JSON.stringify(this._tableColumns);
        }
        
        set tableColumns(value) {
            try {
                this._tableColumns = JSON.parse(value);
                this._renderTable();
                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                    detail: { properties: { tableColumns: value } }
                }));
            } catch (e) {
                console.error('Invalid table columns:', e);
            }
        }
        
        get selectedRows() {
            return JSON.stringify(this._selectedRows);
        }
        
        set selectedRows(value) {
            try {
                this._selectedRows = JSON.parse(value);
                this._updateRowSelection();
                this._updateEditButtonVisibility();
                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                    detail: { properties: { selectedRows: value } }
                }));
            } catch (e) {
                console.error('Invalid selected rows:', e);
            }
        }
        
        get isMultiSelectMode() {
            return this._isMultiSelectMode;
        }
        
        set isMultiSelectMode(value) {
            this._isMultiSelectMode = value;
            if (this._isMultiSelectMode) {
                this._multiSelectButton.style.display = 'none';
                this._cancelButton.style.display = 'inline-block';
                this._editButton.style.display = 'none';
                
                // Show checkboxes
                const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
                checkboxColumns.forEach(col => col.classList.add('show'));
            } else {
                this._multiSelectButton.style.display = 'inline-block';
                this._cancelButton.style.display = 'none';
                
                // Hide checkboxes
                const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
                checkboxColumns.forEach(col => col.classList.remove('show'));
                
                this._updateEditButtonVisibility();
            }
            
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: { properties: { isMultiSelectMode: value } }
            }));
        }
    }

    // Register the custom element in the browser
    customElements.define('planifyit-tab-widget', PlanifyITTable);
})();
