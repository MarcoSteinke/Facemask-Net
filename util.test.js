const {loadImages, splitDataset} = require("./util.js");

test("always has length 2", () => {
    expect(splitDataset(0.7, [1, 2, 3]).length).toBe(2);
})

test("if treshold is zero then the first set is empty", () => {
    expect(splitDataset(0, [1,2,3])).toStrictEqual([[],[1, 2, 3]]);
})