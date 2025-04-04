(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
            /* Ensure the container takes the full height available (e.g. widget height) */
            .table-container {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                margin-top: 10px;
                overflow: hidden;
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
                display: flex; 
                border: none;
                border-radius: 4px;
                color: white;
                cursor: pointer;
                transition: background-color 0.3s;
                font-size: 16px;
                width: 36px;
                height: 36px;
             
                align-items: center;
                justify-content: center;
                 background-color: #008509;
            }

            .table-button:hover {
                background-color: rgba(255, 255, 255, 0.3);
            }

            .table-button.active {
                background-color: rgba(255, 255, 255, 0.4);
            }

       

           .cancel-button {
                display: none;
                background-color: #FF5370;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            .column-headers {
                position: sticky;
                 top: 0px;
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

            /* Use flex to allow the table body to take remaining space and scroll */
            .table-body {
                flex: 1;
                overflow-y: auto;
            }

     .no-data-message {
    padding: 20px;
    text-align: center;
    color: #666;
    font-style: italic;
    background-color: #ffffff;
}

       /* Symbol styles */
         
            /* Symbol styles */
            .symbol {
                display: inline-block;
                width: 16px;
                height: 16px;
                text-align: center;
                line-height: 16px;
                margin-right: 5px;
            }
            
                 
            .symbol-check {
                color: #4CAF50;
            }
            
            .symbol-x {
                color: #F44336;
            }
            
            .symbol-arrow-up {
                color: #4CAF50;
            }
            
            .symbol-arrow-down {
                color: #F44336;
            }
            
            .symbol-minus {
                color: #FF9800;
            }
            
            .symbol-plus {
                color: #2196F3;
            }
            
            .symbol-bell {
                color: #FF9800;
            }
            
            .symbol-warning {
                color: #FF9800;
            }
            
            .symbol-info {
                color: #2196F3;
            }
            
            .symbol-flag {
                color: #F44336;
            }

/* Column Search Styling */
.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 6px 2px;
    width: 100%;
    box-sizing: border-box;
}

.header-content:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}

.search-icon {
    opacity: 0.5;
    font-size: 12px;
    margin-left: 5px;
    visibility: hidden;
}

.header-content:hover .search-icon {
    visibility: visible;
}

.search-container {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    padding: 4px 0;
}

.search-container.active {
    background-color: #f0f8ff;
    border-radius: 4px;
    padding: 4px;
}

.header-search {
    width: calc(100% - 20px);
    padding: 4px 20px 4px 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 12px;
    background-color: white;
    box-sizing: border-box;
}

.clear-search {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 12px;
    color: #999;
    z-index: 1;
}

.clear-search:hover {
    color: #333;
}

.highlight {
    background-color: rgba(255, 255, 0, 0.4);
    font-weight: bold;
    padding: 0 2px;
    border-radius: 2px;
}

th {
    position: relative;
    padding: 8px 10px;
}




/* Add visual indicator for columns with active search */
th:has(.search-container.active) {
    background-color: #f0f8ff;
}

/* Alternative for browsers that don't support :has */
th.has-active-search {
    background-color: #f0f8ff;
}

th::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: transparent;
}

th:has(.search-container.active)::after,
th.has-active-search::after {
    background-color: #1a73e8;
}

  /*  style for dynamic buttons */
            .dynamic-button {
                display: flex;
                border: none;
                border-radius: 4px;
                color: white;
                cursor: pointer;
                transition: background-color 0.3s;
                font-size: 16px;
                width: 36px;
                height: 36px;
                align-items: center;
                justify-content: center;
                background-color: #008509;
                margin-right: 4px;
            }
            
            .dynamic-button:hover {
                background-color: rgba(255, 255, 255, 0.3);
            }           
            
        </style>

        <div class="table-container">
   
            <div class="app-title">PlanifyIT Table</div>
            
            <div class="table-header">
                <div class="table-header-title"></div>
                <div class="action-buttons">
                     <!-- Dynamic buttons will be inserted here -->
     <button id="multiSelectButton" class="table-button" title="Select Multiple">☐☑</button>
<button id="cancelButton" class="table-button cancel-button" title="Cancel">✕</button>
                  
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
            this._selectedRowsData = [];
            this._isMultiSelectMode = false;
             this._symbolMappings = [];
            this._activeSearches = {};  // Store active column searches
            this._currentSearchColumn = null;
            this._dynamicButtons = []; 
                this._initialized = false;
            this._lastClickedButtonId = null;
            // Get DOM elements
            this._multiSelectButton = this._shadowRoot.getElementById('multiSelectButton');
            this._cancelButton = this._shadowRoot.getElementById('cancelButton');
            this._selectAllCheckbox = this._shadowRoot.getElementById('selectAllCheckbox');
            this._tableBody = this._shadowRoot.getElementById('tableBody');
            this._headerRow = this._shadowRoot.getElementById('headerRow');
            this._actionButtons = this._shadowRoot.querySelector('.action-buttons');
            
            // Attach event listeners
            this._multiSelectButton.addEventListener('click', this._toggleMultiSelectMode.bind(this));
            this._cancelButton.addEventListener('click', this._cancelMultiSelect.bind(this));
            this._selectAllCheckbox.addEventListener('change', this._handleSelectAll.bind(this));
        }




 // create dynamic buttons
    _renderDynamicButtons() {
    // Get all existing dynamic buttons
    const existingButtons = this._shadowRoot.querySelectorAll('.dynamic-button');
    existingButtons.forEach(button => button.remove());
    
    try {
        // Parse dynamic buttons if it's a string
        const buttons = typeof this._dynamicButtons === 'string' ? 
            JSON.parse(this._dynamicButtons) : this._dynamicButtons;
        
        if (Array.isArray(buttons) && buttons.length > 0) {
            buttons.forEach(buttonConfig => {
                if (buttonConfig.id && buttonConfig.visibility !== 'hidden') {
                    const button = document.createElement('button');
                    button.className = 'dynamic-button';
                    button.title = buttonConfig.tooltip || buttonConfig.id;
                    
                    // Get symbol for the button
                    const symbolMap = {
                        'check': '✓',
                        'bell': '🔔',
                        'warning': '⚠',
                        'info': 'ℹ',
                        'flag': '⚑',
                        'x': '✕',
                        'arrow-up': '↑',
                        'arrow-down': '↓',
                        'minus': '-',
                        'plus': '+'
                    };
                    
                    button.textContent = symbolMap[buttonConfig.symbol] || '●';
                    
                    // Add click handler
             button.addEventListener('click', () => {
    this.lastClickedButtonId = buttonConfig.id;
    this.dispatchEvent(new CustomEvent("onCustomButtonClicked", {
        detail: {
            buttonId: buttonConfig.id
        }
    }));
});
                    
                    // Insert the button before the multiSelectButton
                    this._actionButtons.insertBefore(button, this._multiSelectButton);
                }
            });
        }
    } catch (e) {
        console.error('Error rendering dynamic buttons:', e);
    }
}

updateButtonsState() {
    this._dynamicButtons = [];
    const entries = this._buttonContainer.querySelectorAll(".button-entry");
    
    entries.forEach(entry => {
        const buttonIdInput = entry.querySelector(".button-id-input");
        const tooltipInput = entry.querySelector(".button-tooltip-input");
        const symbolSelect = entry.querySelector(".button-symbol-select");
        const visibilitySelect = entry.querySelector(".button-visibility-select");
        
        if (buttonIdInput.value) {
            this._dynamicButtons.push({
                id: buttonIdInput.value,
                tooltip: tooltipInput.value || '',
                symbol: symbolSelect.value,
                visibility: visibilitySelect.value
            });
        }
    });
    
    this._renderDynamicButtons();
    return this._dynamicButtons;
}

        
 /* ------------------------------------------------------------------
         *  Symbol Mapping
         * ------------------------------------------------------------------ */
         
 _getSymbolForValue(columnIndex, value) {
    const mapping = this._symbolMappings.find(m => 
        m.columnIndex === columnIndex && 
        String(m.value).toLowerCase() === String(value).toLowerCase()
    );
    
    if (!mapping) return null;
    
    const symbolMap = {
        'check': '✓',
        'bell': '🔔',
        'warning': '⚠',
        'info': 'ℹ',
        'flag': '⚑',
        'x': '✕',
        'arrow-up': '↑',
        'arrow-down': '↓',
        'minus': '-',
        'plus': '+'
    };
    
    const symbol = symbolMap[mapping.symbol] || '●';
    return {
        symbol: symbol,
        type: mapping.symbol
    };
}

_createSymbolElement(symbolInfo) {
    const span = document.createElement('span');
    span.className = `symbol symbol-${symbolInfo.type}`;
    span.textContent = symbolInfo.symbol;
    return span;
}
        


        
        /* ------------------------------------------------------------------
         *  Multi-Select Mode / Buttons
         * ------------------------------------------------------------------ */
        
        _toggleMultiSelectMode() {
            this._isMultiSelectMode = true;
            this._multiSelectButton.style.display = 'none';
             this._cancelButton.style.display = 'flex';
            const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
            checkboxColumns.forEach(col => col.classList.add('show'));
            this._selectedRows = [];
            this._updateRowSelection();
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
            this._isMultiSelectMode = false;
            this._multiSelectButton.style.display = 'flex'
            this._cancelButton.style.display = 'none';
      
            const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
            checkboxColumns.forEach(col => col.classList.remove('show'));
            this._selectedRows = [];
            this._updateRowSelection();
            this._selectAllCheckbox.checked = false;
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        isMultiSelectMode: false,
                        selectedRows: JSON.stringify(this._selectedRows)
                    }
                }
            }));
        }
        

        
        /* ------------------------------------------------------------------
         *  Select All / Row Selection
         * ------------------------------------------------------------------ */
       // Update in _handleSelectAll
_handleSelectAll(e) {
    const isChecked = e.target.checked;
    if (isChecked) {
        this._selectedRows = Array.from(
            { length: this._tableData.length },
            (_, index) => index
        );
    } else {
        this._selectedRows = [];
    }
    this._updateRowSelection();
    this._selectedRowsData = this._selectedRows.map(index => this._tableData[index]);
    this.dispatchEvent(new Event("onSelectionChanged"));
    this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: {
            properties: {
                selectedRows: JSON.stringify(this._selectedRows),
          selectedRowsArray: this._selectedRows,     
         selectedRowsData: JSON.stringify(this._selectedRowsData)
       
            }
        }
    }));
}

        
// Update in _handleRowClick
_handleRowClick(index, e) {
    if (e.target.type === 'checkbox') return;
    if (!this._isMultiSelectMode) {
        this._selectedRows = [index];
        this._updateRowSelection();

        this._selectedRowsData = this._selectedRows.map(index => this._tableData[index]);
       
        this.dispatchEvent(new Event("onSelectionChanged"));
        this.dispatchEvent(new CustomEvent("propertiesChanged", {
            detail: {
                properties: {
                
                    selectedRows: JSON.stringify(this._selectedRows),
                       selectedRowsArray: this._selectedRows,  
                    selectedRowsData: JSON.stringify(this._selectedRowsData)

                
                }
            }
        }));
    }
}

// Update in _handleCheckboxChange
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

    this._selectedRowsData = this._selectedRows.map(index => this._tableData[index]);
    this.dispatchEvent(new Event("onSelectionChanged"));
    this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: {
            properties: {
                selectedRows: JSON.stringify(this._selectedRows),
                   selectedRowsArray: this._selectedRows,  
    selectedRowsData: JSON.stringify(this._selectedRowsData)
       
            }
        }
    }));
}
        
        /* ------------------------------------------------------------------
         *  Visual Updates for Selection
         * ------------------------------------------------------------------ */


_updateRowSelection() {
    const rows = this._shadowRoot.querySelectorAll('#tableBody tr');
    rows.forEach((row, filteredIndex) => {
        // Get the corresponding original index from the mapping;
        // if no mapping exists, default to the filteredIndex itself.
        const originalIndex = (this._lastFilteredIndices && this._lastFilteredIndices[filteredIndex] !== undefined)
            ? this._lastFilteredIndices[filteredIndex]
            : filteredIndex;
        const isSelected = this._selectedRows.includes(originalIndex);
        if (isSelected) {
            row.classList.add('selected');
        } else {
            row.classList.remove('selected');
        }
        if (this._isMultiSelectMode) {
            const checkbox = row.querySelector('.select-checkbox');
            if (checkbox) {
                checkbox.checked = isSelected;
            }
        }
    });
    this._updateSelectAllCheckbox();
    this._selectedRowsData = this._selectedRows.map(index => this._tableData[index]);
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
            this._selectAllCheckbox.indeterminate = (!allSelected && someSelected);
         

        }
        


        
        /* ------------------------------------------------------------------
         *  Main Table Rendering
         * ------------------------------------------------------------------ */
// Replace your existing _renderTable method with this one

_renderTable() {
    // Clear header row first
    this._headerRow.innerHTML = `
        <th class="checkbox-column ${this._isMultiSelectMode ? 'show' : ''}">
            <input type="checkbox" id="selectAllCheckbox" class="select-checkbox">
        </th>`;
    this._tableBody.innerHTML = '';
    
    // Re-attach the select all checkbox event listener
    this._selectAllCheckbox = this._shadowRoot.querySelector('#selectAllCheckbox');
    this._selectAllCheckbox.addEventListener('change', this._handleSelectAll.bind(this));
    
    // Render column headers with search capability
    this._tableColumns.forEach((col, colIndex) => {
        const th = document.createElement('th');
        
        if (this._activeSearches[colIndex] !== undefined) {
            // Show search input if there's an active search
            const searchContainer = document.createElement('div');
            searchContainer.className = 'search-container active';
            
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.className = 'header-search';
            searchInput.value = this._activeSearches[colIndex];
            searchInput.placeholder = `Search ${col.label || col.name}...`;
            
            // Use arrow function to maintain correct context
            searchInput.addEventListener('input', (e) => {
                console.log('Search input changed:', e.target.value);
                this._handleColumnSearch(colIndex, e.target.value);
            });
            
            const clearButton = document.createElement('span');
            clearButton.className = 'clear-search';
            clearButton.innerHTML = '✕';
            clearButton.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Clear search clicked for column:', colIndex);
                this._clearColumnSearch(colIndex);
            });
            
            searchContainer.appendChild(searchInput);
            searchContainer.appendChild(clearButton);
            th.appendChild(searchContainer);
            
            // Focus the input after rendering
         if (this._currentSearchColumn === colIndex) {
    setTimeout(() => searchInput.focus(), 0);
}

        } else {
            // Show regular header with click handler for search
            const headerContainer = document.createElement('div');
            headerContainer.className = 'header-content';
            headerContainer.textContent = col.label || col.name;
            
            const searchIcon = document.createElement('span');
            searchIcon.className = 'search-icon';
            searchIcon.innerHTML = '🔍';
            headerContainer.appendChild(searchIcon);
            
            th.appendChild(headerContainer);
            
            // Add click handler as inline function
            th.addEventListener('click', () => {
                console.log('Header clicked for column:', colIndex);
                this._activateColumnSearch(colIndex, col);
            });
        }
        
        this._headerRow.appendChild(th);
    });
    
    // Compute filteredData and a mapping of filteredIndices
    let filteredData = [];
    let filteredIndices = [];
    // Iterate over all tableData rows to build filtered arrays
    this._tableData.forEach((rowData, originalIndex) => {
        // Check if the row matches all active searches
        const matches = Object.entries(this._activeSearches).every(([colIndex, searchTerm]) => {
            if (!searchTerm) return true;
            
            const columnName = this._tableColumns[colIndex].name;
            const cellValue = String(rowData[columnName] || '').toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            
            // Simple wildcard matching
            if (searchLower.includes('*') || searchLower.includes('?')) {
                // Convert wildcard pattern to regex
                const escapedSearchTerm = searchLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexPattern = escapedSearchTerm
                    .replace(/\\\*/g, '.*')
                    .replace(/\\\?/g, '.');
                
                const regex = new RegExp(`^${regexPattern}$`, 'i');
                return regex.test(cellValue);
            } else {
                // Simple substring match if no wildcards
                return cellValue.includes(searchLower);
            }
        });
        
        if (matches) {
            filteredData.push(rowData);
            filteredIndices.push(originalIndex);
        }
    });
    this._lastFilteredIndices = filteredIndices;
    
    // Show "No data" message if no data or all filtered out
    if (filteredData.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = this._tableColumns.length + 1;
        cell.className = 'no-data-message';
        cell.textContent = this._tableData.length > 0 ? 'No matching data found' : 'No data available';
        row.appendChild(cell);
        this._tableBody.appendChild(row);
        return;
    }
    
    // Render each row of filtered data using the mapping for original index
    filteredData.forEach((rowData, filteredIndex) => {
        const originalIndex = filteredIndices[filteredIndex];
        const row = document.createElement('tr');
        
        // Add checkbox cell for selection
        const checkboxCell = document.createElement('td');
        checkboxCell.className = `checkbox-column ${this._isMultiSelectMode ? 'show' : ''}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'select-checkbox';
        checkbox.checked = this._selectedRows.includes(originalIndex);
        checkbox.addEventListener('change', (e) => this._handleCheckboxChange(originalIndex, e));
        checkboxCell.appendChild(checkbox);
        row.appendChild(checkboxCell);
        
        // Add data cells
        this._tableColumns.forEach((col, colIndex) => {
            const cell = document.createElement('td');
            const value = rowData[col.name] || '';
            
            // Check if this cell has a symbol mapping
            const symbolInfo = this._getSymbolForValue(colIndex + 1, value);
            if (symbolInfo) {
                cell.textContent = '';
                const symbolElement = this._createSymbolElement(symbolInfo);
                cell.appendChild(symbolElement);
            } else {
                // Highlight search term if there's an active search for this column
                if (this._activeSearches[colIndex]) {
                    const searchTerm = this._activeSearches[colIndex];
                    if (searchTerm) {
                        cell.textContent = value; // Default to plain text
                        
                        // Only apply highlighting for simple matches
                        // (Wildcard highlighting is more complex)
                        if (!searchTerm.includes('*') && !searchTerm.includes('?')) {
                            try {
                                const searchRegex = new RegExp(searchTerm, 'gi');
                                cell.innerHTML = String(value).replace(
                                    searchRegex, 
                                    match => `<span class="highlight">${match}</span>`
                                );
                            } catch (e) {
                                // In case of invalid regex, fall back to plain text
                                cell.textContent = value;
                            }
                        }
                    } else {
                        cell.textContent = value;
                    }
                } else {
                    cell.textContent = value;
                }
            }
            
            row.appendChild(cell);
        });
        
        // Add row click handler using the mapped original index
        row.addEventListener('click', (e) => this._handleRowClick(originalIndex, e));
        if (this._selectedRows.includes(originalIndex)) {
            row.classList.add('selected');
        }
        this._tableBody.appendChild(row);
    });
    
    this._updateSelectAllCheckbox();
}

// Add these methods for search functionality
_activateColumnSearch(colIndex, column) {
 console.log('Activating search for column:', column.name);
this._activeSearches[colIndex] = '';
this._currentSearchColumn = colIndex;
this._renderTable();

}

_handleColumnSearch(colIndex, value) {
    console.log('Search value changed for column', colIndex, ':', value);
    this._activeSearches[colIndex] = value;
    this._renderTable();
}

_clearColumnSearch(colIndex) {
 console.log('Clearing search for column:', colIndex);
delete this._activeSearches[colIndex];
if (this._currentSearchColumn === colIndex) {
    this._currentSearchColumn = null;
}
this._renderTable();

}
        
        /* ------------------------------------------------------------------
         *  SAC Lifecycle Hooks
         * ------------------------------------------------------------------ */
        
connectedCallback() {
    // Only run initialization once
    if (!this._initialized) {
        // Initialize empty search state only once
        this._activeSearches = {};

        // Initialize multi-select mode flag from attributes (if provided)
        if (this.hasAttribute("isMultiSelectMode")) {
            this._isMultiSelectMode = this.getAttribute("isMultiSelectMode") === "true";
        } else {
            this._isMultiSelectMode = false;
        }

        // Set button states based on initial value
        this._multiSelectButton.style.display = this._isMultiSelectMode ? 'none' : 'flex';
        this._cancelButton.style.display = this._isMultiSelectMode ? 'flex' : 'none';

        // Read initial tableData, tableColumns, and selectedRows from attributes
        if (this.hasAttribute("tableData")) {
            try {
                this._tableData = JSON.parse(this.getAttribute("tableData"));
            } catch (e) {
                console.error("Invalid tableData attribute", e);
            }
        }
        if (this.hasAttribute("tableColumns")) {
            try {
                this._tableColumns = JSON.parse(this.getAttribute("tableColumns"));
            } catch (e) {
                console.error("Invalid tableColumns attribute", e);
            }
        }
        if (this.hasAttribute("selectedRows")) {
            try {
                this._selectedRows = JSON.parse(this.getAttribute("selectedRows"));
            } catch (e) {
                console.error("Invalid selectedRows attribute", e);
            }
        }

  // Add reading of dynamic buttons
                if (this.hasAttribute("dynamicButtons")) {
                    try {
                        this._dynamicButtons = JSON.parse(this.getAttribute("dynamicButtons"));
                    } catch (e) {
                        console.error("Invalid dynamicButtons attribute", e);
                    }
                }


        
        // If data binding exists, update data binding
        if (this.tableDataBinding) {
            this._updateDataBinding(this.tableDataBinding);
        }
        
        // Mark initialization complete
        this._initialized = true;
    }
    
    // Always re-render the table (or selectively update UI) without reinitializing state
    this._renderDynamicButtons();
    this._renderTable();
}


        
        
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        /**
         * Handle the Data Binding from SAC.
         * Transforms dynamic dimensions/measures from metadata into columns & rows.
         */
        _updateDataBinding(dataBinding) {
            if (
                dataBinding &&
                dataBinding.state === 'success' &&
                Array.isArray(dataBinding.data)
            ) {
                console.log('Data binding successful:', dataBinding);
                const columns = [];
                const dims = dataBinding.metadata && dataBinding.metadata.dimensions;
                if (dims && typeof dims === "object" && !Array.isArray(dims)) {
                    Object.keys(dims).forEach(dimKey => {
                        const dimMeta = dims[dimKey];
                        columns.push({
                            name: dimKey,
                            label: dimMeta.description || dimMeta.label || dimMeta.id
                        });
                    });
                } else if (Array.isArray(dims)) {
                    dims.forEach((dimension, index) => {
                        columns.push({
                            name: `dimensions_${index}`,
                            label: dimension.description || dimension.label || dimension.id
                        });
                    });
                }
                const measures = dataBinding.metadata && dataBinding.metadata.mainStructureMembers;
                if (measures && typeof measures === "object" && !Array.isArray(measures)) {
                    Object.keys(measures).forEach(measKey => {
                        const measMeta = measures[measKey];
                        columns.push({
                            name: measKey,
                            label: measMeta.label || measMeta.id
                        });
                    });
                } else if (Array.isArray(measures)) {
                    measures.forEach((measure, index) => {
                        columns.push({
                            name: `measures_${index}`,
                            label: measure.label || measure.id
                        });
                    });
                }
                const tableData = dataBinding.data.map((row) => {
                    const transformedRow = {};
                    columns.forEach(col => {
                        let cellObj = row[col.name];
                        if (!cellObj) {
                            transformedRow[col.name] = "";
                        } else if (cellObj.label) {
                            transformedRow[col.name] = cellObj.label;
                        } else if (cellObj.formattedValue) {
                            transformedRow[col.name] = cellObj.formattedValue;
                        } else if (cellObj.formatted) {
                            transformedRow[col.name] = cellObj.formatted;
                        } else if (cellObj.raw !== undefined) {
                            transformedRow[col.name] = cellObj.raw;
                        } else {
                            transformedRow[col.name] = "";
                        }
                    });
                    return transformedRow;
                });
                this._tableColumns = columns;
                this._tableData = tableData;
                this._renderTable();
            }
        }

        
onCustomWidgetAfterUpdate(changedProperties) {


           // Add handling for dynamic buttons
  if ('dynamicButtons' in changedProperties) {
    try {
        this._dynamicButtons = typeof changedProperties.dynamicButtons === 'string' ? 
            JSON.parse(changedProperties.dynamicButtons) : changedProperties.dynamicButtons;
        this._renderDynamicButtons();
    } catch (e) {
        console.error('Invalid dynamic buttons:', e);
    }
}
    
    //  headerTitle and appTitle
    if ('headerTitle' in changedProperties) {
        const headerTitleEl = this._shadowRoot.querySelector('.table-header-title');
        if (headerTitleEl) {
            headerTitleEl.textContent = changedProperties.headerTitle || '';
        }
    }
    
    if ('appTitle' in changedProperties) {
        const appTitleEl = this._shadowRoot.querySelector('.app-title');
        if (appTitleEl) {
            appTitleEl.textContent = changedProperties.appTitle || '';
        }
    }
    
    if ('symbolMappings' in changedProperties) {
        try {
            this._symbolMappings = JSON.parse(changedProperties.symbolMappings);
            this._renderTable();
        } catch (e) {
            console.error('Invalid symbol mappings:', e);
        }
    }

            
            if ("tableDataBinding" in changedProperties) {
                const dataBinding = changedProperties.tableDataBinding;
                if (dataBinding && dataBinding.state === 'success') {
                    this._updateDataBinding(dataBinding);
                }
            } else if (!this._tableData.length && this.tableDataBinding) {
                this._updateDataBinding(this.tableDataBinding);
            }
            
            if ('tableData' in changedProperties) {
                try {
                    this._tableData = JSON.parse(changedProperties.tableData);
                    this._renderTable();
                } catch (e) {
                    console.error('Invalid table data:', e);
                }
            }
            
            if ('tableColumns' in changedProperties) {
                try {
                    this._tableColumns = JSON.parse(changedProperties.tableColumns);
                    this._renderTable();
                } catch (e) {
                    console.error('Invalid table columns:', e);
                }
            }
            
            if ('selectedRows' in changedProperties) {
                try {
                    this._selectedRows = JSON.parse(changedProperties.selectedRows);
                    this._updateRowSelection();
    
                } catch (e) {
                    console.error('Invalid selected rows:', e);
                }
            }
            
            if ('isMultiSelectMode' in changedProperties) {
                this._isMultiSelectMode = changedProperties.isMultiSelectMode;
                if (this._isMultiSelectMode) {
                    this._multiSelectButton.style.display = 'none';
                    this._cancelButton.style.display = 'flex';
          
                    const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
                    checkboxColumns.forEach(col => col.classList.add('show'));
                } else {
                    this._multiSelectButton.style.display = 'flex';
                    this._cancelButton.style.display = 'none';
                    const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
                    checkboxColumns.forEach(col => col.classList.remove('show'));
             
                }
            }


        if ('headerTextColor' in changedProperties) {
    const headerT = this._shadowRoot.querySelector('.table-header-title');
    if (headerT) {
           headerT.style.color = changedProperties.headerTextColor;
    }
}
    if ('tableTextColor' in changedProperties) {

    const tableCells = this._shadowRoot.querySelectorAll('table td');
    tableCells.forEach(cell => {
        cell.style.color = changedProperties.tableTextColor;
    });
}

    
    
            if ('headerColor' in changedProperties) {
                const headerEl = this._shadowRoot.querySelector('.table-header');
                if (headerEl) {
                    headerEl.style.backgroundColor = changedProperties.headerColor;
                }
            }
            
            if ('buttonColor' in changedProperties) {
                const buttons = this._shadowRoot.querySelectorAll('.table-button');
                buttons.forEach(btn => {
                    if ( !btn.classList.contains('cancel-button')) {
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

  // Add getter and setter for dynamic buttons
  get dynamicButtons() {
    return typeof this._dynamicButtons === 'string' ? 
        this._dynamicButtons : JSON.stringify(this._dynamicButtons);
}

set dynamicButtons(value) {
    try {
        this._dynamicButtons = typeof value === 'string' ? JSON.parse(value) : value;
        this._renderDynamicButtons();
        this.dispatchEvent(new CustomEvent("propertiesChanged", {
            detail: { properties: { dynamicButtons: typeof value === 'string' ? value : JSON.stringify(value) } }
        }));
    } catch (e) {
        console.error('Invalid dynamic buttons:', e);
    }
}
        
       // Implement getDynamicButtons method
        getDynamicButtons() {
            return this.dynamicButtons || '[]';
        }

        getLastClickedButtonId() {
    return this.lastClickedButtonId || '';
}
// Native function called by SAC
getSelectedRowDataForSelection(key, rowIndex) {
  return this.getSelectedRowDataForSelectionImpl(key, rowIndex);
}

// Updated helper function
getSelectedRowDataForSelectionImpl(key, rowIndex) {
  if (!this._selectedRowsData || this._selectedRowsData.length === 0) {
    return "";
  }

  // Find the position of the rowIndex in the selectedRows array
  const positionInSelectedRows = this._selectedRows.indexOf(rowIndex);
  
  // If the rowIndex is not in selectedRows, return empty string
  if (positionInSelectedRows === -1) {
    return "";
  }
  
  // Use the position in selectedRows to access the correct data in selectedRowsData
  if (this._selectedRowsData[positionInSelectedRows] && 
      this._selectedRowsData[positionInSelectedRows][key] != null) {
    return String(this._selectedRowsData[positionInSelectedRows][key]);
  }
  
  return "";
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
    
get selectedRowsData() {

      return JSON.stringify(this._selectedRowsData);
    console.log(this._selectedRowsData);
}



        
        set selectedRows(value) {
            try {
                this._selectedRows = JSON.parse(value);
                this._updateRowSelection();
             
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
                 this._cancelButton.style.display = 'flex';
              
                const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
                checkboxColumns.forEach(col => col.classList.add('show'));
            } else {
                this._multiSelectButton.style.display = 'flex';
                this._cancelButton.style.display = 'none';
                const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
                checkboxColumns.forEach(col => col.classList.remove('show'));
               
            }
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: { properties: { isMultiSelectMode: value } }
            }));
        }
    }

    customElements.define('planifyit-tab-widget', PlanifyITTable);
})();
