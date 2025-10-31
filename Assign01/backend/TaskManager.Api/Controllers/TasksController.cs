using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Models;
using TaskManager.Api.Services;

namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _tasks;

        public TasksController(ITaskService tasks)
        {
            _tasks = tasks;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetAll()
        {
            return Ok(_tasks.GetAll());
        }

        public record CreateTaskRequest(string Description);

        [HttpPost]
        public ActionResult<TaskItem> Create([FromBody] CreateTaskRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Description))
            {
                return BadRequest("Description is required.");
            }
            var item = _tasks.Add(request.Description);
            return CreatedAtAction(nameof(GetAll), new { id = item.Id }, item);
        }

        public record UpdateTaskStatusRequest(bool IsCompleted);

        [HttpPut("{id}")]
        public ActionResult<TaskItem> Update(Guid id, [FromBody] UpdateTaskStatusRequest request)
        {
            var updated = _tasks.Toggle(id, request.IsCompleted);
            if (updated == null)
            {
                return NotFound();
            }
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var removed = _tasks.Delete(id);
            if (!removed)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}



