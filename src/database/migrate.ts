import { database } from './db';

const runMigrations = async () => {
  try {
    await database.initialize();
    await database.runMigrations();
    console.log('✅ Migraciones ejecutadas');
  } catch (error) {
    console.error('❌ Error ejecutando migraciones:', error);
    process.exit(1);
  } finally {
    await database.destroy();
  }
};

runMigrations();