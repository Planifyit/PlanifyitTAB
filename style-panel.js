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
            input[type="text"], input[type="color"] {
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
            .color-row {
                display: flex;
                align-items: center;
            }
            .color-input {
                flex-grow: 1;
                margin-right: 5px;
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
        </style>
        <form id="form">
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
                        <td>Button Text Color</td>
                        <td class="color-row">
                            <input id="style_button_color" type="text" class="color-input">
                            <input id="style_button_color_picker" type="color">
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
                <button type="button" id="apply_styles" class="apply-button">Apply Styles</button>
                <input type="submit" style="display:none;">
            </fieldset>
        </form>
    `;

    class StylePanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            
            // Get form elements
            this._form = this._shadowRoot.getElementById("form");
            
            // Get color inputs
            this._headerColorInput = this._shadowRoot.getElementById("style_header_color");
            this._headerColorPicker = this._shadowRoot.getElementById("style_header_color_picker");
            
            this._headerTextColorInput = this._shadowRoot.getElementById("style_header_text_color");
            this._headerTextColorPicker = this._shadowRoot.getElementById("style_header_text_color_picker");
            
            this._buttonColorInput = this._shadowRoot.getElementById("style_button_color");
            this._buttonColorPicker = this._shadowRoot.getElementById("style_button_color_picker");
            
            this._selectedRowColorInput = this._shadowRoot.getElementById("style_selected_row_color");
            this._selectedRowColorPicker = this._shadowRoot.getElementById("style_selected_row_color_picker");
            
            this._hoverRowColorInput = this._shadowRoot.getElementById("style_hover_row_color");
            this._hoverRowColorPicker = this._shadowRoot.getElementById("style_hover_row_color_picker");
            
            this._tableTextColorInput = this._shadowRoot.getElementById("style_table_text_color");
            this._tableTextColorPicker = this._shadowRoot.getElementById("style_table_text_color_picker");
            
            // Apply button
            this._applyButton = this._shadowRoot.getElementById("apply_styles");
            
            // Connect color pickers to text inputs
            this._connectColorPickers();
            
            // Add event listeners
            this._form.addEventListener("submit", this._submit.bind(this));
            this._applyButton.addEventListener("click", this._submit.bind(this));
        }
        
        _connectColorPickers() {
            // Header color
            this._headerColorPicker.addEventListener("input", () => {
                this._headerColorInput.value = this._headerColorPicker.value;
            });
            this._headerColorInput.addEventListener("change", () => {
                this._headerColorPicker.value = this._headerColorInput.value;
            });
            
            // Header text color
            this._headerTextColorPicker.addEventListener("input", () => {
                this._headerTextColorInput.value = this._headerTextColorPicker.value;
            });
            this._headerTextColorInput.addEventListener("change", () => {
                this._headerTextColorPicker.value = this._headerTextColorInput.value;
            });
            
            // Button color
            this._buttonColorPicker.addEventListener("input", () => {
                this._buttonColorInput.value = this._buttonColorPicker.value;
            });
            this._buttonColorInput.addEventListener("change", () => {
                this._buttonColorPicker.value = this._buttonColorInput.value;
            });
            
            // Selected row color
            this._selectedRowColorPicker.addEventListener("input", () => {
                this._selectedRowColorInput.value = this._selectedRowColorPicker.value;
            });
            this._selectedRowColorInput.addEventListener("change", () => {
                this._selectedRowColorPicker.value = this._selectedRowColorInput.value;
            });
            
            // Hover row color
            this._hoverRowColorPicker.addEventListener("input", () => {
                this._hoverRowColorInput.value = this._hoverRowColorPicker.value;
            });
            this._hoverRowColorInput.addEventListener("change", () => {
                this._hoverRowColorPicker.value = this._hoverRowColorInput.value;
            });
            
            // Table text color
            this._tableTextColorPicker.addEventListener("input", () => {
                this._tableTextColorInput.value = this._tableTextColorPicker.value;
            });
            this._tableTextColorInput.addEventListener("change", () => {
                this._tableTextColorPicker.value = this._tableTextColorInput.value;
            });
        }

        _submit(e) {
            e.preventDefault();
            
            // Dispatch event with updated style properties
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        headerColor: this.headerColor,
                        headerTextColor: this.headerTextColor,
                        buttonColor: this.buttonColor,
                        selectedRowColor: this.selectedRowColor,
                        hoverRowColor: this.hoverRowColor,
                        tableTextColor: this.tableTextColor
                    }
                }
            }));
        }

        // Getters and setters for style properties
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
        
        get buttonColor() {
            return this._buttonColorInput.value;
        }
        
        set buttonColor(value) {
            this._buttonColorInput.value = value;
            this._buttonColorPicker.value = value;
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
