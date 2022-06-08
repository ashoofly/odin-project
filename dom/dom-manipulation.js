const container = document.querySelector('#container');
const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';
container.appendChild(content);

const paragraph = document.createElement('p');
paragraph.style.color = 'red';
paragraph.textContent = "Hey I'm red!";
container.appendChild(paragraph);

const h3 = document.createElement('h3');
h3.style.color = 'blue';
h3.textContent = "I'm a blue h3!";
container.appendChild(h3);

const div = document.createElement('div');
div.style.cssText = 'border: 1px solid black; background-color: pink';
const h1 = document.createElement('h1');
h1.textContent = "I'm in a div";
div.appendChild(h1);
const p = document.createElement('p');
p.textContent = "ME TOO!";
div.appendChild(p);
container.appendChild(div);

const btn = document.querySelector('#btn');
btn.addEventListener('click', function(e) {
  console.log(e.target);
  e.target.style.background = 'blue';
});

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    alert(button.id);
  })
});