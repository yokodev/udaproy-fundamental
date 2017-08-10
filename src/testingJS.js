// const games = new Set();
//
// // console.log(`games: ${games}`);
// console.log(games);
// games.add('uno');
// games.add('dos');
// games.add('dos');
// console.log(games);
// games.add('cuatro');
// console.log(games);
// games.add('tres');
// console.log(games.add('cinco'));
// console.log(games);
// console.log(games.delete('cinco asdfasd'))
// console.log(games);
// games.clear();
// console.log(games);

// const months = new Set(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
// console.log(months.size);
// console.log(months.has('January'));
// console.log(months.values());
// let moiter = months.values();
//
// console.log(moiter.next())
//
// for (mes of months) {
//   console.log(`es el mes de: ${mes}`);
// }
//

// const student1 = { name: 'James', age: 26, gender: 'male' };
// const student2 = { name: 'Julia', age: 27, gender: 'female' };
// const student3 = { name: 'Richard', age: 31, gender: 'male' };
//
// const roster = new WeakSet([student1, student2, student3]);
//
//
// console.log(roster.add({'uno':1}));
// console.log(roster);
// //
// // let roster = new WeakSet([student3,student2]);
// // console.log(roster);
// const uniqueFlavors = new WeakSet();
// const flavor1 = {flavor: 'chocolate'}
// const flavor2 = {flavor: 'vainilla'}
//
// uniqueFlavors.add(flavor1)
// uniqueFlavors.add(flavor2)
// uniqueFlavors.add(flavor1)
//
// console.log(uniqueFlavors);

// const empleados = new Map();
//
// console.log(empleados);
//
// empleados.set('llave01', {name:'jesus',lastname:'amaya',phone:'474747'});
// empleados.set('llave02', {name:'jesus',lastname:'amaya',phone:'474747'});
// empleados.set('llave04', {name:'cuatro',lastname:'amaya',phone:'474747'});
// empleados.set('llave03', {primerkey:'una',name:'jesus',lastname:'amaya',phone:'474747'});
//
//
// console.log(`borrando...: ${empleados.delete('llave03')}`);
// console.log(empleados.size);
// // console.log(empleados.clear());
// // console.log(empleados);
//
// // console.log(empleados.has('llave04'));
//
// console.log(empleados.has('llave05')?empleados.get('llave04'): console.log('not found!!'));
/*********************/
// const members = new Map();
//
// members.set('Evelyn', 75.68);
// members.set('Liam', 20.16);
// members.set('Sophia', 0);
// members.set('Marcus', 10.25);
//
// // for (const member of members) {
// //     let [key, value]= member
// //     console.log(key, value);
// // }
// members.forEach((key, value)=> console.log(key, value))
/**********************/
/** *********Proxies */
// var richard = {status: 'looking for work'};
// const handler = {
//     get(target, propName) {
//         // console.log('target:',target); // the `richard` object, not `handler` and not `agent`
//         // console.log('propName:',propName); // the name of the property the proxy (`agent` in this case) is checking
//         return `He's following many leads, so you should offer a contract as soon as possible!`;
//
//     }
// };
// var agent = new Proxy(richard, handler);
//
// console.log(agent.status);

// const richard = {status: 'looking for work'};
// const handler = {
//     set(target, propName, value) {
//         if (propName === 'payRate') { // if the pay is being set, take 15% as commission
//             value = value * 0.85;
//         }
//         target[propName] = value;
//     }
// };
// const agent = new Proxy(richard, handler);
// agent.payRate = 1000;
// console.log(agent.payRate)

/** *Proxies vs ES5 Getter/Setters */
// const proxyObj = new Proxy({age: 5, height: 4}, {
//     get(targetObj, property) {
//         console.log(`getting the ${property} property`);
//         console.log(targetObj[property]);
//     }
// });
//
//  proxyObj.age;
//  proxyObj.height;
//
//  proxyObj.weight = 120;
//  proxyObj.weight;

/* GENERATORS */
// regular one
// function getEmployee() {
//     console.log('the function has started');
//
//     const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];
//
//     for (const name of names) {
//         console.log(name);
//     }
//
//     console.log('the function has ended');
// }

// generator one
// function* getEmployee() {
//     console.log('the function has started');
//
//     const names = ['Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard'];
//
//     for (const name of names) {
//         // console.log( name );
//         yield name
//     }
//
//     console.log('the function has ended');
// }
//
// const generatorIterator =getEmployee();
//
// // let result = generatorIterator.next();
//
//
// console.log(generatorIterator.next().value);
// console.log(generatorIterator.next().value);

// function* udacity() {
//   yield 'Richard'
//   yield 'James'
// }
//
// let iter = udacity();
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

function* createSundae() {
  const toppings = []

  toppings.push(yield)
  toppings.push(yield)
  toppings.push(yield)

  return toppings
}


var it = createSundae()
console.log(it.next('hot fudge'))
console.log(it.next('sprinkles'))
console.log(it.next('whipped cream'))
console.log(it.next())

console.log('hola mundo')
console.log('hola mundo')
console.log('hola mundo')
console.log('hola mundo')
console.log('hola mundo')
