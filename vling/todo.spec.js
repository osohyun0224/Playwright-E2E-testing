const { test, expect } = require('@playwright/test');

test.describe('Todo List', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:3000/vling/index.html');
    });

    test('할일 목록을 추가해본다.', async ({ page }) => {
        //1. 할 일 입력 필드와 추가 버튼을 찾는다. 
        const newTodo = page.locator('#new-todo');
        const addTodoButton = page.locator('#add-todo');

        //2. 할 일을 입력하고 추가해본다.
        await newTodo.fill('정원이랑 놀기');
        await addTodoButton.click();

        //3. 할 일 목록에 할 일이 추가되었는지 확인해본다.
        await expect(page.locator('#todo-list li')).toHaveText([
            '정원이랑 놀기'
        ]);

        //4. 두 번째로 할 일을 추가해본다. 
        await newTodo.fill('정원이랑 성수동 가기');
        await addTodoButton.click();

        //5. 할 일 목록에 두 개의 할일 목록이 추가 되었는지 확인해본다. 
        await expect(page.locator('#todo-list li')).toHaveText([
            '정원이랑 놀기',
            '정원이랑 성수동 가기'
        ]);
    });

    test('should allow me to toggle todo completion', async ({ page }) => {
        const newTodo = page.locator('#new-todo');
        const addTodoButton = page.locator('#add-todo');

        // 1. 할 일을 추가해본다.
        await newTodo.fill('write Playwright test');
        await addTodoButton.click();

        //2. 할 일 항목을 클릭하여 완료로 표시해본다. 
        const todoItem = page.locator('#todo-list li').first();
        await todoItem.click();

        //3. 할 일 항목이 완료로 표시되었는지 확인해본다.
        await expect(todoItem).toHaveClass(/completed/);
    });
});
