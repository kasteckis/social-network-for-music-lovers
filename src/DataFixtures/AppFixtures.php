<?php

namespace App\DataFixtures;

use App\Entity\Post;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    private ObjectManager $manager;

    public function load(ObjectManager $manager)
    {
        $this->manager = $manager;

        if (!$this->isTestUserCreated()) {
            $user = $this->createTestUser();
            $this->createFirstPost($user);

            $manager->flush();
        }
    }

    public function isTestUserCreated(): bool
    {
        $cypressUser = $this->manager->getRepository(User::class)->findOneBy([
            'email' => 'cypress@cypress.dev'
        ]);

        if ($cypressUser instanceof User) {
            // user is created
            return true;
        }

        return false;
    }

    public function createTestUser(): User
    {
        $cypressUser = new User();

        $cypressUser
            ->setEmail('cypress@cypress.dev')
            ->setName('Cypress test user')
            ->setPassword(password_hash('cypress', PASSWORD_DEFAULT))
            ->setActive(true)
            ->setIp('created via fixtures')
            ->setRegistrationIp('created via fixtures');
        ;

        $this->manager->persist($cypressUser);

        return $cypressUser;
    }

    public function createFirstPost(User $cypressUser): void
    {
        $post = new Post();

        $post
            ->setTitle('First post')
            ->setCreatedBy($cypressUser)
            ->setText('Some kind of text')
        ;

        $this->manager->persist($post);
    }
}
