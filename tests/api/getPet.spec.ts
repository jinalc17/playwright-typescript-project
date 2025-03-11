import { test, expect } from '@playwright/test';
import { postPetDynamicRequestBody } from '../../utils/apiHelper'
import { faker } from '@faker-js/faker'

const baseURL = 'https://petstore.swagger.io/v2/pet';

test('Get pet', async ({ request }) => {

    const APIresponse = await request.get(baseURL + '/findByStatus?status=available');

    const jsonGETAPIResponse = await APIresponse.json();
    console.log('GET API Response : ' + JSON.stringify(jsonGETAPIResponse, null, 2));

    expect(APIresponse.status()).toBe(200);
    expect(APIresponse.statusText()).toBe('OK');
    expect(APIresponse.headers()['content-type']).toBe('application/json');
}); 

test('Get pet by ID', async ({ request }) => {

    const id = faker.number.int({ min: 10000, max: 100000 });
    const name = faker.person.firstName();
    const photoUrls = [faker.image.avatar()];
    const tags = [
        {
            id: faker.number.int({ min: 1000, max: 10000 }),
            name: faker.person.firstName()
        }
    ];
    const status = 'available';

    const postData = await postPetDynamicRequestBody(id, name, photoUrls, tags, status);
    const postAPIresponse = await request.post(baseURL, { data: postData });
    const jsonPOSTAPIResponse = await postAPIresponse.json();

    expect(postAPIresponse.status()).toBe(200);
    expect(postAPIresponse.statusText()).toBe('OK');
    expect(postAPIresponse.headers()['content-type']).toBe('application/json');

    expect(jsonPOSTAPIResponse.id).toBeGreaterThan(0);
    const petId = await jsonPOSTAPIResponse.id;
    console.log('Pet ID : ' + petId);

    const getUrl = `https://petstore.swagger.io/v2/pet/${petId}`;
    console.log('GET URL : ' + getUrl);

    const getAPIresponse = await request.get(getUrl);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const jsonGETAPIResponse = getAPIresponse.json();
    console.log('GET API Response : ' + JSON.stringify(jsonGETAPIResponse, null, 2));

    expect(getAPIresponse.status()).toBe(200);
    expect(getAPIresponse.statusText()).toBe('OK');
    expect(getAPIresponse.headers()['content-type']).toBe('application/json');
    // expect(jsonGETAPIResponse.id).toBe(petId);
    // expect(jsonGETAPIResponse.name).toBe(name);
});