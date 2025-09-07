// Without using setInterval, try to code a counter in Javascript. 
// There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)

const counter = 5;

for (let i = 0; i < counter; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}
