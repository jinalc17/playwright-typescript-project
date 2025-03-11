interface PostPet{    
        "id": number,
        "name": string,
        "category": category,
        "photoUrls": string[],
        "tags": tags[],
        "status": string     
}

interface category
{
    "id": number,
    "name": string
}

interface tags{
    "id": number,
    "name": string
}