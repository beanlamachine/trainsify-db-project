import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, yearDOB, email } = req.body;
        try {
            await sql`
                INSERT INTO Customers (Name, YearDOB, Email)
                VALUES (${name}, ${yearDOB}, ${email});
            `;
            res.status(200).json({ message: 'Customer added successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add customer', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
