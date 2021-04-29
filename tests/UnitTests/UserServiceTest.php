<?php

namespace UnitTests;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\UserService;
use PHPUnit\Framework\TestCase;

class UserServiceTest extends TestCase
{
    private UserService $userService;

    protected function setUp(): void
    {
        $userRepo = $this->createMock(UserRepository::class);

        $this->userService = new UserService($userRepo);
        parent::setUp();
    }

    public function testGetEmailUsernamePasswordFromJSON(): void
    {
        $object = [
            'email' => 'admin@admin.dev',
            'username' => 'username',
            'password' => 'hunter42'
        ];

        [$email, $username, $password] = $this->userService->getEmailUsernamePasswordFromJSON(json_encode($object));

        $this->assertEquals('admin@admin.dev', $email);
        $this->assertEquals('username', $username);
        $this->assertEquals('hunter42', $password);
    }

    public function testGetEmailUsernamePasswordFromJSONFail(): void
    {
        $object = [
            'email' => 'admin@admin.dev',
            'username' => 'username',
        ];

        [$email, $username, $password] = $this->userService->getEmailUsernamePasswordFromJSON(json_encode($object));

        $this->assertNull($email);
        $this->assertNull($username);
        $this->assertNull($password);
    }

    public function testIsEmailUniqueIsUnique(): void
    {
        $userRepo = $this->createMock(UserRepository::class);
        $userRepo->method('findOneBy')
            ->willReturn(null);
        $this->userService = new UserService($userRepo);

        $result = $this->userService->isEmailUnique('admin@admin.dev');

        $this->assertTrue($result);
    }

    public function testIsEmailUniqueIsNotUnique(): void
    {
        $userRepo = $this->createMock(UserRepository::class);
        $user = new User();
        $userRepo->method('findOneBy')
            ->willReturn($user);
        $this->userService = new UserService($userRepo);

        $result = $this->userService->isEmailUnique('admin@admin.dev');

        $this->assertFalse($result);
    }

    public function testIsUsernameUniqueIsUnique(): void
    {
        $userRepo = $this->createMock(UserRepository::class);
        $userRepo->method('findOneBy')
            ->willReturn(null);
        $this->userService = new UserService($userRepo);

        $result = $this->userService->isUsernameUnique('username');

        $this->assertTrue($result);
    }

    public function testIsUsernameUniqueIsNotUnique(): void
    {
        $userRepo = $this->createMock(UserRepository::class);
        $user = new User();
        $userRepo->method('findOneBy')
            ->willReturn($user);
        $this->userService = new UserService($userRepo);

        $result = $this->userService->isUsernameUnique('username');

        $this->assertFalse($result);
    }

    public function testGetTokenExpirationDateTime(): void
    {
        $result = $this->userService->getTokenExpirationDateTime();

        $expectedDateTime = new \DateTime('+15 min');

        $this->assertEquals($expectedDateTime->format('Y-m-d H:i:s'), $result->format('Y-m-d H:i:s'));
    }

    public function testGetRolesAdmin(): void
    {
        $roles = ['ROLE_ADMIN', 'ROLE_MOD', 'ROLE_USER'];

        $result = $this->userService->getRoleText($roles);

        $this->assertEquals('Administratorius', $result);
    }

    public function testGetRolesMod(): void
    {
        $roles = ['ROLE_MOD', 'ROLE_USER'];

        $result = $this->userService->getRoleText($roles);

        $this->assertEquals('Moderatorius', $result);
    }

    public function testGetRolesUser(): void
    {
        $roles = ['ROLE_USER'];

        $result = $this->userService->getRoleText($roles);

        $this->assertEquals('Naudotojas', $result);
    }

    public function testUserEntityToArray(): void
    {
        $user = new User();
        $user
            ->setName('slapyvardis')
            ->setRoles(['ROLE_MOD', 'ROLE_USER'])
            ->setBio('random')
        ;

        $result = $this->userService->userEntityToArray($user);

        $this->assertEquals(['ROLE_MOD', 'ROLE_USER'], $result['roles']);
        $this->assertEquals('slapyvardis', $result['username']);
        $this->assertEquals('random', $result['bio']);
    }

    public function testUserEntityToSafeArray(): void
    {
        $user = new User();
        $user
            ->setName('slapyvardis')
            ->setRoles(['ROLE_MOD', 'ROLE_USER'])
            ->setBio('random')
            ->setEmail('supersecret@email.com')
        ;

        $result = $this->userService->userEntityToSafeArray($user);

        $this->assertFalse(isset($result['email']));
        $this->assertEquals('slapyvardis', $result['username']);
        $this->assertEquals('random', $result['bio']);
    }
}
