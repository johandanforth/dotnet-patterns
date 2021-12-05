namespace basic_repository.Data;

public interface IRepository<TEntity> where TEntity : class
{
    Task<List<TEntity>> GetAllAsync();
    Task<TEntity?> GetByIdAsync(int id);
    //Task<IEnumerable<TEntity>> Get(
    //    Expression<Func<TEntity, bool>> filter = null,
    //    Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
    //    string includeProperties = "");
    Task<TEntity> InsertAsync(TEntity entity);
    Task<TEntity> UpdateAsync(TEntity entityToUpdate);
    Task<bool> DeleteAsync(TEntity entityToDelete);
}
