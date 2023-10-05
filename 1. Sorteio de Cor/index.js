const btn = document.getElementById('btn');

btn.addEventListener('click', function onClick(event) {
  document.body.style.backgroundColor = generateColor();
});

function generateColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
    
}