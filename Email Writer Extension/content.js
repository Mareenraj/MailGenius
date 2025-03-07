console.log("Email Writer Extension Loaded");

function injectButton() {
    // const composeButton = document.querySelector('.aDh'); // Corrected selector
    // if (composeButton) {
    //     const button = document.createElement('button');
    //     button.innerHTML = 'Inject';
    //     button.style = 'margin-left: 10px;';
    //     button.onclick = () => {
    //         const email = document.querySelector('.aoD.hl');
    //         if (email) {
    //             const emailContent = email.textContent;
    //             console.log(emailContent);
    //         } else {
    //             console.error("Email content element not found");
    //         }
    //     }
    //     composeButton.appendChild(button);
    // } else {
    //     console.error("Compose button not found");
    // }
}

const observer = new MutationObserver((mutations) => {
    console.log("MutationObserver triggered");
    for (const mutation of mutations) {
        console.log("Mutation detected:", mutation);
        const addNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addNodes.some(node => node.nodeType === Node.ELEMENT_NODE && (node.matches('.aDh, btC, [role="dialog"]') || node.querySelector('.aDh, btC, [role="dialog"]')));

        if (hasComposeElements) {
            console.log("Compose Elements Found");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});