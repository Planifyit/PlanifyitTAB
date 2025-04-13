(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
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
                font-size: 14px;
                width: 36px;
                height: 36px;
                background-color: transparent;
                align-items: center;
                justify-content: center;

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


            .table-body {
                flex: 1;
                overflow-y: auto;
            }

       /* Column width styles */
     .no-data-message {
    padding: 20px;
    text-align: center;
    color: #666;
    font-style: italic;
    background-color: #ffffff;
}


.column-width-entry {
    display: flex;
    margin-bottom: 8px;
    align-items: center;
}

.column-width-entry .column-input {
    width: 80px;
    margin-right: 8px;
}

.column-width-entry .width-select {
    flex: 1;
    margin-right: 8px;
}

table {
    table-layout: fixed;
    width: 100%;
}


th, td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
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

th:has(.search-container.active) {
    background-color: #f0f8ff;
}


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
                     <!-- Dynamic buttons -->
<button id="multiSelectButton" class="table-button" title="Select Multiple">⬜✅</button>
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
    
                            <!-- Table headers dynamically -->
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                    <!-- Table data dynamically -->
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
            this._columnWidths = [];
            this._activeSearches = {};  
            this._currentSearchColumn = null;
            this._dynamicButtons = []; 
            this._initialized = false;
            this._lastClickedButtonId = null;
            this._symbolMap = this._buildSymbolMap(); 
            // Get DOM elements
            this._multiSelectButton = this._shadowRoot.getElementById('multiSelectButton');
            this._cancelButton = this._shadowRoot.getElementById('cancelButton');
            this._selectAllCheckbox = this._shadowRoot.getElementById('selectAllCheckbox');
            this._tableBody = this._shadowRoot.getElementById('tableBody');
            this._headerRow = this._shadowRoot.getElementById('headerRow');
            this._actionButtons = this._shadowRoot.querySelector('.action-buttons');
            
            // event listeners
            this._multiSelectButton.addEventListener('click', this._toggleMultiSelectMode.bind(this));
            this._cancelButton.addEventListener('click', this._cancelMultiSelect.bind(this));
            this._selectAllCheckbox.addEventListener('change', this._handleSelectAll.bind(this));
        }





_getSymbols() {
    return [
        { value: 'check', label: '✓ Check' },
        { value: 'x', label: '✕ X' },
        { value: 'arrow-up', label: '↑ Arrow Up' },
        { value: 'arrow-down', label: '↓ Arrow Down' },
        { value: 'minus', label: '- Minus' },
        { value: 'plus', label: '+ Plus' },
        { value: 'bell', label: '🔔 Bell' },
        { value: 'warning', label: '⚠ Warning' },
        { value: 'info', label: 'ℹ Info' },
        { value: 'flag', label: '⚑ Flag' },
         { value: 'lock', label: '🔒 Lock' },
         { value: 'calendar', label: '📅 Calendar' },
        { value: 'search', label: '🔍 Search' },
       { value: 'edit-pencil', label: '✏️ Edit' },
        { value: 'change', label: '🔄 Change' }
        
    ];
}

_buildSymbolMap() {
    const symbolMap = {};
    this._getSymbols().forEach(symbol => {
        
        const symbolChar = symbol.label.split(' ')[0];
        symbolMap[symbol.value] = symbolChar;
    });
    return symbolMap;
}



  _renderDynamicButtons() {

    const existingButtons = this._shadowRoot.querySelectorAll('.dynamic-button');
    existingButtons.forEach(button => button.remove());
    
    try {

        const buttons = typeof this._dynamicButtons === 'string' ? 
            JSON.parse(this._dynamicButtons) : this._dynamicButtons;
        
        if (Array.isArray(buttons) && buttons.length > 0) {
            buttons.forEach(buttonConfig => {
                if (buttonConfig.id && buttonConfig.visibility !== 'hidden') {
                    const button = document.createElement('button');
                    button.className = 'dynamic-button';
                    button.title = buttonConfig.tooltip || buttonConfig.id;
                    
                  
                    button.textContent = this._symbolMap[buttonConfig.symbol] || '●';

                  
                    if (buttonConfig.backgroundColor && buttonConfig.backgroundColor.trim() !== '') {
                        button.style.backgroundColor = buttonConfig.backgroundColor;
                    }
  

                    button.addEventListener('click', () => {
    this._lastClickedButtonId = buttonConfig.id;
    

    this.lastClickedButtonId = buttonConfig.id;
    
   
    this.dispatchEvent(new CustomEvent("onCustomButtonClicked", {
        detail: {
            buttonId: buttonConfig.id,
            buttonConfig: buttonConfig
        }
    }));
    

    this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: {
            properties: {
                lastClickedButtonId: buttonConfig.id
            }
        }
    }));
});
                    
              
                    
           
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

        
 //Symbol Mapping
        

_getSymbolForValue(columnIndex, value) {
    const mapping = this._symbolMappings.find(m => 
        m.columnIndex === columnIndex && 
        String(m.value).toLowerCase() === String(value).toLowerCase()
    );
    
    if (!mapping) return null;
    
    const symbol = this._symbolMap[mapping.symbol] || '●';
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
        


        

        // Multi-Select Mode / Buttons

        
        _toggleMultiSelectMode() {
            this._isMultiSelectMode = true;
            this._multiSelectButton.style.display = 'none';
             this._cancelButton.style.display = 'flex';
            const checkboxColumns = this._shadowRoot.querySelectorAll('.checkbox-column');
            checkboxColumns.forEach(col => col.classList.add('show'));
            this._selectedRows = [];
            this._updateRowSelection();
            
                this.dispatchEvent(new Event("onSelectionModeChange"));
            
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
                this.dispatchEvent(new Event("onSelectionModeChange"));
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        isMultiSelectMode: false,
                        selectedRows: JSON.stringify(this._selectedRows)
                    }
                }
            }));
        }
        

        
     
        // Select All / Row Selection
     
_handleSelectAll(e) {
    const isChecked = e.target.checked;
    

    const isFiltered = this._lastFilteredIndices && this._lastFilteredIndices.length > 0;
    
    if (isFiltered) {

        const filteredIndices = [...this._lastFilteredIndices];
        

        const selectedFilteredCount = filteredIndices.filter(index => 
            this._selectedRows.includes(index)).length;
        

        if (selectedFilteredCount < filteredIndices.length) {
       
            filteredIndices.forEach(index => {
                if (!this._selectedRows.includes(index)) {
                    this._selectedRows.push(index);
                }
            });
        } else {
         
            this._selectedRows = this._selectedRows.filter(index => 
                !filteredIndices.includes(index));
        }
    } else {

        if (isChecked) {
            this._selectedRows = Array.from(
                { length: this._tableData.length },
                (_, index) => index
            );
        } else {
            this._selectedRows = [];
        }
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

      
        // Column width 
    
_applyColumnWidths() {
 
    const headerCells = this._shadowRoot.querySelectorAll('th:not(.checkbox-column)');
    headerCells.forEach(cell => {
        cell.style.width = 'auto';
    });
    

    if (Array.isArray(this._columnWidths) && this._columnWidths.length > 0) {
        this._columnWidths.forEach(config => {

            const colIndex = config.columnIndex;
            if (colIndex > 0 && colIndex <= headerCells.length) {
  
                const targetCell = headerCells[colIndex - 1];
                if (targetCell) {
                    targetCell.style.width = `${config.widthPercent}%`;
                }
            }
        });
    }
}

        

          // Visual Updates for Selection
       

_updateRowSelection() {
    const rows = this._shadowRoot.querySelectorAll('#tableBody tr');
    rows.forEach((row, filteredIndex) => {

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
    

    if (this._lastFilteredIndices && this._lastFilteredIndices.length > 0) {
        const filteredIndices = this._lastFilteredIndices;
        const selectedFilteredCount = filteredIndices.filter(index => 
            this._selectedRows.includes(index)).length;
            
        const allFilteredSelected = selectedFilteredCount === filteredIndices.length;
        const someFilteredSelected = selectedFilteredCount > 0 && !allFilteredSelected;
        
        this._selectAllCheckbox.checked = allFilteredSelected;
        this._selectAllCheckbox.indeterminate = someFilteredSelected;
    } else {

        const allSelected = this._selectedRows.length === this._tableData.length;
        const someSelected = 
            this._selectedRows.length > 0 &&
            this._selectedRows.length < this._tableData.length;
            
        this._selectAllCheckbox.checked = allSelected;
        this._selectAllCheckbox.indeterminate = (!allSelected && someSelected);
    }
}


        
       
         //  Main Table Rendering
        
_renderTable() {

    this._headerRow.innerHTML = `
        <th class="checkbox-column ${this._isMultiSelectMode ? 'show' : ''}">
            <input type="checkbox" id="selectAllCheckbox" class="select-checkbox">
        </th>`;
    this._tableBody.innerHTML = '';
    
   
    this._selectAllCheckbox = this._shadowRoot.querySelector('#selectAllCheckbox');
    this._selectAllCheckbox.addEventListener('change', this._handleSelectAll.bind(this));
    

    this._tableColumns.forEach((col, colIndex) => {
        const th = document.createElement('th');
        
        if (this._activeSearches[colIndex] !== undefined) {
         
            const searchContainer = document.createElement('div');
            searchContainer.className = 'search-container active';
            
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.className = 'header-search';
            searchInput.value = this._activeSearches[colIndex];
            searchInput.placeholder = `Search ${col.label || col.name}...`;
            

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
            

         if (this._currentSearchColumn === colIndex) {
    setTimeout(() => searchInput.focus(), 0);
}

        } else {

            const headerContainer = document.createElement('div');
            headerContainer.className = 'header-content';
            headerContainer.textContent = col.label || col.name;
            
            const searchIcon = document.createElement('span');
            searchIcon.className = 'search-icon';
            searchIcon.innerHTML = '🔍';
            headerContainer.appendChild(searchIcon);
            
            th.appendChild(headerContainer);
            

            th.addEventListener('click', () => {
                console.log('Header clicked for column:', colIndex);
                this._activateColumnSearch(colIndex, col);
            });
        }
        
        this._headerRow.appendChild(th);
    });
    

    let filteredData = [];
    let filteredIndices = [];

    this._tableData.forEach((rowData, originalIndex) => {

        const matches = Object.entries(this._activeSearches).every(([colIndex, searchTerm]) => {
            if (!searchTerm) return true;
            
            const columnName = this._tableColumns[colIndex].name;
            const cellValue = String(rowData[columnName] || '').toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            

            if (searchLower.includes('*') || searchLower.includes('?')) {
              
                const escapedSearchTerm = searchLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexPattern = escapedSearchTerm
                    .replace(/\\\*/g, '.*')
                    .replace(/\\\?/g, '.');
                
                const regex = new RegExp(`^${regexPattern}$`, 'i');
                return regex.test(cellValue);
            } else {
   
                return cellValue.includes(searchLower);
            }
        });
        
        if (matches) {
            filteredData.push(rowData);
            filteredIndices.push(originalIndex);
        }
    });
    this._lastFilteredIndices = filteredIndices;
    

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
    

    filteredData.forEach((rowData, filteredIndex) => {
        const originalIndex = filteredIndices[filteredIndex];
        const row = document.createElement('tr');
        

        const checkboxCell = document.createElement('td');
        checkboxCell.className = `checkbox-column ${this._isMultiSelectMode ? 'show' : ''}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'select-checkbox';
        checkbox.checked = this._selectedRows.includes(originalIndex);
        checkbox.addEventListener('change', (e) => this._handleCheckboxChange(originalIndex, e));
        checkboxCell.appendChild(checkbox);
        row.appendChild(checkboxCell);
        

        this._tableColumns.forEach((col, colIndex) => {
            const cell = document.createElement('td');
            const value = rowData[col.name] || '';
            
       
            const symbolInfo = this._getSymbolForValue(colIndex + 1, value);
            if (symbolInfo) {
                cell.textContent = '';
                const symbolElement = this._createSymbolElement(symbolInfo);
                cell.appendChild(symbolElement);
            } else {
             
                if (this._activeSearches[colIndex]) {
                    const searchTerm = this._activeSearches[colIndex];
                    if (searchTerm) {
                        cell.textContent = value; 
                        
           
                        if (!searchTerm.includes('*') && !searchTerm.includes('?')) {
                            try {
                                const searchRegex = new RegExp(searchTerm, 'gi');
                                cell.innerHTML = String(value).replace(
                                    searchRegex, 
                                    match => `<span class="highlight">${match}</span>`
                                );
                            } catch (e) {
                           
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
        
 
        row.addEventListener('click', (e) => this._handleRowClick(originalIndex, e));
        if (this._selectedRows.includes(originalIndex)) {
            row.classList.add('selected');
        }
        this._tableBody.appendChild(row);
    });
    
    this._applyColumnWidths();
    this._updateSelectAllCheckbox();
}


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
        
       
          // SAC Lifecycle Hooks
      
        
connectedCallback() {

    if (!this._initialized) {

        this._activeSearches = {};

        if (this.hasAttribute("isMultiSelectMode")) {
            this._isMultiSelectMode = this.getAttribute("isMultiSelectMode") === "true";
        } else {
            this._isMultiSelectMode = false;
        }


        this._multiSelectButton.style.display = this._isMultiSelectMode ? 'none' : 'flex';
        this._cancelButton.style.display = this._isMultiSelectMode ? 'flex' : 'none';


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


                if (this.hasAttribute("dynamicButtons")) {
                    try {
                        this._dynamicButtons = JSON.parse(this.getAttribute("dynamicButtons"));
                    } catch (e) {
                        console.error("Invalid dynamicButtons attribute", e);
                    }
                }



        if (this.tableDataBinding) {
            this._updateDataBinding(this.tableDataBinding);
        }
        

        this._initialized = true;
    }
    

    this._renderDynamicButtons();
    this._renderTable();
}


        
        
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

       
          // Handle the Data Binding 
        
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

if ('columnWidths' in changedProperties) {
    try {
        this._columnWidths = JSON.parse(changedProperties.columnWidths);
        this._applyColumnWidths();
        this._renderTable(); 
    } catch (e) {
        console.error('Invalid column widths:', e);
    }
}

    
        
  if ('dynamicButtons' in changedProperties) {
    try {
        this._dynamicButtons = typeof changedProperties.dynamicButtons === 'string' ? 
            JSON.parse(changedProperties.dynamicButtons) : changedProperties.dynamicButtons;
        this._renderDynamicButtons();
    } catch (e) {
        console.error('Invalid dynamic buttons:', e);
    }
}
    
 
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

get lastClickedButtonId() {
    return this._lastClickedButtonId || '';
}

set lastClickedButtonId(value) {
    this._lastClickedButtonId = value;
    this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: { 
            properties: { 
                lastClickedButtonId: value 
            } 
        }
    }));
}


getButtonVisibility(buttonId) {
  if (!this._dynamicButtons || !Array.isArray(this._dynamicButtons)) {
    return "";
  }

  const button = this._dynamicButtons.find(btn => btn.id === buttonId);
  

  return button ? button.visibility : "";
}

 setButtonVisibility(buttonId, visibility) {

    if (visibility !== 'visible' && visibility !== 'hidden') {
        console.error("Invalid visibility value. Must be 'visible' or 'hidden'.");
        return;
    }
    

    let buttons = [];
    try {
        buttons = JSON.parse(this.dynamicButtons);
    } catch (e) {
        console.error("Error parsing dynamic buttons:", e);
        return;
    }
    

    let buttonFound = false;
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].id === buttonId) {
            buttons[i].visibility = visibility;
            buttonFound = true;
            break;
        }
    }
    
    if (!buttonFound) {
        console.warn(`Button with ID '${buttonId}' not found.`);
        return;
    }
    

    this.dynamicButtons = JSON.stringify(buttons);
    

    this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: {
            properties: {
                dynamicButtons: JSON.stringify(buttons)
            }
        }
    }));
}

        
        


getSelectedRowDataForSelection(key, rowIndex) {
  return this.getSelectedRowDataForSelectionImpl(key, rowIndex);
}


getSelectedRowDataForSelectionImpl(key, rowIndex) {
  if (!this._selectedRowsData || this._selectedRowsData.length === 0) {
    return "";
  }

  const positionInSelectedRows = this._selectedRows.indexOf(rowIndex);
  

  if (positionInSelectedRows === -1) {
    return "";
  }
  

  if (this._selectedRowsData[positionInSelectedRows] && 
      this._selectedRowsData[positionInSelectedRows][key] != null) {
    return String(this._selectedRowsData[positionInSelectedRows][key]);
  }
  
  return "";
}

   
      
         //  Filtering
    

setSelectedDimensionFilter(dimensionKey, filterValue) {
    console.log(`Setting filter: ${dimensionKey} = ${filterValue}`);
    

    const columnIndex = this._tableColumns.findIndex(col => col.name === dimensionKey);
    
    if (columnIndex === -1) {
        console.error(`Dimension key '${dimensionKey}' not found in table columns`);
        return "error";
    }
    

    this._activeSearches[columnIndex] = filterValue;
    

    this._renderTable();
    

    this.dispatchEvent(new CustomEvent("onFilterApplied", {
        detail: {
            dimensionKey: dimensionKey,
            filterValue: filterValue
        }
    }));
    
    return "success";
}


clearAllFilters() {
    console.log('Clearing all filters');
    this._activeSearches = {};
    this._currentSearchColumn = null;
    this._renderTable();
    

    this.dispatchEvent(new CustomEvent("onFiltersCleared"));
    
    return "success";
}


clearDimensionFilter(dimensionKey) {
    console.log(`Clearing filter for dimension: ${dimensionKey}`);
    

    const columnIndex = this._tableColumns.findIndex(col => col.name === dimensionKey);
    
    if (columnIndex === -1) {
        console.error(`Dimension key '${dimensionKey}' not found in table columns`);
        return "error";
    }
    

    delete this._activeSearches[columnIndex];
    

    if (this._currentSearchColumn === columnIndex) {
        this._currentSearchColumn = null;
    }
    

    this._renderTable();
    

    this.dispatchEvent(new CustomEvent("onFilterCleared", {
        detail: {
            dimensionKey: dimensionKey
        }
    }));
    
    return "success";
}


getActiveDimensionFilter(dimensionKey) {

    const columnIndex = this._tableColumns.findIndex(col => col.name === dimensionKey);
    
    if (columnIndex === -1) {
        return "";
    }
    

    return this._activeSearches[columnIndex] || "";
}

   
getFilteredRowCount(dimensionKey, filterValue) {

    if (!dimensionKey) {
        return this._lastFilteredIndices ? String(this._lastFilteredIndices.length) : String(this._tableData.length);
    }
    

    const columnIndex = this._tableColumns.findIndex(col => col.name === dimensionKey);
    
    if (columnIndex === -1) {
        console.error(`Dimension key '${dimensionKey}' not found in table columns`);
        return "0";
    }
    

    let matchCount = 0;
    this._tableData.forEach(rowData => {
        const cellValue = String(rowData[dimensionKey] || '').toLowerCase();
        const searchTerm = filterValue.toLowerCase();
        

        if (searchTerm.includes('*') || searchTerm.includes('?')) {

            const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regexPattern = escapedSearchTerm
                .replace(/\\\*/g, '.*')
                .replace(/\\\?/g, '.');
            
            const regex = new RegExp(`^${regexPattern}$`, 'i');
            if (regex.test(cellValue)) {
                matchCount++;
            }
        } else {

            if (cellValue.includes(searchTerm)) {
                matchCount++;
            }
        }
    });
    
    return String(matchCount);
}

        
       
         // Getters / Setters 
   
        
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

    const valueChanged = this._isMultiSelectMode !== value;
    
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
    

    if (valueChanged) {
        this.dispatchEvent(new Event("onSelectionModeChange"));
    }
    
    this.dispatchEvent(new CustomEvent("propertiesChanged", {
        detail: { properties: { isMultiSelectMode: value } }
    }));
}

        
    }

    customElements.define('planifyit-tab-widget', PlanifyITTable);
})();
