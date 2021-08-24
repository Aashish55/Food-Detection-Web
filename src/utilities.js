// Define our labelmap
const labelMap = {
    1: { name: 'Apple', color: 'red' },
    2: { name: 'Tomato', color: 'green' },
    3: { name: 'Lemon', color: 'lime' },
    4: { name: 'Radish', color: 'white' },
    5: { name: 'Nimki', color: 'yellow' },
    6: { name: 'Aalu', color: 'yellow' },
    7: { name: 'Maize', color: 'yellow' },
}

let finalArray = []

//return Dishes
export const dishes = () => {
    // console.log(finalArray)
    var appleCount = 0;
    var tomatoCount = 0;
    var lemonCount = 0;
    var radishCount = 0;
    var nimkiCount = 0;
    var aaluCount = 0;
    var maizeCount = 0;

    for (var i = 0; i < finalArray.length; ++i) {
        if (finalArray[i] === 'Apple') {
            appleCount++;
        } else if (finalArray[i] === 'Tomato') {
            tomatoCount++
        } else if (finalArray[i] === 'Lemon') {
            lemonCount++
        } else if (finalArray[i] === 'Radish') {
            radishCount++
        } else if (finalArray[i] === 'Lemon') {
            nimkiCount++
        } else if (finalArray[i] === 'Aalu') {
            aaluCount++
        } else if (finalArray[i] === 'Maize') {
            maizeCount++
        }
    }
    var array = [
        {
            name: 'Apple',
            quantity: appleCount,
            price: 20
        }, {
            name: 'Tomato',
            quantity: tomatoCount,
            price: 5
        }, {
            name: 'Lemon',
            quantity: lemonCount,
            price: 10
        }, {
            name: 'Radish',
            quantity: radishCount,
            price: 25
        }, {
            name: 'Nimki',
            quantity: nimkiCount,
            price: 20
        }, {
            name: 'Aalu',
            quantity: aaluCount,
            price: 30
        }, {
            name: 'Maize',
            quantity: maizeCount,
            price: 25
        },
    ]
    array = array.filter(item => item.quantity !== 0)
    console.log(array)

    return array
}
// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx) => {
    // const dishes = []
    const dishList = []
    for (let i = 0; i <= boxes.length; i++) {
        if (boxes[i] && classes[i] && scores[i] > threshold) {
            dishList.push(classNumberTO_classObject(classes[i]))
            // dishList.map(dish=>{
            //     const count 
            // })
            finalArray = dishList
            // Extract variables
            const [y, x, height, width] = boxes[i]
            const text = classes[i]

            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '20px Arial'

            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i] * 100) / 100, x * imgWidth, y * imgHeight - 10)
            ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth / 2, height * imgHeight / 2);
            ctx.stroke()


        }
    }
}

const classNumberTO_classObject = number => {
    switch (number) {
        case 1:
            return 'Apple'
        case 2:
            return 'Tomato'
        case 3:
            return 'Lemon'
        case 4:
            return 'Radish'
        case 5:
            return 'Nimki'
        case 6:
            return 'Aalu'
        case 7:
            return 'Maize'
        default:
            return 'I dont know'
        // case 1:
        //     return {
        //         name: 'Apple',
        //         price: 20,
        //         id: 1,
        //         quantity: 1
        //     }
        // case 2:
        //     return {
        //         name: 'Tomato',
        //         price: 5,
        //         id: 2,
        //         quantity: 1
        //     }
        // case 3:
        //     return {
        //         name: 'Lemon',
        //         price: 15,
        //         id: 3,
        //         quantity: 1
        //     }
        // case 4:
        //     return {
        //         name: 'Radish',
        //         price: 20,
        //         id: 4,
        //         quantity: 1
        //     }
        // case 5:
        //     return {
        //         name: 'Nimki',
        //         price: 20,
        //         id: 5,
        //         quantity: 1
        //     }
        // default:
        //     return {
        //         name: 'I Don\'t Know',
        //         price: 0,
        //         id: 6
        //     }
    }
}

