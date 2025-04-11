
using API.Data;
using API.Models.Domain;
using APIries.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public CategoryRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Category> CreateAsync(Category category)
        {
            await _applicationDbContext.Categories.AddAsync(category);
            await _applicationDbContext.SaveChangesAsync();

            return category;
        }

        public async Task<Category> DeleteAsync(Guid id)
        {
            var existingCategory = await _applicationDbContext.Categories.FirstOrDefaultAsync(p => p.Id == id);

            if (existingCategory is null)
                return null;

            _applicationDbContext.Categories.Remove(existingCategory);
            await _applicationDbContext.SaveChangesAsync();
            return existingCategory;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _applicationDbContext.Categories.ToListAsync();
        }

        public async Task<Category> GetById(Guid id)
        {
            return await _applicationDbContext.Categories.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Category> UpdateAsync(Category category)
        {
            var existingCategory = await _applicationDbContext.Categories.FirstOrDefaultAsync(p => p.Id == category.Id);
            if (existingCategory != null)
            {
                _applicationDbContext.Entry(existingCategory).CurrentValues.SetValues(category);
                await _applicationDbContext.SaveChangesAsync();
                return category;
            }

            return null;
        }
    }
}