// 1a. Store browser + OS info
const info = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    online: navigator.onLine
};
localStorage.setItem('browserInfo', JSON.stringify(info));

window.addEventListener('DOMContentLoaded', () => {
    // 1b. Display all localStorage in footer
    const footer = document.getElementById('footer');
    footer.innerHTML = '<h4>LocalStorage Data</h4>';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        footer.innerHTML += `<p><strong>${key}:</strong> ${localStorage.getItem(key)}</p>`;
    }

    // 2a. Fetch comments
    const variant = 10;
    fetch(`https://jsonplaceholder.typicode.com/posts/${variant}/comments`)
        .then(res => res.json())
        .then(data => {
            const commentsDiv = document.getElementById('comments');
            data.forEach(c => {
                const div = document.createElement('div');
                div.innerHTML = `<h4>${c.name}</h4><p>${c.body}</p><hr>`;
                commentsDiv.appendChild(div);
            });
        });

    // 4b. Auto theme based on time
    const hour = new Date().getHours();
    document.body.classList.add((hour >= 7 && hour < 21) ? 'day' : 'night');
});

// 3a. Show modal after 1 minute
setTimeout(() => {
    document.getElementById('feedback-modal').classList.remove('hidden');
}, 60000);

// Modal close (only on close button)
document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('feedback-modal').classList.add('hidden');
});

// 4a. Theme toggle button
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('day');
    document.body.classList.toggle('night');
});