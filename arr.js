let arr = [9, 9, 1, 2, 3, 4, 5, 4, 3, 2, 1]

// 找出元素 item 在给定数组 arr 中的位置 
function indexOf(arr, item) {
    if (Array.prototype.indexOf) {
        return arr.indexOf(item)
    } else {
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                return i
            }
        }
    }
    return -1
}


// 计算给定数组 arr 中所有元素的总和
function sum(arr) {
    let count = 0;
    for (let i = 0, len = arr.length; i < len; i++) {
        count += arr[i]
    }
    return count
}
// reduce
function sum1(arr) {
    return arr.reduce(function (a, b) {
        return a + b
    })
}
// eval
function sum2(arr) {
    console.log(arr.join('+'))
    return eval(arr.join('+'))
}

// 移除数组中的元素(不改变原数组)
function remove(arr, item) {
    return arr.filter(function (ele) {
        return ele != item
    })
}

function remove1(arr, item) {
    let _arr = []
    arr.forEach(function (ele, i) {
        if (ele !== item) {
            _arr.push(ele)
        }
    })
    return _arr
}

// 移除数组中的元素(直接在原数组操作)
function removeWithoutCopy(arr, item) {
    arr.forEach(function (ele, i) {
        if (ele === item) {
            arr.splice(i, 1)
        }
    })
    return arr
}

function removeWithoutCopy1(arr, item) {
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] == item) {
            arr.splice(i, 1)
        }
    }
    return arr
}


// 在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组 
function append(arr, item) {
    let _arr = arr
    _arr.push(item)
    return _arr
}

function append1(arr, item) {
    return arr.contact([item])
}

// 删除数组最后一个元素
function truncate(arr) {
    return arr.slice(0, arr.length - 1)
}


// 数组去重 性能最佳
function unique1(arr) {
    var cache = {}
    var cacheArr = []
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!cache[arr[i]]) {
            cacheArr.push(arr[i])
            cache[arr[i]] = arr[i]
        }
    }
    return cacheArr
}

var indexOf = [].indexOf
    ? function (arr, item) {
        return arr.indexOf(item)
    }
    : function (arr, item) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                return i
            }
        }
        return -1
    }

function unique2(arr) {
    var result = []
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i]
        if (result.indexOf(item) === -1) {
            result.push(item)
        }
    }
    return result
}

function unique3(arr) {
    var result = []
    var hash = {}
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i]
        var key = typeof (item) + item
        if (hash[key] !== 1) {
            result.push(item)
            hash[key] = 1
        }
    }

    return result
}

console.log(unique2(arr))

