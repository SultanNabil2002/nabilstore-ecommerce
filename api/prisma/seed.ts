/* eslint-disable prettier/prettier */
// prisma/seed.ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Seeding database...');

    // ---------------------------------------------------------------------
    // 1. CATEGORIES
    // ---------------------------------------------------------------------
    const categoriesData = [
        {
            name: 'Clothing',
            slug: 'clothing',
            description: 'Apparel and fashion items',
            imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
        },
        {
            name: 'Sports & Outdoors',
            slug: 'sports-outdoors',
            description: 'Gear for sports and outdoor activities',
            imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
        },
        {
            name: 'Electronics',
            slug: 'electronics',
            description: 'Gadgets and electronic devices',
            imageUrl: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=800&q=80',
        },
        {
            name: 'Home & Kitchen',
            slug: 'home-kitchen',
            description: 'Furniture, appliances, and kitchenware',
            imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
        },
        {
            name: 'Books',
            slug: 'books',
            description: 'Fiction, non-fiction, and educational books',
            imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
        },
        {
            name: 'Beauty & Personal Care',
            slug: 'beauty-personal-care',
            description: 'Skincare, cosmetics, and personal care products',
            imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
        },
    ];

    const categories: Record<string, string> = {};

    for (const cat of categoriesData) {
        const created = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
        categories[cat.slug] = created.id;
    }

    console.log(`✅ ${categoriesData.length} categories seeded.`);

    // ---------------------------------------------------------------------
    // 2. PRODUCTS
    // ---------------------------------------------------------------------
    const productsData = [
        // Clothing
        {
            name: 'Limited Edition Sneakers',
            description: 'Exclusive limited edition athletic sneakers',
            price: 249.99,
            stock: 0,
            sku: 'CLOTH-SNEAK-001',
            imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
            categorySlug: 'clothing',
        },
        {
            name: 'Classic Denim Jacket',
            description: 'Timeless denim jacket for everyday wear',
            price: 79.99,
            stock: 35,
            sku: 'CLOTH-JACK-002',
            imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
            categorySlug: 'clothing',
        },
        {
            name: 'Cotton Crew Neck T-Shirt',
            description: 'Soft breathable cotton t-shirt, unisex fit',
            price: 19.99,
            stock: 120,
            sku: 'CLOTH-TEE-003',
            imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
            categorySlug: 'clothing',
        },
        {
            name: 'Slim Fit Chino Pants',
            description: 'Comfortable slim fit chinos for casual or office wear',
            price: 54.99,
            stock: 42,
            sku: 'CLOTH-PANT-004',
            imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
            categorySlug: 'clothing',
        },

        // Sports & Outdoors
        {
            name: 'Camping Tent 4-Person',
            description: 'Waterproof camping tent with easy setup',
            price: 179.99,
            stock: 0,
            sku: 'SPORT-TENT-001',
            imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
            categorySlug: 'sports-outdoors',
        },
        {
            name: 'Yoga Mat Non-Slip',
            description: 'Extra thick non-slip yoga mat with carry strap',
            price: 29.99,
            stock: 80,
            sku: 'SPORT-YOGA-002',
            imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
            categorySlug: 'sports-outdoors',
        },
        {
            name: 'Trail Running Backpack 20L',
            description: 'Lightweight hydration-compatible trail backpack',
            price: 89.99,
            stock: 25,
            sku: 'SPORT-PACK-003',
            imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
            categorySlug: 'sports-outdoors',
        },
        {
            name: 'Adjustable Dumbbell Set',
            description: 'Space-saving adjustable dumbbells, 5-25kg per hand',
            price: 199.99,
            stock: 15,
            sku: 'SPORT-DUMB-004',
            imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
            categorySlug: 'sports-outdoors',
        },

        // Electronics
        {
            name: 'Wireless Headphones',
            description: 'Noise-cancelling over-ear wireless headphones',
            price: 149.99,
            stock: 60,
            sku: 'ELEC-HEAD-001',
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
            categorySlug: 'electronics',
        },
        {
            name: 'Smart Fitness Watch',
            description: 'Track heart rate, sleep, and workouts',
            price: 129.99,
            stock: 45,
            sku: 'ELEC-WATCH-002',
            imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
            categorySlug: 'electronics',
        },
        {
            name: 'Portable Bluetooth Speaker',
            description: 'Waterproof speaker with 12-hour battery life',
            price: 59.99,
            stock: 0,
            sku: 'ELEC-SPKR-003',
            imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
            categorySlug: 'electronics',
        },
        {
            name: '4K Action Camera',
            description: 'Compact action camera with waterproof case',
            price: 219.99,
            stock: 18,
            sku: 'ELEC-CAM-004',
            imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
            categorySlug: 'electronics',
        },

        // Home & Kitchen
        {
            name: 'Stainless Steel Cookware Set',
            description: '10-piece stainless steel pots and pans set',
            price: 249.99,
            stock: 12,
            sku: 'HOME-COOK-001',
            imageUrl: 'https://images.unsplash.com/photo-1584990347449-a8b3b4cc2482?w=800&q=80',
            categorySlug: 'home-kitchen',
        },
        {
            name: 'Ceramic Coffee Mug Set',
            description: 'Set of 4 handcrafted ceramic mugs',
            price: 34.99,
            stock: 70,
            sku: 'HOME-MUG-002',
            imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80',
            categorySlug: 'home-kitchen',
        },
        {
            name: 'Memory Foam Pillow',
            description: 'Ergonomic memory foam pillow for neck support',
            price: 44.99,
            stock: 55,
            sku: 'HOME-PILLOW-003',
            imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80',
            categorySlug: 'home-kitchen',
        },

        // Books
        {
            name: 'The Art of Clean Code',
            description: 'A practical guide to writing maintainable software',
            price: 39.99,
            stock: 90,
            sku: 'BOOK-CODE-001',
            imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
            categorySlug: 'books',
        },
        {
            name: 'Modern Web Design Handbook',
            description: 'Principles and patterns for contemporary UI design',
            price: 29.99,
            stock: 0,
            sku: 'BOOK-DESIGN-002',
            imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80',
            categorySlug: 'books',
        },
        {
            name: 'Mystery of the Old Harbor',
            description: 'A gripping detective novel set in a coastal town',
            price: 14.99,
            stock: 65,
            sku: 'BOOK-MYST-003',
            imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
            categorySlug: 'books',
        },

        // Beauty & Personal Care
        {
            name: 'Vitamin C Facial Serum',
            description: 'Brightening serum with 20% vitamin C',
            price: 24.99,
            stock: 100,
            sku: 'BEAUTY-SERUM-001',
            imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
            categorySlug: 'beauty-personal-care',
        },
        {
            name: 'Natural Bamboo Toothbrush Set',
            description: 'Eco-friendly bamboo toothbrushes, pack of 4',
            price: 12.99,
            stock: 150,
            sku: 'BEAUTY-BRUSH-002',
            imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80',
            categorySlug: 'beauty-personal-care',
        },
        {
            name: 'Argan Oil Hair Treatment',
            description: 'Nourishing hair oil for shine and repair',
            price: 18.99,
            stock: 40,
            sku: 'BEAUTY-OIL-003',
            imageUrl: 'https://images.unsplash.com/photo-1585232004423-e5c8a6ba8de8?w=800&q=80',
            categorySlug: 'beauty-personal-care',
        },
    ];

    for (const product of productsData) {
        const { categorySlug, ...productFields } = product;
        await prisma.product.upsert({
            where: { sku: productFields.sku },
            update: {},
            create: {
                ...productFields,
                categoryId: categories[categorySlug],
            },
        });
    }

    console.log(`✅ ${productsData.length} products seeded.`);
    console.log('🌱 Seeding finished.');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


// oke saya ada pertanyaan, misalkan saya ada project lain lah ceritanya, saya sudah buat schema prisma nya, anggap backend nya dah jadi, nah saya ingin ngisi data dummy ke database, anggap aja databasenya kompleks, dan anggap saja saya ingin ngisi 2 buah tabel seperti yang kita lakukan diatas, nah bagaimana cara saya bisa tahu tabel mana yang harus saya isi dulu datanya baru tabel berikutnya seperti diatas yang dimana harus ngisi tabel category dulu baru bisa ngisi tabel product ?, ini tidak masuk akal jujur saja, karena saya tidak menemukan sintaks yang unik dari k2 masing tabel, apakah sintaks ini "products Product[]" di model Category yang mengindikasikan bahwa, saya harus bikin data di category dulu untuk dapetin id nya category baru bisa bikin data di tabel Product, atau sintaks ini categoryId String category   Category @relation(fields: [categoryId], references: [id]) di tabel Product yang memberi sinyal bahwa saya harus punya categoryId dulu dari tabel category untuk bisa bikin data product?.





