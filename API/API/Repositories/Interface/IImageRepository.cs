using API.Models.Domain;

namespace API.Repositories.Interface
{
    public interface IImageRepository
    {
        Task<IEnumerable<BlogImage>> GetAll();
        Task<BlogImage> Upload(IFormFile file, BlogImage blogImage);
    }
}
