const componentForm = document.getElementById('component-form');
const componentsContainer = document.getElementById('components');
const renderButton = document.getElementById('render-button');
const clearButton = document.getElementById('clear-button');

let components = [];

componentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const width = parseInt(componentForm.width.value);
    const height = parseInt(componentForm.height.value);
    const component = { width, height };
    components.push(component);
    renderComponent(component);
    componentForm.reset();
});

function renderComponent(component) {
    const componentDiv = document.createElement('div');
    componentDiv.className = 'component';
    componentDiv.style.width = `${component.width * 50}px`;
    componentDiv.style.height = `${component.height * 20}px`;
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', function() {
        components = components.filter(c => c !== component);
        componentDiv.remove();
    });
    componentDiv.appendChild(removeButton);
    componentsContainer.appendChild(componentDiv);
}

renderButton.addEventListener('click', function() {
    // Call the backend API to save the components and generate the page
    console.log('Components:', components);
});

clearButton.addEventListener('click', function() {
    components = [];
    componentsContainer.innerHTML = '';
});

	function arrangeComponents() {
    const containerWidth = componentsContainer.offsetWidth;
    const containerHeight = componentsContainer.offsetHeight;
    let currentWidth = 0;
    let currentHeight = 0;
    let maxHeight = 0;

    components.forEach(function(component) {
        if (currentWidth + component.width > containerWidth) {
            currentWidth = 0;
            currentHeight += maxHeight + 20;
            maxHeight = 0;
        }
        componentDiv = componentsContainer.children[components.indexOf(component)];
        componentDiv.style.left = `${currentWidth}px`;
        componentDiv.style.top = `${currentHeight}px`;
        currentWidth += component.width * 50;
        maxHeight = Math.max(maxHeight, component.height);
    });
}

renderButton.addEventListener('click', function() {
    arrangeComponents();
    // Call the backend API to save the components and generate the page
    console.log('Components:', components);
});