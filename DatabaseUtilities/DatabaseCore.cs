using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Project.DatabaseUtilities;

public class DatabaseCore : DbContext
{
  readonly string _name;
  readonly bool _isNewlyCreated;

  public DatabaseCore(string name) : base()
  {
    _name = name;

    if (Database.GetPendingMigrations().Any())
    {
      Database.EnsureDeleted();
    }

    _isNewlyCreated = Database.EnsureCreated();
    Database.ExecuteSqlRaw("PRAGMA journal_mode = DELETE;");
  }

  public bool IsNewlyCreated()
  {
    return _isNewlyCreated;
  }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseSqlite($"Data Source={_name}.sqlite");
  }
}