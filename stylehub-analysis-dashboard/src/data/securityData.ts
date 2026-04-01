export const securityFeatures = [
  {
    category: 'Authentication',
    features: [
      { name: 'JWT Strategy', description: 'Token-based authentication using Passport JWT', implementation: 'JwtStrategy extends PassportStrategy' },
      { name: 'Password Hashing', description: 'bcrypt with salt rounds', implementation: 'EncryptingData.encrypt()' },
      { name: 'Token Expiration', description: 'Configurable JWT expiration time', config: 'JWT_SECRET, JWT_EXPIRES_IN' },
      { name: 'Password Reset', description: 'Secure token-based password recovery', entities: ['PasswordReset'] }
    ]
  },
  {
    category: 'Authorization',
    features: [
      { name: 'Role-Based Access Control', description: 'User roles: admin, user', implementation: 'RolesGuard' },
      { name: 'Route Protection', description: 'Guards on sensitive endpoints', guards: ['JwtAuthGuard', 'RolesGuard'] },
      { name: 'Custom Decorators', description: 'Simplified auth checks', decorators: ['@Auth()', '@GetUser()'] }
    ]
  },
  {
    category: 'Validation',
    features: [
      { name: 'DTO Validation', description: 'class-validator decorators', examples: ['@IsEmail()', '@IsString()', '@MinLength()'] },
      { name: 'Transformation', description: 'class-transformer for type safety', pipes: ['ValidationPipe'] },
      { name: 'Sanitization', description: 'Email lowercase, trim whitespace', hooks: ['@BeforeInsert()', '@BeforeUpdate()'] }
    ]
  },
  {
    category: 'Data Protection',
    features: [
      { name: 'Password Exclusion', description: 'Password not returned by default', config: 'select: false' },
      { name: 'Soft Delete', description: 'isActive flag instead of hard delete', field: 'isActive: boolean' },
      { name: 'Unique Constraints', description: 'Email and fullName uniqueness', database: 'UNIQUE constraints' }
    ]
  }
];

export const guards = [
  {
    name: 'JwtAuthGuard',
    type: 'Authentication',
    purpose: 'Verify JWT token validity',
    usage: '@UseGuards(JwtAuthGuard)',
    validates: ['Token signature', 'Token expiration', 'User existence']
  },
  {
    name: 'RolesGuard',
    type: 'Authorization',
    purpose: 'Check user roles',
    usage: '@Auth(ValidRoles.admin)',
    validates: ['User has required role']
  }
];

export const codeExamples = {
  jwtStrategy: `@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { id } = payload;
    const user = await this.userRepository.findOneBy({ id });
    
    if (!user) throw new UnauthorizedException('Token not valid');
    if (!user.isActive) throw new UnauthorizedException('User is inactive');
    
    return user;
  }
}`,
  authDecorator: `export const Auth = (...roles: ValidRoles[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
};`,
  passwordEncryption: `@Injectable()
export class EncryptingData {
  encrypt(data: string): string {
    return bcrypt.hashSync(data, 10);
  }

  isValidate(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
  }
}`
};
