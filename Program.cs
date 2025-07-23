using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Project.DatabaseUtilities;
using Project.LoggingUtilities;
using Project.ServerUtilities;

class Program
{
  static void Main()
  {
    int port = 5000;

    var server = new Server(port);

    Console.WriteLine("The server is running");
    Console.WriteLine($"Main Page: http://localhost:{port}/website/pages/index.html");

    var database = new Database();

    while (true)
    {
      var request = server.WaitForRequest();

      Console.WriteLine($"Recieved a request: {request.Name}");

      try
      {
        /*──────────────────────────────────╮
        │ Handle your custome requests here │
        ╰──────────────────────────────────*/
        if (request.Name == "signUp")
        {
          var (username, password) = request.GetParams<(string, string)>();
          var exists = database.Users.Any(u => u.Username == username);
          if (!exists)
          {
            var userId = Guid.NewGuid().ToString();
            var user = new User(userId, username, password);
            database.Users.Add(user);
            database.SaveChanges();
            request.Respond(userId);
          }
        }
        else if (request.Name == "logIn")
        {
        }
        else if (request.Name == "validateUserId")
        {
          var userId = request.GetParams<string>();
          request.Respond(database.Users.Any(u => u.Id == userId));
        }
        else
        {
          request.SetStatusCode(405);
        }
      }
      catch (Exception exception)
      {
        request.SetStatusCode(422);
        Log.WriteException(exception);
      }
    }
  }
}


class Database() : DatabaseCore("database")
{
  /*──────────────────────────────╮
  │ Add your database tables here │
  ╰──────────────────────────────*/
  public DbSet<User> Users { get; set; } = default!;
  public DbSet<Product> Products { get; set; } = default!;
}

class User(string id, string username, string password)
{
  [Key] public string Id { get; set; } = id;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

class Product(string name, double price)
{
  [Key] public int Id { get; set; } = default!;
  public string Name { get; set; } = name;
  public double Price { get; set; } = price;
}