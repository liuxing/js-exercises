// Javascript 深浅拷贝

// ### javascript六种基本数据类型：
// Undefined，Null，Boolean，Symbol，Number和String
// ### 还有一种复杂数据类型：就是对象

// ### 基本数据类型：
// 变量是直接按值存放的，占据了内存中固定大小的空间，
// 存放在栈内存中的简单数据段，可以直接访问。
// 当一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本，
// 还有就是不能给基本数据类型的值添加属性

let a = 1,
    b = a
a += 1 // 只对a产生影响
console.log(a, b)
a.attr = 1           // 错误示例
console.log(a.attr)  // undefined

// ### 复杂数据类型：
// 复杂的数据类型即引用类型，它是存放在堆内存中的对象，
// 包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针。
// 从一个变量向另一个变量复制引用类型的值，复制的其实是指针，
// 因此两个变量最终都指向同一个对象。
// 当需要访问引用类型（如对象，数组等）的值时，
// 首先从栈中获得该对象的地址指针，然后再从堆内存中取得所需的数据

// test1
let obj = {
    name: "Liu Xing",
    age : 21
}

let obj1 = obj
obj1.bio = "Done is better than perfect"
// 两个变量都指向同一个指针，会同时对哦obj,obj1产生影响
console.log(obj)
console.log(obj1)


// ### 深浅拷贝
// JavaScript存储对象都是存地址的，
// 所以浅拷贝会导致 obj1 和obj2 指向同一块内存地址。
// 改变了其中一方的内容，都是在原来的内存上做修改会导致拷贝对象和源对象都发生改变，
// 而深拷贝是开辟一块新的内存地址，将原对象的各个属性逐个复制进去。
// 对拷贝对象和源对象各自的操作互不影响。

console.log('+++++++++++++++++++++\n')
// ### 浅拷贝

function shallowClone(copyObj) {
    let obj = {}
    for ( let i in copyObj) {
        obj[i] = copyObj[i]
    }
    return obj
}

let test = {
    a: 1,
    b: { f: { g: 1 } },
    c: [ 1, 2, 3 ]
}
let testObj = shallowClone(test)
console.log(test)
console.log(testObj)

// Object.assign() 方法可以把任意多个的源对象自身的
// 可枚举属性拷贝给目标对象，然后返回目标对象

let y = Object.assign({}, test);
console.log(y.b.f === test.b.f);

console.log('+++++++++++++++++++++\n')
// ### 深拷贝

// 数组
// 对于数组我们可以使用slice()和concat()方法来解决上面的问题

// slice()
let arr = [1, 2, 3]

let arrCopy = arr.slice(0)
arrCopy[0] = 'test'
console.log(arrCopy)
console.log(arr)

// contat()

let arrCopy1 = arr.concat()
arrCopy1[0] = 'test1'
console.log(arrCopy1)
console.log(arr)

// 所以你要记住的是 Array的 slice 和 concat 方法 并不是 真正的深拷贝

console.log('+++++++++++++++++++++\n')

// 对象
// 对象我们可以定义一个新的对象并遍历新的属性上去实现深拷贝

let deepCopy = function(copyObj){
    let obj = {}
    for(let key in copyObj){
        if(typeof  copyObj[key] === 'object'){
            obj[key] = deepCopy(copyObj[key])
        }else {
            obj[key] = copyObj[key]
        }
    }
    return obj
}

let obj2 = deepCopy(test)
console.log(test)
console.log(obj2)

// 我们也可以自己实现一个深拷贝的函数，通常有两种方式，
// 一种就是用递归的方式来做，
// 还有一种是利用JSON.stringify和JSON.parse来做

// 递归实现一个深拷贝

function deepClone(source) {
    if(!source && typeof source !== 'object'){
        throw new Error('error arguments', 'shallowClone')
    }
    let targetObj = source.constructor === Array ? [] : {}
    for(let key in source){
        if(source.hasOwnProperty(key)){
            if(source[key] && typeof source[key] === 'object'){
                targetObj[key] = source[key].constructor === Array ? [] : {}
                targetObj[key] = deepClone(source[key])
            }else{
                targetObj[key] = source[key]
            }
        }
    }
    return targetObj
}

// test example
let o1 = {
    arr: [1, 2, 3],
    obj: {
        key: 'value'
    },
    func: function(){
        return 1
    }
}
let o3 = deepClone(o1)
console.log(o3 === o1) // => false
console.log(o3.obj === o1.obj) // => false
console.log(o3.func === o1.func) // => true

//jQuery中的extend方法基本的就是按照这个思路实现的，
// 但是没有办法处理源对象内部循环引用的问题，
// 同时对Date，Funcion等类型值也没有实现真正的深度复制，
// 但是这些类型的值在重新定义的时候一般都是直接覆盖，所以也不会对源对象产生影响，
// 从一定程度上来说也算是实现了一个深拷贝

// 利用JSON序列化实现一个深拷贝
function deepClone1(source){
    return JSON.parse(JSON.stringify(source));
}
let o2 = {
    arr: [1, 2, 3],
    obj: {
        key: 'value'
    },
    func: function(){
        return 1
    }
}
let o4 = deepClone1(o2)
console.log(o4)
console.log(o2)
// 在序列化JavaScript对象时，所有函数和原型成员会被有意忽略