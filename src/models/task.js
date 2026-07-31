export class Task {
  constructor({ id, title, description, completedAt, createdAt, updatedAt }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completedAt = completedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}