import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  try {
    // Insert data into the Customers table
    await sql`
      INSERT INTO Customers (Name, YearDOB, Email) VALUES
      ('John Doe', 1985, 'john.doe@email.com'),
      ('Jane Smith', 1990, 'jane.smith@email.com'),
      ('Alice Johnson', 1978, 'alice.johnson@email.com');
    `;

    // Insert data into the Trains table
    await sql`
      INSERT INTO Trains (Type, Seat_Quantity) VALUES
      ('Express', 300),
      ('Regional', 150),
      ('Local', 100);
    `;

    // You would usually retrieve the TrainID and CustomerID from the respective tables to use in Tickets and Bookings,
    // but for the sake of example, let's assume the IDs you want to use.
    // Insert data into the Tickets table
    await sql`
      INSERT INTO Tickets (TrainID, Origin, Destination, Departure_Time, Arrival_Time, Available) VALUES
      (1, 'City A', 'City B', '2024-05-01 09:00:00', '2024-05-01 12:00:00', 150),
      (2, 'City C', 'City D', '2024-05-02 10:00:00', '2024-05-02 13:30:00', 100),
      (3, 'City E', 'City F', '2024-05-03 11:00:00', '2024-05-03 14:00:00', 80);
    `;

    // Insert data into the Bookings table
    await sql`
      INSERT INTO Bookings (CustomerID, TrainID, TicketID) VALUES
      (1, 1, 1),
      (2, 2, 2),
      (3, 3, 3);
    `;

    console.log('Data seeding completed successfully.');

    const Customers = await sql`SELECT * FROM Customers;`;
    const Trains = await sql`SELECT * FROM Trains;`;
    const Tickets = await sql`SELECT * FROM Tickets;`;
    const Bookings = await sql`SELECT * FROM Bookings;`;

    return NextResponse.json({ Customers, Trains, Tickets, Bookings }, { status: 200 });

  } catch (error) {
    console.error('Data seeding failed:', error);
    return NextResponse.json({ error: 'Data seeding failed' }, { status: 500 });
  }
}
