import { sql, QueryResult  } from '@vercel/postgres';
import { NextResponse } from 'next/server';

interface TableInfo {
  table_name: string;
}

interface ColumnInfo {
  column_name: string;
}
export async function GET(request: Request) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS Customers (
        CustomerID SERIAL PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        YearDOB INT,
        Email VARCHAR(255) NOT NULL UNIQUE
      );
    `;

    await sql`
    CREATE TABLE IF NOT EXISTS Trains (
      TrainID SERIAL PRIMARY KEY,        
      Type VARCHAR(255),       
      Seat_Quantity INT
    );
  `;

  await sql`
  CREATE TABLE IF NOT EXISTS Tickets (
    TicketID SERIAL PRIMARY KEY,
    TrainID INT,
    Origin VARCHAR(255),
    Destination VARCHAR(255),
    Departure_Time TIMESTAMP,
    Arrival_Time TIMESTAMP,
    Available INT,
    FOREIGN KEY (TrainID) REFERENCES Trains (TrainID)
  );
`;

    await sql` 
      CREATE TABLE IF NOT EXISTS Bookings (
        BookingID SERIAL PRIMARY KEY,
        CustomerID INT,
        TrainID INT,
        TicketID INT,
        FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID),
        FOREIGN KEY (TrainID) REFERENCES Trains (TrainID),
        FOREIGN KEY (TicketID) REFERENCES Tickets (TicketID)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS Tickets (
        TicketID SERIAL PRIMARY KEY,
        TrainID INT,
        Origin VARCHAR(255),
        Destination VARCHAR(255),
        Departure_Time TIMESTAMP,
        Arrival_Time TIMESTAMP,
        Available INT,
        FOREIGN KEY (TrainID) REFERENCES Trains (TrainID)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS Trains (
        TrainID SERIAL PRIMARY KEY, 
        Type VARCHAR(255),
        Seat_Quantity INT
      );
    `;
        // Query to get all tables
        const tablesResult: QueryResult<TableInfo> = await sql`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_type = 'BASE TABLE';
        `;

        const tables: string[] = tablesResult.rows.map(row => row.table_name);

        // Fetch column names for each table
        const columnsByTable: { [tableName: string]: string[] } = {};
        for (const tableName of tables) {
            const columnsResult: QueryResult<ColumnInfo> = await sql`
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name = ${tableName};
            `;
            columnsByTable[tableName] = columnsResult.rows.map(row => row.column_name);
        }

        return NextResponse.json({ columnsByTable }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}