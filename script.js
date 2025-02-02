document.addEventListener("DOMContentLoaded", () => {
    // Handle the weight tracking logic
    const form = document.getElementById("progress-form");
    const output = document.getElementById("progress-output");

    const isLocalStorageSupported = (() => {
        try {
            const test = "__test__";
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    })();

    if (!isLocalStorageSupported) {
        output.textContent = "Local storage is not supported. Your progress won't be saved.";
        return;
    }

    const storedWeights = JSON.parse(localStorage.getItem("weights")) || [];
    let initialWeight = storedWeights[0] || null;

    const updateOutput = (latestWeight) => {
        const weightDifference = latestWeight - initialWeight;
        output.textContent = `Your current weight is ${latestWeight} lbs. ${
            weightDifference >= 0
                ? `Total Gained: ${weightDifference.toFixed(1)} lbs.`
                : `Total Lost: ${Math.abs(weightDifference).toFixed(1)} lbs.`
        }`;
    };

    if (storedWeights.length) {
        updateOutput(storedWeights[storedWeights.length - 1]);
    } else {
        output.textContent = "No weight data logged yet. Start by entering your weight!";
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const weightInput = document.getElementById("current-weight");
        const currentWeight = parseFloat(weightInput.value);

        if (isNaN(currentWeight) || currentWeight <= 0) {
            output.textContent = "Please enter a valid positive number for your weight.";
            weightInput.focus();
            return;
        }

        if (!initialWeight) {
            initialWeight = currentWeight;
        }

        storedWeights.push(currentWeight);
        localStorage.setItem("weights", JSON.stringify(storedWeights));
        updateOutput(currentWeight);
        weightInput.value = "";
    });

    // 🟢 Fix: Dropdown Selection Logic
    let dropdown = document.getElementById("nav-dropdown");
    let currentPage = window.location.pathname.split("/").pop(); // Get current page filename

    if (!currentPage) {
        currentPage = "index.html"; // Default to index.html if no file is detected
    }

    for (let i = 0; i < dropdown.options.length; i++) {
        let optionValue = dropdown.options[i].value;

        // Check if the current URL contains the option value
        if (currentPage.includes(optionValue)) {
            dropdown.options[i].selected = true; // Set as selected
            break;
        }
    }

    console.log("Current Page:", currentPage); // Debugging log to check detected page
});

// 🟢 Register the Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log("Service Worker Registered!", reg))
            .catch(err => console.log("Service Worker Registration Failed!", err));
    });
}

