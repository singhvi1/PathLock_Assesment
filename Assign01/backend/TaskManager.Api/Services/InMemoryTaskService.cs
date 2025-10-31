using TaskManager.Api.Models;

namespace TaskManager.Api.Services
{
    public class InMemoryTaskService : ITaskService
    {
        private readonly List<TaskItem> _tasks = new();

        public IReadOnlyList<TaskItem> GetAll()
        {
            return _tasks.OrderBy(t => t.IsCompleted).ThenBy(t => t.Description).ToList();
        }

        public TaskItem Add(string description)
        {
            var item = new TaskItem
            {
                Id = Guid.NewGuid(),
                Description = description.Trim(),
                IsCompleted = false
            };
            _tasks.Add(item);
            return item;
        }

        public TaskItem? Toggle(Guid id, bool isCompleted)
        {
            var item = _tasks.FirstOrDefault(t => t.Id == id);
            if (item == null) return null;
            item.IsCompleted = isCompleted;
            return item;
        }

        public bool Delete(Guid id)
        {
            var item = _tasks.FirstOrDefault(t => t.Id == id);
            if (item == null) return false;
            _tasks.Remove(item);
            return true;
        }
    }
}



