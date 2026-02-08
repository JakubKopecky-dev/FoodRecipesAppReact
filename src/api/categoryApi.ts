import type { Category } from "../types/category/Category";
import type { CreateCategory } from "../types/category/CreateCategory";

const BASE_URL = 'http://localhost:7500/api/Category';

export async function getAllCategories(): Promise<Category[]> {
    const response = await fetch(BASE_URL);

    if (!response.ok)
        throw new Error('Failed to get categories');

    const data: Category[] = await response.json();

    return data;
}


export async function getCategoryById(categoryId: string): Promise<Category> {
    const response = await fetch(`${BASE_URL}/${categoryId}`);

    if (response.status === 404)
        throw new Error('Category not found')

    if (!response.ok)
        throw new Error('Failed to get category');

    const data: Category = await response.json();

    return data;
}



export async function createCategory(category: CreateCategory): Promise<Category> {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    });

    if (!response.ok)
        throw new Error('Failed to create category');

    const data: Category = await response.json();

    return data;
}



export async function deleteCategory(categoryId: string): Promise<Category> {
    const response = await fetch(`${BASE_URL}/${categoryId}`, {
        method: 'DELETE'
    });

    if (response.status === 404)
        throw new Error('Category not found')

    if (!response.ok)
        throw new Error('Failed to delete category');

    const data: Category = await response.json();

    return data;
}