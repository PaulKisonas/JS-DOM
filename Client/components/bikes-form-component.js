class BikeFormComponent {
    htmlElement;
    onSubmit;
    brandInput;
    modelInput;
    yearInput;
    electricInput;
    formNameElement;
    createButton;

    constructor({ onSubmit }) {
        this.htmlElement = document.createElement('form');
        this.htmlElement.className = 'd-inline-flex flex-column align-items-center bg-dark bg-gradient text-white p-3 rounded-3 shadow';
        this.htmlElement.innerHTML = `
        <h2 class="h5 text-center">Create New Bike</h2>
        <div class="mb-3 text-center">
            <label for="brand" class="form-label">Brand</label>
            <input type="text" class="form-control" id="brand" name="brand">
        </div>
        <div class="mb-3 text-center">
            <label for="model" class="form-label">Model</label>
            <input type="text" class="form-control" id="model" name="model">
        </div>
        <div class="mb-3 text-center">
            <label for="year" class="form-label">Release Year</label>
            <input type="number" class="form-control" id="year" name="year">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="electric" name="electric">
            <label class="form-check-label" for="electric">Electric</label>
        </div>
        <button type="submit" class="btn btn-success w-100 fw-bold">Create Bike</button>`;
        this.onSubmit = onSubmit;
        this.brandInput = this.htmlElement.querySelector('[name=brand]');
        this.modelInput = this.htmlElement.querySelector('[name=model]');
        this.yearInput = this.htmlElement.querySelector('[name=year]');
        this.electricInput = this.htmlElement.querySelector('[name=electric]');
        this.formNameElement = this.htmlElement.querySelector('h2');
        this.submitButton = this.htmlElement.querySelector('button');

        this.htmlElement.addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const value = {
            brand: formData.get('brand'),
            model: formData.get('model'),
            year: formData.get('year'),
            electric: Boolean(formData.get('electric')),
        }

        this.onSubmit(value);

        event.target.reset();
    }

    enableEdit = ({ brand, model, year, electric }) => {
        this.brandInput.value = brand;
        this.modelInput.value = model;
        this.yearInput.value = year;
        this.electricInput.value = electric;
        this.formNameElement.innerText = 'Update Bike'
        this.submitButton.innerText = 'Update Bike'
        this.submitButton.className = 'btn btn-warning w-100'
    }

    disableEdit = () => {
        this.htmlElement.reset();
        this.formNameElement.innerText = 'Create Bike'
        this.submitButton.innerText = 'Update Bike'
        this.submitButton.className = 'btn btn-success w-100'
    }
}

export default BikeFormComponent;