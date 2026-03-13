import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const UserSchema = new mongoose.Schema({
    email: String,
    uuid: String
});

const User = mongoose.model('User', UserSchema);

async function checkIds() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const users = await User.find({}, 'email uuid');
        console.log('Registered Users:');
        users.forEach(u => console.log(`- ${u.email}: ${u.uuid}`));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkIds();
