document.querySelectorAll('a').forEach(item => {
    item.addEventListener('mouseover', () => {
        document.body.style.cursor = 'pointer';
    });

    item.addEventListener('mouseout', () => {
        document.body.style.cursor = 'default';
    });
});
