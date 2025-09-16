// Cursor visibility fix using JavaScript
(function() {
    // Force cursor visibility on all input elements
    function fixCursor() {
        const style = document.createElement('style');
        style.innerHTML = `
            * { caret-color: #ff0000 !important; }
            input, textarea, [contenteditable] { 
                caret-color: #ff0000 !important; 
                color: #000000 !important;
                background-color: #ffffff !important;
            }
            input:focus, textarea:focus, [contenteditable]:focus {
                caret-color: #ff0000 !important;
                outline: 2px solid #ff0000 !important;
            }
        `;
        document.head.appendChild(style);
        
        // Apply to existing elements
        const inputs = document.querySelectorAll('input, textarea, [contenteditable]');
        inputs.forEach(el => {
            el.style.caretColor = '#ff0000';
            el.style.color = '#000000';
            el.style.backgroundColor = '#ffffff';
        });
    }
    
    // Run immediately and on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixCursor);
    } else {
        fixCursor();
    }
    
    // Also run on window load
    window.addEventListener('load', fixCursor);
})();