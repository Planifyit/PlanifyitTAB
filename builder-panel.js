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
        </style>
        <form id="form">
            <fieldset>
                <legend>Properties</legend>
                <table>
                    <tr>
                        <td><label for="builder_model_id">Model ID:</label></td>
                        <td><input id="builder_model_id" type="text"></td>
                    </tr>
                    <tr>
                        <td><label for="builder_tenant_url">Tenant URL:</label></td>
                        <td><input id="builder_tenant_url" type="text"></td>
                    </tr>
                    <tr>
                        <td><label for="builder_api_string">API String:</label></td>
                        <td><input id="builder_api_string" type="text"></td>
                    </tr>
                    <tr>
                        <td><label for="builder_private_version_location">Private Version Location:</label></td>
                        <td><input id="builder_private_version_location" type="text"></td>
                    </tr>
                    <tr>
                        <td><label for="builder_public_version_location">Public Version Location:</label></td>
                        <td><input id="builder_public_version_location" type="text"></td>
                    </tr>
                </table>
            </fieldset>
            
            <fieldset class="binding-section">
                <legend>Data Binding</legend>
                <div class="binding-item">
                    <label>Dimensions:</label>
                    <div id="dimensionsContainer"></div>
                </div>
                <div class="binding-item">
                    <label>Measures:</label>
                    <div id="measuresContainer"></div>
                </div>
            </fieldset>
            
            <button id="applyChanges">Apply Changes</button>
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
        // This is where you would set up the data binding UI
        connectedCallback() {
            // SAC will call updateBindingSelection when the user selects dimensions/measures
            // You just need to make sure your UI is ready
        }

        // Called by SAC when the user updates the binding selection
        updateBindingSelection(tableDataBinding) {
            if (!tableDataBinding) return;
            
            this._tableDataBinding = tableDataBinding;
            
            // Update dimensions display
            const dimensionsContainer = this._shadowRoot.getElementById("dimensionsContainer");
            dimensionsContainer.innerHTML = "";
            
            if (tableDataBinding.dimensions && tableDataBinding.dimensions.length) {
                tableDataBinding.dimensions.forEach(dimension => {
                    const div = document.createElement("div");
                    div.textContent = dimension.label || dimension.id;
                    dimensionsContainer.appendChild(div);
                });
            } else {
                dimensionsContainer.textContent = "No dimensions selected";
            }
            
            // Update measures display
            const measuresContainer = this._shadowRoot.getElementById("measuresContainer");
            measuresContainer.innerHTML = "";
            
            if (tableDataBinding.measures && tableDataBinding.measures.length) {
                tableDataBinding.measures.forEach(measure => {
                    const div = document.createElement("div");
                    div.textContent = measure.label || measure.id;
                    measuresContainer.appendChild(div);
                });
            } else {
                measuresContainer.textContent = "No measures selected";
            }
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        modelId: this.modelId,
                        tenantUrl: this.tenantUrl,
                        apiString: this.apiString,
                        privateVersionLocation: this.privateVersionLocation,
                        publicVersionLocation: this.publicVersionLocation,
                        tableDataBinding: this._tableDataBinding
                    }
                }
            }));
        }

        // Rest of your existing getters and setters
        set modelId(newModelId) {
            this._shadowRoot.getElementById("builder_model_id").value = newModelId;
        }

        get modelId() {
            return this._shadowRoot.getElementById("builder_model_id").value;
        }

        // ... other getters and setters ...

        // Getter and setter for tableDataBinding
        get tableDataBinding() {
            return this._tableDataBinding;
        }

        set tableDataBinding(value) {
            this._tableDataBinding = value;
            this.updateBindingSelection(value);
        }
    }

    customElements.define('com-planifyit-tab-builder', BuilderPanel);
})();
