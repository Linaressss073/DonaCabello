/**
 * Script para crear el primer usuario administrador.
 * Ejecutar: npx ts-node src/scripts/seed-admin.ts
 *
 * Variables requeridas en .env:
 *   MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME
 */
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const UserSchema = new mongoose.Schema(
  {
    email:        { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name:         { type: String, required: true },
    role:         { type: String, enum: ['donor', 'center', 'admin'], required: true },
  },
  { timestamps: true },
);

async function main() {
  const uri   = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/dona-cabello';
  const email = process.env.ADMIN_EMAIL    ?? 'admin@donacabello.com';
  const pass  = process.env.ADMIN_PASSWORD ?? 'Admin1234!';
  const name  = process.env.ADMIN_NAME     ?? 'Administrador';

  await mongoose.connect(uri);
  console.log('Conectado a MongoDB');

  const User = mongoose.model('UserDocument', UserSchema);

  const exists = await User.findOne({ email });
  if (exists) {
    console.log(`El usuario admin ${email} ya existe.`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(pass, 10);
  await User.create({ email, passwordHash, name, role: 'admin' });

  console.log(`✅ Admin creado: ${email}`);
  await mongoose.disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });