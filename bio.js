document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".link");
    links.forEach(link => {
        link.addEventListener("mouseover", function() {
            link.style.transform = "scale(1.1)";
        });
        link.addEventListener("mouseout", function() {
            link.style.transform = "scale(1)";
        });
    });

    const container = document.querySelector(".container");
    container.classList.add("animate");

    const logo = document.querySelector(".logo img");
    logo.classList.add("animate");

    const paragraph = document.querySelector("p");
    paragraph.classList.add("animate");

    const linkList = document.querySelectorAll(".link");
    linkList.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add("animate");
        }, index * 100);
    });
});

// Generar animación binaria
const binaryContainer = document.querySelector('.binary-animation-inside');

function createBinary() {
    const binary = document.createElement('span');
    binary.textContent = Math.random() > 0.5 ? '1' : '0';
    binary.style.left = `${Math.random() * 100}%`;
    binary.style.animationDuration = `${Math.random() * 3 + 2}s`;
    binary.style.fontSize = `${Math.random() * 12 + 8}px`;
    binary.style.opacity = '0.5';
    binary.style.color = '#000'; // Black color for binary numbers
    binaryContainer.appendChild(binary);

    setTimeout(() => {
        binary.remove();
    }, 5000);
}

setInterval(createBinary, 200);
