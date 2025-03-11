import { test, expect } from '@playwright/test';

test('Mock API Response - GET Request', async ({ page }) => {
  await page.route('https://jsonplaceholder.typicode.com/posts/1', async (route) => {
    // Mocked Response
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        userId: 1,
        id: 1,
        title: 'Mocked Post Title',
        body: 'This is a mocked response body.',
      }),
    });
  });

  // Perform API call inside the browser
  const response = await page.evaluate(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    return res.json();
  });

  // Validate mocked data
  expect(response.title).toBe('Mocked Post Title');
  expect(response.body).toBe('This is a mocked response body.');
});

test('Mock API Response - POST Request', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
      const postData = route.request().postDataJSON(); // Capture request data
  
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 101,
          title: postData.title,
          body: postData.body,
          userId: postData.userId,
        }),
      });
    });
  
    // Simulating an API call inside the browser
    const response = await page.evaluate(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({ title: 'Mocked Title', body: 'Mocked Body', userId: 1 }),
        headers: { 'Content-Type': 'application/json' },
      });
      return res.json();
    });
  
    // Validate Mocked Response
    expect(response.id).toBe(101);
    expect(response.title).toBe('Mocked Title');
  });

  
  test('Mock API Response - Simulate 500 Error', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/users/1', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' }),
      });
    });
  
    const response = await page.evaluate(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
      return res.json();
    });
  
    expect(response.message).toBe('Internal Server Error');
  });

  test('Mock API Response - Simulate Network Delay', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/todos/1', async (route) => {
      await new Promise((r) => setTimeout(r, 5000)); // 5 seconds delay
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          userId: 1,
          id: 1,
          title: 'Mocked Todo',
          completed: false,
        }),
      });
    });
  
    const start = Date.now();
    const response = await page.evaluate(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      return res.json();
    });
    const end = Date.now();
  
    console.log(`Response Time: ${end - start}ms`);
    expect(end - start).toBeGreaterThan(5000);
  });

  test('Mock API Response - Conditional Logic', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts/*', async (route) => {
      const url = route.request().url();
      const postId = url.split('/').pop(); // Extract ID from URL
  
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: postId,
          title: `Mocked Post ${postId}`,
          body: 'This is a dynamically mocked response.',
        }),
      });
    });
  
    const response = await page.evaluate(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/5');
      return res.json();
    });
  
    expect(response.id).toBe('5');
    expect(response.title).toBe('Mocked Post 5');
  });
  