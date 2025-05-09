(function() {
    let template = document.createElement("template");
    template.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 1em;
            }
            fieldset {
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 12px;
                margin-bottom: 12px;
            }
            legend {
                font-weight: bold;
                font-size: 14px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            td {
                padding: 8px;
                vertical-align: middle;
            }
            input[type="text"], input[type="color"], input[type="number"], select {
                width: 100%;
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            input[type="color"] {
                width: 40px;
                height: 24px;
                padding: 0;
            }
            input[type="number"] {
                width: 60px;
            }
            select {
                height: 30px;
            }
            .color-row {
                display: flex;
                align-items: center;
            }
            .color-input {
                flex-grow: 1;
                margin-right: 5px;
            }
                        .column-width-entry {
                display: flex;
                margin-bottom: 8px;
                align-items: center;
                gap: 8px;
            }
            
            .column-width-entry .column-input {
                width: 60px;
            }
            
            .column-width-entry .width-select {
                flex-grow: 1;
            }
            .apply-button {
                background-color: #1a73e8;
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 10px;
            }
            .apply-button:hover {
                background-color: #1557b0;
            }
           .symbol-mapping, .button-container {
                margin-top: 15px;
            }
            .mapping-entry, .button-entry {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
                gap: 8px;
            }
            .column-input {
                width: 60px;
            }
            .symbol-select, .button-symbol-select  {
                flex-grow: 1;
            }
            .value-input, .button-id-input, .button-tooltip-input {
                flex-grow: 1;
            }
            .add-button, .remove-button {
                background-color: #f0f0f0;
                border: 1px solid #ccc;
                border-radius: 4px;
                cursor: pointer;
                padding: 2px 8px;
                font-size: 14px;
            }
            .add-button {
                margin-top: 8px;
            }
            .remove-button {
                background-color: #ffebee;
            }
        </style>
        <form id="form">
            <fieldset>
                <legend>Text Content</legend>
                <table>
                    <tr>
                        <td>Table Header Title</td>
                        <td>
                            <input id="style_header_title" type="text" placeholder="Enter header title">
                        </td>
                    </tr>
                    <tr>
                        <td>App Title</td>
                        <td>
                            <input id="style_app_title" type="text" placeholder="Enter app title">
                        </td>
                    </tr>
                </table>
            </fieldset>
            
            <fieldset>
                <legend>Table Appearance</legend>
                <table>
                    <tr>
                        <td>Header Background Color</td>
                        <td class="color-row">
                            <input id="style_header_color" type="text" class="color-input">
                            <input id="style_header_color_picker" type="color">
                        </td>
                    </tr>
                    <tr>
                        <td>Header Text Color</td>
                        <td class="color-row">
                            <input id="style_header_text_color" type="text" class="color-input">
                            <input id="style_header_text_color_picker" type="color">
                        </td>
                    </tr>
              
                    <tr>
                        <td>Selected Row Color</td>
                        <td class="color-row">
                            <input id="style_selected_row_color" type="text" class="color-input">
                            <input id="style_selected_row_color_picker" type="color">
                        </td>
                    </tr>
                    <tr>
                        <td>Hover Row Color</td>
                        <td class="color-row">
                            <input id="style_hover_row_color" type="text" class="color-input">
                            <input id="style_hover_row_color_picker" type="color">
                        </td>
                    </tr>
                    <tr>
                        <td>Table Text Color</td>
                        <td class="color-row">
                            <input id="style_table_text_color" type="text" class="color-input">
                            <input id="style_table_text_color_picker" type="color">
                        </td>
                    </tr>
                </table>
            </fieldset>
            
            <fieldset>
                <legend>Symbol Mapping</legend>
                <div class="symbol-mapping" id="symbol_mapping_container">
                    <!-- Mapping entries will be added here dynamically -->
                </div>
                <button type="button" id="add_mapping" class="add-button">+ Add Symbol Mapping</button>
            </fieldset>
          <fieldset>
            <legend>Column Widths</legend>
            <div class="column-widths" id="column_widths_container">
                <!-- Column width entries will be added here dynamically -->
            </div>
            <button type="button" id="add_column_width" class="add-button">+ Add Column Width</button>
        </fieldset>

             <fieldset>
                <legend>Create Buttons</legend>
                <div class="button-container" id="button_container">
                    <!-- Button entries will be added here dynamically -->
                </div>
                <button type="button" id="add_button" class="add-button">+ Add Custom Button</button>
            </fieldset>
            
            <button type="button" id="apply_styles" class="apply-button">Apply Styles</button>
            <input type="submit" style="display:none;">
        </form>
    `;

    class StylePanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            
   
            this._form = this._shadowRoot.getElementById("form");
            
            // Text inputs
            this._headerTitleInput = this._shadowRoot.getElementById("style_header_title");
            this._appTitleInput = this._shadowRoot.getElementById("style_app_title");
            
            // Color inputs
            this._headerColorInput = this._shadowRoot.getElementById("style_header_color");
            this._headerColorPicker = this._shadowRoot.getElementById("style_header_color_picker");
            
            this._headerTextColorInput = this._shadowRoot.getElementById("style_header_text_color");
            this._headerTextColorPicker = this._shadowRoot.getElementById("style_header_text_color_picker");
            
    
            this._selectedRowColorInput = this._shadowRoot.getElementById("style_selected_row_color");
            this._selectedRowColorPicker = this._shadowRoot.getElementById("style_selected_row_color_picker");
            
            this._hoverRowColorInput = this._shadowRoot.getElementById("style_hover_row_color");
            this._hoverRowColorPicker = this._shadowRoot.getElementById("style_hover_row_color_picker");
            
            this._tableTextColorInput = this._shadowRoot.getElementById("style_table_text_color");
            this._tableTextColorPicker = this._shadowRoot.getElementById("style_table_text_color_picker");
            
            // Symbol mapping
            this._symbolMappingContainer = this._shadowRoot.getElementById("symbol_mapping_container");
            this._addMappingButton = this._shadowRoot.getElementById("add_mapping");

           
            this._columnWidthsContainer = this._shadowRoot.getElementById("column_widths_container");
            this._addColumnWidthButton = this._shadowRoot.getElementById("add_column_width");

           // Dynamic buttons
            this._buttonContainer = this._shadowRoot.getElementById("button_container");
            this._addButtonButton = this._shadowRoot.getElementById("add_button");
            

            this._applyButton = this._shadowRoot.getElementById("apply_styles");
            
     
            this._symbolMappings = [];
            this._dynamicButtons = [];
            this._columnWidths = [];
   
            this._connectColorPickers();
            
            //  event listeners
            this._form.addEventListener("submit", this._submit.bind(this));
            this._applyButton.addEventListener("click", this._submit.bind(this));
            this._addMappingButton.addEventListener("click", () => this._addMappingEntry());
            this._addButtonButton.addEventListener("click", () => this._addButtonEntry());
            this._addColumnWidthButton.addEventListener("click", () => this._addColumnWidthEntry());
            
     
            this._addMappingEntry();
            
 
            this._addButtonEntry();
        }
        
        _connectColorPickers() {
 
            this._headerColorPicker.addEventListener("input", () => {
                this._headerColorInput.value = this._headerColorPicker.value;
            });
            this._headerColorInput.addEventListener("change", () => {
                this._headerColorPicker.value = this._headerColorInput.value;
            });
            

            this._headerTextColorPicker.addEventListener("input", () => {
                this._headerTextColorInput.value = this._headerTextColorPicker.value;
            });
            this._headerTextColorInput.addEventListener("change", () => {
                this._headerTextColorPicker.value = this._headerTextColorInput.value;
            });
            
  
            

            this._selectedRowColorPicker.addEventListener("input", () => {
                this._selectedRowColorInput.value = this._selectedRowColorPicker.value;
            });
            this._selectedRowColorInput.addEventListener("change", () => {
                this._selectedRowColorPicker.value = this._selectedRowColorInput.value;
            });
            
    
            this._hoverRowColorPicker.addEventListener("input", () => {
                this._hoverRowColorInput.value = this._hoverRowColorPicker.value;
            });
            this._hoverRowColorInput.addEventListener("change", () => {
                this._hoverRowColorPicker.value = this._hoverRowColorInput.value;
            });
            
     
            this._tableTextColorPicker.addEventListener("input", () => {
                this._tableTextColorInput.value = this._tableTextColorPicker.value;
            });
            this._tableTextColorInput.addEventListener("change", () => {
                this._tableTextColorPicker.value = this._tableTextColorInput.value;
            });
        }

_addColumnWidthEntry(columnIndex = '', widthPercent = '100') {
    const entry = document.createElement("div");
    entry.className = "column-width-entry";
    
    const columnInput = document.createElement("input");
    columnInput.type = "number";
    columnInput.min = "1";
    columnInput.className = "column-input";
    columnInput.placeholder = "Col #";
    columnInput.value = columnIndex;
    
    const widthSelect = document.createElement("select");
    widthSelect.className = "width-select";
    

    const widthOptions = [
        { value: '5', label: '25%' },
        { value: '10', label: '50%' },
        { value: '15', label: '75%' },
        { value: '20', label: '100%' },
        { value: '25', label: '125%' },
        { value: '30', label: '150%' },
        { value: '35', label: '200%' }
    ];
    
    widthOptions.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        if (option.value === widthPercent) {
            optionElement.selected = true;
        }
        widthSelect.appendChild(optionElement);
    });
    
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-button";
    removeButton.textContent = "✕";
    removeButton.addEventListener("click", () => {
        this._columnWidthsContainer.removeChild(entry);
        this._updateColumnWidthsState();
    });
    
    entry.appendChild(columnInput);
    entry.appendChild(widthSelect);
    entry.appendChild(removeButton);
    
    this._columnWidthsContainer.appendChild(entry);
}


_updateColumnWidthsState() {
    this._columnWidths = [];
    const entries = this._columnWidthsContainer.querySelectorAll(".column-width-entry");
    
    entries.forEach(entry => {
        const columnInput = entry.querySelector(".column-input");
        const widthSelect = entry.querySelector(".width-select");
        
        if (columnInput.value) {
            this._columnWidths.push({
                columnIndex: parseInt(columnInput.value, 10),
                widthPercent: widthSelect.value
            });
        }
    });
    
    return this._columnWidths;
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



        
        _addMappingEntry(columnIndex = '', value = '', symbolType = 'circle') {
            const entry = document.createElement("div");
            entry.className = "mapping-entry";
            
            const columnInput = document.createElement("input");
            columnInput.type = "number";
            columnInput.min = "1";
            columnInput.className = "column-input";
            columnInput.placeholder = "Col #";
            columnInput.value = columnIndex;
            
            const valueInput = document.createElement("input");
            valueInput.type = "text";
            valueInput.className = "value-input";
            valueInput.placeholder = "Value to match";
            valueInput.value = value;
            

  const symbolSelect = document.createElement("select");
    symbolSelect.className = "symbol-select";
    
    const symbols = this._getSymbols();
            
            
            symbols.forEach(symbol => {
                const option = document.createElement("option");
                option.value = symbol.value;
                option.textContent = symbol.label;
                if (symbol.value === symbolType) {
                    option.selected = true;
                }
                symbolSelect.appendChild(option);
            });
            
            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "remove-button";
            removeButton.textContent = "✕";
            removeButton.addEventListener("click", () => {
                this._symbolMappingContainer.removeChild(entry);
                this._updateMappingsState();
            });
            
            entry.appendChild(columnInput);
            entry.appendChild(valueInput);
            entry.appendChild(symbolSelect);
            entry.appendChild(removeButton);
            
            this._symbolMappingContainer.appendChild(entry);
        }



 _addButtonEntry(buttonId = '', tooltip = '', symbolType = 'info', visibility = 'visible',  backgroundColor = '') {
            const entry = document.createElement("div");
            entry.className = "button-entry";
            
            const buttonIdInput = document.createElement("input");
            buttonIdInput.type = "text";
            buttonIdInput.className = "button-id-input";
            buttonIdInput.placeholder = "Button ID";
            buttonIdInput.value = buttonId;
            
            const tooltipInput = document.createElement("input");
            tooltipInput.type = "text";
            tooltipInput.className = "button-tooltip-input";
            tooltipInput.placeholder = "Tooltip description";
            tooltipInput.value = tooltip;

            const visibilitySelect = document.createElement("select");
            visibilitySelect.className = "button-visibility-select";
            
            const visibilityOptions = [
                { value: 'visible', label: 'Visible' },
                { value: 'hidden', label: 'Hidden' }
            ];
            
              visibilityOptions.forEach(option => {
                    const optionElement = document.createElement("option");
                    optionElement.value = option.value;
                    optionElement.textContent = option.label;
                    if (option.value === visibility) {
                        optionElement.selected = true;
                    }
                    visibilitySelect.appendChild(optionElement);
                });
            

     
   const symbolSelect = document.createElement("select");
    symbolSelect.className = "button-symbol-select";
    
    const symbols = this._getSymbols();
            
            symbols.forEach(symbol => {
                const option = document.createElement("option");
                option.value = symbol.value;
                option.textContent = symbol.label;
                if (symbol.value === symbolType) {
                    option.selected = true;
                }
                symbolSelect.appendChild(option);
            });
            
            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "remove-button";
            removeButton.textContent = "✕";
            removeButton.addEventListener("click", () => {
                this._buttonContainer.removeChild(entry);
                this._updateButtonsState();
            });




const colorRow = document.createElement("div");
colorRow.className = "color-row";

const colorInput = document.createElement("input");
colorInput.type = "text";
colorInput.className = "button-color-input color-input";
colorInput.placeholder = "#RRGGBB";
colorInput.value = backgroundColor || '';

const colorPicker = document.createElement("input");
colorPicker.type = "color";
colorPicker.className = "button-color-picker";
colorPicker.value = backgroundColor || '#FFFFFF';


colorPicker.addEventListener("input", () => {
    colorInput.value = colorPicker.value;
});
colorInput.addEventListener("change", () => {
    colorPicker.value = colorInput.value;
});

colorRow.appendChild(colorInput);
colorRow.appendChild(colorPicker);



     
            entry.appendChild(buttonIdInput);
            entry.appendChild(tooltipInput);
            entry.appendChild(symbolSelect);
            entry.appendChild(visibilitySelect);
            entry.appendChild(colorRow);
            entry.appendChild(removeButton);
    
           
            
            this._buttonContainer.appendChild(entry);
        }


_updateButtonsState() {
    this._dynamicButtons = [];
    const entries = this._buttonContainer.querySelectorAll(".button-entry");
    
    entries.forEach(entry => {
        const buttonIdInput = entry.querySelector(".button-id-input");
        const tooltipInput = entry.querySelector(".button-tooltip-input");
        const symbolSelect = entry.querySelector(".button-symbol-select");
        const visibilitySelect = entry.querySelector(".button-visibility-select");
        const colorInput = entry.querySelector(".button-color-input");
        
        if (buttonIdInput.value) {
            this._dynamicButtons.push({
                id: buttonIdInput.value,
                tooltip: tooltipInput.value || '',
                symbol: symbolSelect.value,
                visibility: visibilitySelect.value,
                  backgroundColor: colorInput.value || ''
            });
        }
    });
    
    return this._dynamicButtons;
}




        
        _updateMappingsState() {
            this._symbolMappings = [];
            const entries = this._symbolMappingContainer.querySelectorAll(".mapping-entry");
            
            entries.forEach(entry => {
                const columnInput = entry.querySelector(".column-input");
                const valueInput = entry.querySelector(".value-input");
                const symbolSelect = entry.querySelector(".symbol-select");
                
                if (columnInput.value && valueInput.value) {
                    this._symbolMappings.push({
                        columnIndex: parseInt(columnInput.value, 10),
                        value: valueInput.value,
                        symbol: symbolSelect.value
                    });
                }
            });
            
            return this._symbolMappings;
        }

        _submit(e) {
            e.preventDefault();
            
       
            const symbolMappings = this._updateMappingsState();

            const dynamicButtons = this._updateButtonsState();

            const columnWidths = this._updateColumnWidthsState();
                    

            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        headerTitle: this.headerTitle,
                        appTitle: this.appTitle,
                        headerColor: this.headerColor,
                        headerTextColor: this.headerTextColor,
                        buttonColor: this.buttonColor,
                        selectedRowColor: this.selectedRowColor,
                        hoverRowColor: this.hoverRowColor,
                        tableTextColor: this.tableTextColor,
                        symbolMappings: JSON.stringify(symbolMappings),
                        dynamicButtons: JSON.stringify(dynamicButtons),
                        columnWidths: JSON.stringify(columnWidths)
                    }
                }
            }));
        }

        set symbolMappings(value) {
            try {
  
                this._symbolMappingContainer.innerHTML = '';
                
        
                const mappings = JSON.parse(value);
                
                if (Array.isArray(mappings) && mappings.length > 0) {
                  
                    mappings.forEach(mapping => {
                        this._addMappingEntry(
                            mapping.columnIndex || '',
                            mapping.value || '',
                            mapping.symbol || 'circle'
                        );
                    });
                } else {
                 
                    this._addMappingEntry();
                }
                
                this._symbolMappings = mappings;
            } catch (e) {

                this._addMappingEntry();
            }
        }
        
        get symbolMappings() {
            return JSON.stringify(this._updateMappingsState());
        }

set columnWidths(value) {
    try {

        this._columnWidthsContainer.innerHTML = '';
        
    
        const widths = JSON.parse(value);
        
        if (Array.isArray(widths) && widths.length > 0) {
         
            widths.forEach(width => {
                this._addColumnWidthEntry(
                    width.columnIndex || '',
                    width.widthPercent || '100'
                );
            });
        } else {
            
            this._addColumnWidthEntry();
        }
        
        this._columnWidths = widths;
    } catch (e) {

  
        this._addColumnWidthEntry();
    }
}

get columnWidths() {
    return JSON.stringify(this._updateColumnWidthsState());
}



        
 set dynamicButtons(value) {
            try {
          
                this._buttonContainer.innerHTML = '';
                
       
                const buttons = JSON.parse(value);
                
                if (Array.isArray(buttons) && buttons.length > 0) {
            
                    buttons.forEach(button => {
                        this._addButtonEntry(
                            button.id || '',
                            button.tooltip || '',
                            button.symbol || 'info',
                            button.visibility || 'visible',
                               button.backgroundColor || ''
                        );
                    });
                } else {
           
                    this._addButtonEntry();
                }
                
                this._dynamicButtons = buttons;
            } catch (e) {
       
               
                this._addButtonEntry();
            }
        }

        
     get dynamicButtons() {
            return JSON.stringify(this._updateButtonsState());
        }
              
        
       
        get headerTitle() {
            return this._headerTitleInput.value;
        }
        
        set headerTitle(value) {
            this._headerTitleInput.value = value || '';
        }
        
        get appTitle() {
            return this._appTitleInput.value;
        }
        
        set appTitle(value) {
            this._appTitleInput.value = value || '';
        }
        
       
        get headerColor() {
            return this._headerColorInput.value;
        }
        
        set headerColor(value) {
            this._headerColorInput.value = value;
            this._headerColorPicker.value = value;
        }
        
        get headerTextColor() {
            return this._headerTextColorInput.value;
        }
        
        set headerTextColor(value) {
            this._headerTextColorInput.value = value;
            this._headerTextColorPicker.value = value;
        }
        
 

        
        get selectedRowColor() {
            return this._selectedRowColorInput.value;
        }
        
        set selectedRowColor(value) {
            this._selectedRowColorInput.value = value;
            this._selectedRowColorPicker.value = value;
        }
        
        get hoverRowColor() {
            return this._hoverRowColorInput.value;
        }
        
        set hoverRowColor(value) {
            this._hoverRowColorInput.value = value;
            this._hoverRowColorPicker.value = value;
        }
        
        get tableTextColor() {
            return this._tableTextColorInput.value;
        }
        
        set tableTextColor(value) {
            this._tableTextColorInput.value = value;
            this._tableTextColorPicker.value = value;
        }
    }

    customElements.define("com-planifyit-tab-styling", StylePanel);
})();
