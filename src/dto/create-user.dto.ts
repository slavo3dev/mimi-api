//needs to refactor!
export class CreateUserDto {
  id: number;
  name: string;
  email: string;

  constructor(data: any) {
    this.id = Number(data.id);
    this.name = String(data.name);
    this.email = String(data.email);
  }

  validate(): string[] {
    const errors: string[] = [];
    if (!this.id || isNaN(this.id)) errors.push("id must be a number");
    if (!this.name || this.name.length < 2) errors.push("name must be at least 2 characters");
    if (!this.email.includes("@")) errors.push("email must be valid");
    return errors;
  }
}
