using basic_repository.Data;

using System;
using System.Diagnostics;
using System.Linq;

using Xunit;
using Xunit.Abstractions;

namespace data_access_tests;

public class DataAccessTests
{
    private UserRepository _repo;
    private readonly ITestOutputHelper _output;

    public DataAccessTests(ITestOutputHelper output)
    {
        _output = output;

        _repo = new UserRepository();
        _repo.CreateSampleDatabase();
    }

    [Fact]
    public async void GetUserById()
    {
        var user = await _repo.GetByIdAsync(1);
        Assert.NotNull(user);
        _output.WriteLine(user.Name);
    }

    [Fact]
    public async void GetAllUsers()
    {
        var users = (await _repo.GetAllAsync()).ToList();
        Assert.True(users.Count > 0);
        foreach(var user in users)
        {
            _output.WriteLine(user.Name);
        }
    }
}