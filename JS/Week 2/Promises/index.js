class Rectangle {
  constructor(length, breadth, color) {
    this.length = length;
    this.breadth = breadth;
    this.color = color;
  }

  area() {
    return this.length * this.breadth;
  }

  paint(color) {
    console.log(`Painting with color ${color}`);
  }
}

const rect = new Rectangle(2, 3);
console.log(`Area: ${rect.area()}`);
rect.paint("red")
