using TaskManager.Api.Models;

namespace TaskManager.Api.Services
{
    public interface ITaskService
    {
        IReadOnlyList<TaskItem> GetAll();
        TaskItem Add(string description);
        TaskItem? Toggle(Guid id, bool isCompleted);
        bool Delete(Guid id);
    }
}



