using basic_repository.Models;

namespace basic_repository.Data;

public class UserRepository : Repository, IRepository<User>
{

    public async Task<User?> GetByIdAsync(int id)
    {
        using var connection = GetConnection();
        await connection.OpenAsync();
        var command = connection.CreateCommand();
        command.CommandText = @"SELECT id,name FROM users WHERE id = $id";
        command.Parameters.AddWithValue("$id", id);

        using(var reader = await command.ExecuteReaderAsync())
        {
            while(await reader.ReadAsync())
            {
                var name = await reader.GetFieldValueAsync<string>(0);
                return new User(id, name);
            }
        }

        return null;
    }

    public async Task<List<User>> GetAllAsync()
    {
        var users = new List<User>();

        using var connection = GetConnection();
        await connection.OpenAsync();
        var command = connection.CreateCommand();
        command.CommandText = @"SELECT * FROM users";

        using(var reader = await command.ExecuteReaderAsync())
        {
            while(await reader.ReadAsync())
            {
                var id = await reader.GetFieldValueAsync<int>(0);
                var name = await reader.GetFieldValueAsync<string>(1);
                users.Add(new User(id, name));
            }
        }

        return users;
    }

    public async Task<User> InsertAsync(User entity)
    {
        using var connection = GetConnection();
        await connection.OpenAsync();
        var command = connection.CreateCommand();
        command.CommandText = @"INSERT INTO users (name) VALUES($name)";
        command.Parameters.AddWithValue("$name", entity.Name);
        await command.ExecuteNonQueryAsync();
        
        command.CommandText = "select last_insert_rowid()";
        // The row ID is a 64-bit value - cast the Command result to an Int64.
        var LastRowID64 = (Int64)command.ExecuteScalar();
        // Then grab the bottom 32-bits as the unique ID of the row.
        var LastRowID = (int)LastRowID64;

        return new User(LastRowID,entity.Name);
    }

    public async Task<User> UpdateAsync(User entityToUpdate)
    {
        using var connection = GetConnection();
        await connection.OpenAsync();
        var command = connection.CreateCommand();
        command.CommandText = @"UPDATE users set name = $name WHERE id = $id";
        command.Parameters.AddWithValue("$name", entityToUpdate.Name);
        command.Parameters.AddWithValue("$id", entityToUpdate.Id);
        await command.ExecuteNonQueryAsync();

        return new User(entityToUpdate.Id, entityToUpdate.Name);
    }

    public async Task<bool> DeleteAsync(User entityToDelete)
    {

        try
        {
            using var connection = GetConnection();
            await connection.OpenAsync();
            var command = connection.CreateCommand();
            command.CommandText = @"DELETE FROM users WHERE id = $id";
            command.Parameters.AddWithValue("$id", entityToDelete.Id);
            await command.ExecuteNonQueryAsync();
            return true;
        }
        catch(Exception)
        {
            return false;
        }
    }
}
