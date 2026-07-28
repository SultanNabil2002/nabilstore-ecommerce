//front/types/category.types.ts

export interface Category {
    id: string;
    name: string;
    description: string | null;
    slug: string;
    imageUrl: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}