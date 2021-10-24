function sayHello(name) {
  console.log("Hello " + name);
}

sayHello("Adam");

setInterval(sayHello, 2000, "Adam");
