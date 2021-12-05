using Microsoft.Data.Sqlite;

namespace basic_repository.Data;

public class Repository
{
    public Repository()
    {
        //create database. This is normally not done like this :)
        CreateSampleDatabase();
    }

    protected static SqliteConnection GetConnection()
    {
        //file based
        return new SqliteConnection("Data Source=users.db");

        // in-memory db, as long as connection is open, content is kept
        //return new SqliteConnection("Data Source=:memory:"); 
        // shared in-memory db, as long as ONE connection is open, content is kept
        //return new SqliteConnection("Data Source=InMemorySample;Mode=Memory;Cache=Shared"); 
    }

    public async void CreateSampleDatabase()
    {
        using var connection = GetConnection();

        await connection.OpenAsync();  //keep connection open for testing
        var command = connection.CreateCommand();

        //drop existing users
        command.CommandText = "DROP TABLE IF EXISTS users";
        await command.ExecuteNonQueryAsync();

        //create table
        command.CommandText = @"CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL);";
        await command.ExecuteNonQueryAsync();

        //insert some users
        command.CommandText = "INSERT INTO users (name) VALUES ('Johan')";
        await command.ExecuteNonQueryAsync();
        command.CommandText = "INSERT INTO users (name) VALUES ('Rebecca')";
        await command.ExecuteNonQueryAsync();

    }

}
