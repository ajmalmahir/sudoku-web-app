const gridTest = async (grid) => {
    const allNumbers = Array(9).fill(Array(9).fill('').map((item, index) => index + 1)).flat()
    for (let i = 0; i < 9; i++) {grid[i * 9].initialValue = 1}
    console.log(allNumbers)
}
