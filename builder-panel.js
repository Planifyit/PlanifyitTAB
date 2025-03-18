(function() {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 1em;
            }
            label {
                display: block;
                margin-bottom: 5px;
            }
            fieldset {
                margin-bottom: 15px;
                border: 1px solid #ccc;
                padding: 10px;
            }
            .binding-section {
                margin-top: 20px;
            }
            .binding-item {
                margin-bottom: 10px;
                padding: 5px;
                border: 1px solid #eee;
            }
            .dimension-item, .measure-item {
                margin: 5px 0;
                padding: 8px;
                background-color: #f5f5f5;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .dimension-item {
                border-left: 4px solid #1a73e8;
            }
            .measure-item {
                border-left: 4px solid #4CAF50;
            }
            .item-name {
                font-weight: bold;
            }
            .empty-message {
                color: #999;
                font-style: italic;
                padding: 10px 0;
            }
            button {
                padding: 8px 12px;
                background-color: #1a73e8;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 10px;
            }
            button:hover {
                background-color: #0d62c9;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            td {
                padding: 5px;
            }
            input[type="text"] {
                width: 100%;
                padding: 6px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            .info-text {
                color: #666;
                font-size: 0.9em;
                margin-top: 5px;
            }
        </style>
        <form id="form">
            <fieldset>
                <legend>Widget Configuration</legend>
                <table>
                    <tr>
                        <td><label for="builder_header_color">Header Color:</label></td>
                        <td><input id="builder_header_color" type="text" value="#1a73e8"></td>
                    </tr>
                    <tr>
                        <td><label for="builder_button_color">Button Text Color:</label></td>
                        <td><input id="builder_button_color" type="text" value="#ffffff"></td>
                    </tr>
                    <tr>
                        <td><label for="builder_selected_row_color">Selected Row Color:</label></td>
                        <td><input id="builder_selected_row_color" type="text" value="#e8f0fe"></td>
                    </tr>
                    <tr>
                        <td><label for="builder_hover_row_color">Hover Row Color:</label></td>
                        <td><input id="builder_hover_row_color" type="text" value="#f5f5f5"></td>
                    </tr>
                    <tr>
                        <td><label for="builder_table_text_color">Table Text Color:</label></td>
                        <td><input id="builder_table_text_color" type="text" value="#333333"></td>
                    </tr>
                    <tr>
                        <td><label for="builder_header_text_color">Header Text Color:</label></td>
                        <td><input id="builder_header_text_color" type="text" value="#ffffff"></td>
                    </tr>
                </table>
            </fieldset>
            
            <fieldset class="binding-section">
                <legend>Data Binding</legend>
                <div class="binding-item">
                    <label>Dimensions:</label>
                    <div id="dimensionsContainer">
                        <div class="empty-message">No dimensions selected. Use the binding menu to add dimensions.</div>
                    </div>
                    <p class="info-text">Dimensions will be displayed as columns in the table.</p>
                </div>
                <div class="binding-item">
                    <label>Measures:</label>
                    <div id="measuresContainer">
                        <div class="empty-message">No measures selected. Use the binding menu to add measures.</div>
                    </div>
                    <p class="info-text">Measures will be displayed as columns in the table with numerical values.</p>
                </div>
            </fieldset>
            
            <button id="applyChanges" type="button">Apply Changes</button>
            <input type="submit" style="display:none;">
        </form>
    `;

    class BuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._shadowRoot.getElementById("applyChanges").addEventListener("click", this._submit.bind(this));
            
            // Initialize data binding properties
            this._tableDataBinding = {};
            this._dimensions = [];
            this._measures = [];
        }

        // Called by SAC when the builder panel is initialized
        connectedCallback() {
            // This will be called when the component is added to the DOM
            console.log("Builder panel connected");
        }

        // Method to update binding visualization when selections change
        updateBindingVisualization() {
            // Update dimensions display
            const dimensionsContainer = this._shadowRoot.getElementById("dimensionsContainer");
            dimensionsContainer.innerHTML = "";
            
            if (this._dimensions && this._dimensions.length) {
                this._dimensions.forEach((dimension, index) => {
                    const div = document.createElement("div");
                    div.className = "dimension-item";
                    
                    const nameSpan = document.createElement("span");
                    nameSpan.className = "item-name";
                    nameSpan.textContent = dimension.label || dimension.id || `Dimension ${index + 1}`;
                    div.appendChild(nameSpan);
                    
                    dimensionsContainer.appendChild(div);
                });
            } else {
                const emptyMsg = document.createElement("div");
                emptyMsg.className = "empty-message";
                emptyMsg.textContent = "No dimensions selected. Use the binding menu to add dimensions.";
                dimensionsContainer.appendChild(emptyMsg);
            }
            
            // Update measures display
            const measuresContainer = this._shadowRoot.getElementById("measuresContainer");
            measuresContainer.innerHTML = "";
            
            if (this._measures && this._measures.length) {
                this._measures.forEach((measure, index) => {
                    const div = document.createElement("div");
                    div.className = "measure-item";
                    
                    const nameSpan = document.createElement("span");
                    nameSpan.className = "item-name";
                    nameSpan.textContent = measure.label || measure.id || `Measure ${index + 1}`;
                    div.appendChild(nameSpan);
                    
                    measuresContainer.appendChild(div);
                });
            } else {
                const emptyMsg = document.createElement("div");
                emptyMsg.className = "empty-message";
                emptyMsg.textContent = "No measures selected. Use the binding menu to add measures.";
                measuresContainer.appendChild(emptyMsg);
            }
        }

        // Called by SAC when dimensions or measures are added/removed
        updateBindingSelection(tableDataBinding) {
            console.log("Updating binding selection:", tableDataBinding);
            
            if (!tableDataBinding) return;
            
            this._tableDataBinding = tableDataBinding;
            
            // Extract dimensions and measures
            if (tableDataBinding.feeds) {
                const dimensionsFeed = tableDataBinding.feeds.find(feed => feed.id === "dimensions");
                const measuresFeed = tableDataBinding.feeds.find(feed => feed.id === "measures");
                
                this._dimensions = dimensionsFeed && dimensionsFeed.values ? dimensionsFeed.values : [];
                this._measures = measuresFeed && measuresFeed.values ? measuresFeed.values : [];
            }
            
            // Update the UI
            this.updateBindingVisualization();
        }

        _submit(e) {
            e.preventDefault();
            
            // Create the tableDataBinding object in the format SAC expects
            const tableDataBinding = {
                feeds: [
                    {
                        id: "dimensions",
                        values: this._dimensions
                    },
                    {
                        id: "measures",
                        values: this._measures
                    }
                ]
            };
            
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        headerColor: this.headerColor,
                        buttonColor: this.buttonColor,
                        selectedRowColor: this.selectedRowColor,
                        hoverRowColor: this.hoverRowColor,
                        tableTextColor: this.tableTextColor,
                        headerTextColor: this.headerTextColor,
                        tableDataBinding: tableDataBinding
                    }
                }
            }));
        }

        // Getter and setter methods for properties
        set headerColor(newColor) {
            this._shadowRoot.getElementById("builder_header_color").value = newColor;
        }

        get headerColor() {
            return this._shadowRoot.getElementById("builder_header_color").value;
        }

        set buttonColor(newColor) {
            this._shadowRoot.getElementById("builder_button_color").value = newColor;
        }

        get buttonColor() {
            return this._shadowRoot.getElementById("builder_button_color").value;
        }

        set selectedRowColor(newColor) {
            this._shadowRoot.getElementById("builder_selected_row_color").value = newColor;
        }

        get selectedRowColor() {
            return this._shadowRoot.getElementById("builder_selected_row_color").value;
        }

        set hoverRowColor(newColor) {
            this._shadowRoot.getElementById("builder_hover_row_color").value = newColor;
        }

        get hoverRowColor() {
            return this._shadowRoot.getElementById("builder_hover_row_color").value;
        }

        set tableTextColor(newColor) {
            this._shadowRoot.getElementById("builder_table_text_color").value = newColor;
        }

        get tableTextColor() {
            return this._shadowRoot.getElementById("builder_table_text_color").value;
        }

        set headerTextColor(newColor) {
            this._shadowRoot.getElementById("builder_header_text_color").value = newColor;
        }

        get headerTextColor() {
            return this._shadowRoot.getElementById("builder_header_text_color").value;
        }

        // Getter and setter for tableDataBinding
        get tableDataBinding() {
            return this._tableDataBinding;
        }

        set tableDataBinding(value) {
            this._tableDataBinding = value;
            
            if (value && value.feeds) {
                const dimensionsFeed = value.feeds.find(feed => feed.id === "dimensions");
                const measuresFeed = value.feeds.find(feed => feed.id === "measures");
                
                this._dimensions = dimensionsFeed && dimensionsFeed.values ? dimensionsFeed.values : [];
                this._measures = measuresFeed && measuresFeed.values ? measuresFeed.values : [];
                
                this.updateBindingVisualization();
            }
        }
    }

    customElements.define('com-planifyit-tab-builder', BuilderPanel);
})();
