document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Make floating panels draggable
    const draggableElements = document.querySelectorAll('.draggable');
    
    draggableElements.forEach(elmnt => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        // if present, the header is where you move the DIV from:
        const header = elmnt.querySelector('.panel-header') || elmnt;
        header.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            // Temporarily disable animation during drag
            elmnt.style.animation = "none";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    });

    // Hide Spline Logo
    const hideSplineLogo = () => {
        const viewer = document.querySelector('spline-viewer');
        if (!viewer) return;
        
        const removeLogo = () => {
            const logo = viewer.shadowRoot?.querySelector('#logo');
            if (logo) {
                logo.style.display = 'none';
                return true;
            }
            return false;
        };

        // Try removing periodically until successful or max attempts reached
        let attempts = 0;
        const interval = setInterval(() => {
            if (removeLogo() || attempts > 50) {
                clearInterval(interval);
            }
            attempts++;
        }, 100);
    };
    hideSplineLogo();
});

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
