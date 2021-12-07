import {ActionType, calculator, sum} from "./reducer";

test("sum", () => {
    //1. тестовые данные
    const num1 = 10
    const num2 = 12

    //2 выполнение тестируемого кода
    const result = sum(num1, num2)

    //3. сравнение с ожидаемым результатом
    expect(result).toBe(22)
})

test("sum of calculator", () => {
    //1. тестовые данные
    const num1 = 10
    const num2 = 12

    //2 выполнение тестируемого кода
    const action: ActionType = {type: "SUM", number: num2}
    const result = calculator(num1, action)

    //3. сравнение с ожидаемым результатом
    expect(result).toBe(22)
})