import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.listSongs.deleteMany();
    await prisma.song.deleteMany();

    const song1 = await prisma.song.create({
        data: {
            title: 'Bohemian Rhapsody',
            artist: 'Queen',
            album: 'A Night at the Opera',
            likes: 1500,
        },
    });

    const song2 = await prisma.song.create({
        data: {
            title: 'Hotel California',
            artist: 'Eagles',
            album: 'Hotel California',
            likes: 1200,
        },
    });

    const song3 = await prisma.song.create({
        data: {
            title: 'Imagine',
            artist: 'John Lennon',
            album: 'Imagine',
            likes: 2000,
        },
    });

    await prisma.listSongs.create({
        data: {
            name: 'Rock Clássico',
            songs: {
                connect: [{ id: song1.id }, { id: song2.id }],
            },
        },
    });

    await prisma.listSongs.create({
        data: {
            name: 'Músicas Inspiradoras',
            songs: {
                connect: [{ id: song2.id }, { id: song3.id }],
            },
        },
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
