import ContainerComponent from "./components/container-component.js";
import FlexContainerComponent from "./Components/flex-container-component.js";
import BikesTableComponents from "./components/bikes-table-component.js";
import ApiService from "./services/api-service.js";
import ErrorComponent from "./components/error-component.js";
import BikesFormComponent from "./components/bikes-form-component.js";

let errorComponent;
let bikesTableComponents;
let bikesFormComponent;

let bikes;
let editRowID = null;

const handleBikeDelete = async (id) => {
    try {
        await ApiService.deleteBike(id);
        bikes = await ApiService.getBikes();
        bikesTableComponents.renderBikes(bikes, editRowID);
    } catch (error) {
        errorComponent.show(error.message);
    }
}

const handleBikeCreate = async (bikeProps) => {
    try {
        await ApiService.createBike(bikeProps);
        bikes = await ApiService.getBikes();
        bikesTableComponents.renderBikes(bikes, editRowID);
    } catch (error) {
        errorComponent.show(error.message);
    }
}

const handleBikeUpdate = async (bikeProps) => {
    try {
        await ApiService.updateBike(editRowID, bikeProps);
        bikes = await ApiService.getBikes();
        editRowID = null;
        bikesFormComponent.disableEdit();
        bikesTableComponents.renderBikes(bikes, editRowID);
    } catch (error) {
        errorComponent.show(error.message);
    }
}

const handleBikeEdit = async (bikeProps) => {
    if (editRowID === bikeProps.id) editRowID = null;
    else editRowID = bikeProps.id;

    bikesTableComponents.renderBikes(bikes, editRowID);
    if (editRowID === null) {
        bikesFormComponent.disableEdit();
        bikesFormComponent.onSubmit = handleBikeCreate
    } else {
        bikesFormComponent.enableEdit(bikeProps);
        bikesFormComponent.onSubmit = handleBikeUpdate;
    }
}

(async function initialize() {
        const rootHtmlElement = document.querySelector('#root');
        const containerComponent = new ContainerComponent();
        errorComponent = new ErrorComponent();
        containerComponent.addComponents(errorComponent);
        rootHtmlElement.append(containerComponent.htmlElement);
        try {
            bikes = await ApiService.getBikes()
            bikesTableComponents = new BikesTableComponents({ 
                bikes,
                onDelete: handleBikeDelete,
                onEdit: handleBikeEdit,
            });
            bikesFormComponent = new BikesFormComponent({
                onSubmit: handleBikeCreate,
            });
            const flexContainerComponent = new FlexContainerComponent();
            flexContainerComponent.addComponents(bikesTableComponents, bikesFormComponent);
            containerComponent.addComponents(flexContainerComponent);
        } catch (error) {
            errorComponent.show(error.message);
            console.log(':>> ', error);
        }
    })();