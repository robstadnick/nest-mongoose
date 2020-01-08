import { AdminRoleGuard } from './admin-role.guard';

describe('AdminRoleGuard', () => {
  it('should be defined', () => {
    expect(new AdminRoleGuard()).toBeDefined();
  });
});
