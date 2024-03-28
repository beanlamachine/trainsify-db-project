import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS Customers (
        CustomerID SERIAL PRIMARY KEY,
        Name VARCHAR(255),
        YearDOB INT,
        Email VARCHAR(255),
        PRIMARY KEY(CustomerID)
      );
    `;

    await sql` 
      CREATE TABLE IF NOT EXISTS Bookings (
        CustomerID INT,
        TrainID INT,
        TicketID INT
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS Tickets (
        TrainID INT,
        Type VARCHAR(255),
        Seat_Quantity INT,
        PRIMARY KEY(TrainID)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS Trains (
        TicketID INT,
        Destination VARCHAR(255),
        Departure_Time TIMESTAMP,
        Arrival_Time TIMESTAMP,
        Available INT,
        Origin VARCHAR(255),
        PRIMARY KEY(TicketID)
      );
    `;
    return NextResponse.json({ message: 'Tables created successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

